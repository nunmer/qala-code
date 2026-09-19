import { getStreetText, getStreetTitle } from '@/data/streets/translations';
import { DEFAULT_LANG, type Lang } from '@/i18n/config';
import type { Street } from './types';
import { buildContext, classifyQuery, retrieve } from './retrieval';

/**
 * AI-гид (§11–14 README).
 *
 * Архитектура повторяет схему из §12: вопрос → определение намерения →
 * поиск по базе QALA CODE → передача найденного в LLM → структурированный ответ.
 *
 * Безопасность ключа
 * ------------------
 * Приложение статическое: серверного прокси нет, поэтому ключ вводится
 * пользователем в интерфейсе и хранится ТОЛЬКО в localStorage его браузера.
 * Ключ никогда не попадает в репозиторий и не зашивается в бандл.
 * Для публичного развёртывания вызов LLM нужно вынести на прокси —
 * об этом интерфейс предупреждает явно.
 */

/** Формулировка «данных нет» на языке интерфейса (§14 README). */
export const NO_DATA_ANSWER: Readonly<Record<Lang, string>> = {
  ru: 'В базе QALA CODE пока нет достаточной информации об этой улице.',
  kk: 'QALA CODE дерекқорында бұл көше туралы жеткілікті ақпарат әзірге жоқ.',
  en: 'The QALA CODE database does not yet hold enough information about this street.',
};

const LANGUAGE_NAME: Readonly<Record<Lang, string>> = {
  ru: 'русском',
  kk: 'казахском',
  en: 'английском',
};

function systemPrompt(lang: Lang): string {
  return `Ты — AI-гид проекта QALA CODE, посвящённого истории названий улиц Астаны.

ЖЁСТКИЕ ПРАВИЛА:
1. Отвечай ТОЛЬКО на основании записей базы QALA CODE, приведённых в блоке КОНТЕКСТ.
2. Категорически запрещено придумывать исторические факты, даты, биографии, происхождение названий и источники. Если сведений в контексте нет — так и скажи.
3. Если контекст пуст или не отвечает на вопрос, ответь ровно: "${NO_DATA_ANSWER[lang]}"
4. Не добавляй сведения из собственных знаний, даже если уверен в них. Твоя роль — работать с результатами чужого исследования, а не подменять его.
5. Отвечай на ${LANGUAGE_NAME[lang]} языке, кратко и по делу: 2–5 предложений либо короткий список.
6. Упоминая улицу, называй её так же, как в контексте.
7. Не выдумывай ссылки. Источники перечисляй только по их названиям из контекста.

Формат: сначала прямой ответ, затем — при необходимости — перечень улиц из контекста.`;
}

export interface AskResult {
  readonly answer: string;
  readonly streets: readonly Street[];
  /** Чем сформирован ответ: моделью или детерминированной сборкой из базы. */
  readonly mode: 'llm' | 'retrieval';
}

export interface LlmSettings {
  readonly apiKey: string;
  readonly model: string;
  readonly baseUrl: string;
}

export const DEFAULT_LLM_SETTINGS: Omit<LlmSettings, 'apiKey'> = {
  model: 'gpt-4o-mini',
  baseUrl: 'https://api.openai.com/v1',
};

const LIST_HEADER: Readonly<Record<Lang, (count: number) => string>> = {
  ru: (n) => `В базе QALA CODE найдены следующие улицы (${n}):`,
  kk: (n) => `QALA CODE дерекқорынан мынадай көшелер табылды (${n}):`,
  en: (n) => `The QALA CODE database holds the following streets (${n}):`,
};

const SINGLE_HEADER: Readonly<Record<Lang, (title: string) => string>> = {
  ru: (title) => `По данным базы QALA CODE: ${title}.`,
  kk: (title) => `QALA CODE дерекқоры бойынша: ${title}.`,
  en: (title) => `From the QALA CODE database: ${title}.`,
};

const FACT_LEAD: Readonly<Record<Lang, string>> = {
  ru: 'Из исторической справки:',
  kk: 'Тарихи анықтамадан:',
  en: 'From the historical note:',
};

const ALSO_FOUND: Readonly<Record<Lang, string>> = {
  ru: 'Также в базе найдены:',
  kk: 'Дерекқордан тағы табылды:',
  en: 'Also found in the database:',
};

const EMPTY_QUESTION: Readonly<Record<Lang, string>> = {
  ru: 'Задайте вопрос о названии улицы.',
  kk: 'Көше атауы туралы сұрақ қойыңыз.',
  en: 'Ask a question about a street name.',
};

const ASKS_WHO = /кто так|кто это|что так|кім\b|who is|who was|what is/i;
const ASKS_WHY = /почему|происхожд|неге\b|why|origin/i;

/**
 * Детерминированный ответ — собирается прямо из найденных записей.
 * Работает всегда: без ключа, без сети, без затрат.
 *
 * Форма ответа зависит от вопроса: на «какие улицы…» отвечаем перечнем,
 * на «кто такой…» и «почему…» — разбором одной записи.
 */
export function composeRetrievalAnswer(
  question: string,
  streets: readonly Street[],
  lang: Lang = DEFAULT_LANG,
): string {
  if (streets.length === 0) return NO_DATA_ANSWER[lang];

  const { wantsList } = classifyQuery(question);

  if (wantsList && streets.length > 1) {
    const list = streets
      .map((street) => `• ${getStreetTitle(street, lang)} — ${getStreetText(street, lang).who_is_it}`)
      .join('\n');

    return `${LIST_HEADER[lang](streets.length)}\n\n${list}`;
  }

  const [primary, ...rest] = streets;
  const text = getStreetText(primary, lang);

  const head = ASKS_WHO.test(question)
    ? text.who_is_it
    : ASKS_WHY.test(question)
      ? text.why_named
      : text.description;

  const parts = [SINGLE_HEADER[lang](getStreetTitle(primary, lang)), head];

  if (text.historical_facts.length > 0) {
    parts.push(`${FACT_LEAD[lang]} ${text.historical_facts[0]}`);
  }

  if (rest.length > 0) {
    parts.push(
      `${ALSO_FOUND[lang]} ${rest.map((s) => getStreetTitle(s, lang)).join(', ')}.`,
    );
  }

  return parts.join('\n\n');
}

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
}

/** Вызов LLM. Контекст уже ограничен результатами retrieval. */
async function callLlm(
  question: string,
  context: string,
  settings: LlmSettings,
  lang: Lang,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch(`${settings.baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt(lang) },
        {
          role: 'user',
          content: `КОНТЕКСТ (записи базы QALA CODE):\n\n${context}\n\nВОПРОС ПОЛЬЗОВАТЕЛЯ:\n${question}`,
        },
      ],
    }),
    signal,
  });

  const payload = (await response.json().catch(() => ({}))) as ChatCompletionResponse;

  if (!response.ok) {
    const detail = payload.error?.message ?? `HTTP ${response.status}`;
    throw new Error(detail);
  }

  const answer = payload.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('Модель вернула пустой ответ.');

  return answer;
}

/**
 * Полный цикл AI-гида.
 *
 * Retrieval выполняется всегда. LLM подключается только если задан ключ;
 * при любой ошибке вызова мы не прячем её и не выдумываем ответ, а
 * возвращаем детерминированную выжимку из базы.
 */
export async function ask(
  streets: readonly Street[],
  question: string,
  settings?: LlmSettings | null,
  lang: Lang = DEFAULT_LANG,
  signal?: AbortSignal,
): Promise<AskResult> {
  const trimmed = question.trim();
  if (!trimmed) {
    return { answer: EMPTY_QUESTION[lang], streets: [], mode: 'retrieval' };
  }

  const { streets: found } = retrieve(streets, trimmed, lang);

  if (!settings?.apiKey) {
    return {
      answer: composeRetrievalAnswer(trimmed, found, lang),
      streets: found,
      mode: 'retrieval',
    };
  }

  if (found.length === 0) {
    // Пустой контекст — обращаться к модели незачем: отвечать ей будет нечем.
    return { answer: NO_DATA_ANSWER[lang], streets: [], mode: 'retrieval' };
  }

  const answer = await callLlm(trimmed, buildContext(found, lang), settings, lang, signal);
  return { answer, streets: found, mode: 'llm' };
}

/** Популярные вопросы из §16 README, на трёх языках. */
export const SUGGESTED_QUESTIONS: Readonly<Record<Lang, readonly string[]>> = {
  ru: [
    'Какие улицы названы в честь писателей?',
    'Почему улица называется Қабанбай батыр?',
    'Кто такой Абай?',
    'Найди улицы, связанные с историей Казахстана',
    'Какие названия связаны с природой?',
    'Покажи улицы, связанные с географией Казахстана',
  ],
  kk: [
    'Қандай көшелер жазушылар құрметіне аталған?',
    'Көше неге Қабанбай батыр деп аталады?',
    'Абай кім?',
    'Қазақстан тарихымен байланысты көшелерді тап',
    'Қандай атаулар табиғатпен байланысты?',
    'Қазақстан географиясымен байланысты көшелерді көрсет',
  ],
  en: [
    'Which streets are named after writers?',
    'Why is the street called Qabanbay Batyr?',
    'Who was Abay?',
    'Find streets connected to the history of Kazakhstan',
    'Which names are connected to nature?',
    'Show streets connected to the geography of Kazakhstan',
  ],
};
