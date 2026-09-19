import { CATEGORIES, CATEGORY_KEYWORDS } from '@/data/categories';
import { SUBCATEGORIES, type SubcategoryId } from '@/data/subcategories';
import { getStreetText } from '@/data/streets/translations';
import { DEFAULT_LANG, type Lang } from '@/i18n/config';
import type { CategoryId, Street } from './types';
import { normalizeForSearch, stemMatch, tokenize } from './normalize';
import { scoreMatch } from './search';

/**
 * Retrieval - шаг «поиск по базе QALA CODE» из архитектуры §12-13 README.
 *
 * Работает полностью в браузере поверх встроенного датасета.
 * LLM получает ТОЛЬКО то, что вернёт эта функция: она определяет границы
 * того, о чём модель вправе говорить (§14).
 */

export interface QueryIntent {
  readonly categories: readonly CategoryId[];
  /** Подкатегории, угаданные по вопросу. */
  readonly subcategories: readonly SubcategoryId[];
  readonly tokens: readonly string[];
  /** Вопрос просит список объектов, а не рассказ об одном. */
  readonly wantsList: boolean;
}

export interface RetrievalResult {
  readonly intent: QueryIntent;
  readonly streets: readonly Street[];
}

const MAX_RESULTS = 6;

/**
 * Минимальная длина токена для поиска по тексту карточки.
 * Имена сопоставляются и по более коротким токенам - там совпадение
 * проверяется целиком, а не подстрокой.
 */
const MIN_BODY_TOKEN = 4;

/**
 * Слова вопроса, указывающие на подкатегорию записи.
 *
 * Это отдельный от категорий слой: улица в честь писателя относится
 * к категории «Личности» (названа в честь человека), а «писатели» -
 * её подкатегория. Без этого различия вопрос «улицы в честь писателей»
 * уводил бы в категорию «Литература и искусство», где лежат эпос и музыка.
 *
 * Шаблоны покрывают три языка интерфейса.
 */
const SUBCATEGORY_HINTS: readonly (readonly [RegExp, SubcategoryId])[] = [
  [/писател|прозаик|жазушы|writer|novelist/i, 'writers'],
  [/поэт|акын|ақын|жырау|poet|bard/i, 'poets'],
  [/учён|учен|науч|академик|исследовател|ғалым|ғылым|scholar|scientist|academic/i, 'scientists'],
  [/военн|полковод|батыр|солдат|воин|генерал|әскери|қолбасшы|military|commander|warrior/i, 'military'],
  [/государств|политик|правител|хан\b|руководител|мемлекет|билеуші|statesman|statesmen|ruler|khan/i, 'statesmen'],
  [/просвет|педагог|образован|школ|учител|ағартушы|мектеп|enlighten|educat|teacher|school/i, 'education'],
  [/музык|кюй|күй|домбр|композитор|music|composer|dombra/i, 'music'],
  [/эпос|сказани|фольклор|жыр\b|epic|folklore|tale/i, 'epic'],
  [/город|городищ|қала\b|city|cities|town/i, 'cities'],
  [/рек[аиу]|озёр|озер|гидроним|өзен|көл\b|river|lake|hydronym/i, 'rivers'],
  [/гор[аы]\b|хребет|массив|тау\b|mountain|range/i, 'mountains'],
  [/заповедн|птиц|фламинго|қорық|құс\b|reserve|bird|flamingo/i, 'reserves'],
  [/понят|ценност|идея|ұғым|құндылық|concept|value|idea/i, 'concepts'],
];

const LIST_INTENT =
  /каки|какие|найди|покажи|перечисли|список|все улицы|связанн|қандай|тап\b|көрсет|тізім|which|what streets|list|show me|find/i;

/**
 * Слова, которые встречаются почти в каждой записи базы и потому ничего
 * не различают: «улица», «название», «Казахстан», вопросительные слова.
 * Без их отсева вопрос «улицы, названные в честь...» совпадал бы с любой
 * карточкой, где есть слово «название».
 *
 * Хранятся как основы: сравнение идёт по общему префиксу.
 */
const STOPWORD_STEMS: readonly string[] = [
  // русский
  'улиц', 'проспект', 'бульвар', 'шоссе',
  'назван', 'наименован', 'имя', 'именем',
  'какие', 'какая', 'какой', 'найди', 'покажи', 'перечисли', 'расскажи',
  'связан', 'честь', 'который', 'этой', 'этот', 'такой', 'кто', 'что', 'это',
  'казахстан', 'астана', 'столиц', 'город',
  'история', 'исторический',
  // казахский
  'көше', 'даңғыл', 'атау', 'аталған', 'қандай', 'көрсет', 'тізім', 'байланыс',
  'қазақстан', 'елорда',
  // английский
  'street', 'avenue', 'named', 'name', 'which', 'what', 'show', 'find', 'list',
  'about', 'after', 'with', 'kazakhstan', 'astana', 'city', 'capital',
  'who', 'was', 'were', 'does', 'did', 'the', 'and', 'for', 'from', 'tell',
  // Тематические слова: их уже учитывает классификация по категориям,
  // а как свободные токены они совпадают почти с каждой карточкой.
  'history', 'historic', 'connect', 'relate', 'geograph', 'natur', 'cultur',
].map(normalizeForSearch);

function isStopword(token: string): boolean {
  return STOPWORD_STEMS.some((stem) => stemMatch(token, stem, Math.min(4, stem.length)));
}

/** Слова вопроса как есть - без транслитерации, для сопоставления с ключевыми словами. */
function words(lowered: string): readonly string[] {
  return lowered.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

/**
 * Ключевое слово засчитывается, только если с него начинается целое слово вопроса.
 *
 * Подстрочный поиск здесь недопустим: казахское «атаулар» («названия»)
 * содержит подстроку «тау» («гора») и без этой проверки уводило вопрос
 * о природе в категорию географии.
 *
 * Многословные ключи («в честь кого») сравниваются по всей строке.
 */
function matchesKeyword(lowered: string, tokens: readonly string[], keyword: string): boolean {
  if (keyword.includes(' ')) return lowered.includes(keyword);
  return tokens.some((word) => word.startsWith(keyword));
}

/** Классификация запроса (§13): категории, подкатегории и содержательные токены. */
export function classifyQuery(question: string): QueryIntent {
  const lowered = question.toLowerCase();
  const rawWords = words(lowered);

  const categories = CATEGORIES.map((category) => category.id).filter((id) =>
    CATEGORY_KEYWORDS[id].some((keyword) => matchesKeyword(lowered, rawWords, keyword)),
  );

  const subcategories = SUBCATEGORY_HINTS.filter(([pattern]) => pattern.test(lowered)).map(
    ([, id]) => id,
  );

  return {
    categories,
    subcategories,
    tokens: tokenize(question).filter((token) => !isStopword(token)),
    wantsList: LIST_INTENT.test(lowered),
  };
}

/** Совпадает ли подкатегория записи с угаданной по вопросу. */
function matchesSubcategory(street: Street, wanted: readonly SubcategoryId[]): boolean {
  if (wanted.length === 0) return false;
  return street.subcategories.some((id) => wanted.includes(id));
}

/** Насколько содержание записи релевантно токенам вопроса. */
function contentScore(street: Street, tokens: readonly string[], lang: Lang): number {
  if (tokens.length === 0) return 0;

  // Отдельные нормализованные варианты названия: по ним считается точное
  // совпадение. Без этого «Abay» одинаково срабатывал бы на улице Абая
  // и на улице Жамбыла Жабаева, где «abai» просто лежит внутри «Zhabayev».
  const nameKeys = [street.name_ru, street.name_kz, street.name_en ?? '', ...street.alt_names]
    .filter(Boolean)
    .map(normalizeForSearch);
  const nameKey = nameKeys.join(' ');

  // Ищем и по языку пользователя, и по русскому оригиналу: перевод может
  // отсутствовать, а вопрос всё равно должен находить запись.
  const texts = lang === DEFAULT_LANG ? [street.text] : [getStreetText(street, lang), street.text];
  const bodyKey = normalizeForSearch(
    texts
      .flatMap((text) => [
        text.description,
        text.who_is_it,
        text.why_named,
        text.cultural_connection,
        text.interesting_fact ?? '',
        text.historical_facts.join(' '),
      ])
      .join(' '),
  );

  return tokens.reduce((score, token) => {
    if (nameKeys.some((key) => key === token)) return score + 20;
    if (nameKeys.some((key) => key.startsWith(token))) return score + 16;
    if (nameKey.includes(token)) return score + 8;

    // Короткое слово внутри длинного текста - совпадение случайное:
    // «are» находится в «area», «share», «Sarayshyq». По телу карточки
    // ищем только достаточно длинные токены.
    if (token.length >= MIN_BODY_TOKEN && bodyKey.includes(token)) return score + 3;
    return score;
  }, 0);
}

/**
 * Основная функция retrieval: возвращает релевантные записи базы.
 *
 * Ищет только среди опубликованных записей (§26) - черновики не должны
 * попадать ни к пользователю, ни в контекст модели.
 */
export function retrieve(
  streets: readonly Street[],
  question: string,
  lang: Lang = DEFAULT_LANG,
  limit = MAX_RESULTS,
): RetrievalResult {
  const intent = classifyQuery(question);
  const published = streets.filter((street) => street.status === 'published');

  const scored = published
    .map((street) => {
      // Подкатегория - самый точный сигнал: она отвечает на вопрос
      // «кем был человек», а не только «человек это или место».
      const bySubcategory = matchesSubcategory(street, intent.subcategories) ? 30 : 0;
      const byCategory = intent.categories.includes(street.category) ? 8 : 0;
      const byName = scoreMatch(street, question);
      const byTokens = contentScore(street, intent.tokens, lang);

      return { street, score: bySubcategory + byCategory + byName + byTokens };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.street.name_ru.localeCompare(b.street.name_ru, 'ru'),
    );

  // Запрос вида «улицы, связанные с природой» не содержит имён -
  // тогда категория сама по себе является достаточным критерием.
  if (scored.length === 0 && intent.categories.length > 0) {
    return {
      intent,
      streets: published
        .filter((street) => intent.categories.includes(street.category))
        .slice(0, limit),
    };
  }

  // Для списочных вопросов отдаём чуть больше записей: пользователь
  // просил перечень, а не одну карточку.
  const effectiveLimit = intent.wantsList ? Math.max(limit, 8) : limit;

  return { intent, streets: scored.slice(0, effectiveLimit).map((entry) => entry.street) };
}

/**
 * Собирает контекст для LLM из найденных записей.
 * Модель не получает ничего, кроме этого текста, - это и есть
 * ограничение «отвечать только на основании базы» (§14).
 */
export function buildContext(streets: readonly Street[], lang: Lang = DEFAULT_LANG): string {
  if (streets.length === 0) return 'В базе QALA CODE не найдено подходящих записей.';

  return streets
    .map((street, index) => {
      const text = getStreetText(street, lang);
      const subcategories = street.subcategories
        .map((id) => SUBCATEGORIES[id]?.[lang] ?? id)
        .join(', ');

      const lines = [
        `[Запись ${index + 1}]`,
        `Название: ${text.kind} ${street.name_ru} (каз. ${street.name_kz}; англ. ${street.name_en ?? '-'})`,
        `slug: ${street.slug}`,
        `Категория: ${street.category}; подкатегории: ${subcategories || '-'}`,
        `Кто/что это: ${text.who_is_it}`,
        `Почему так названа: ${text.why_named}`,
        `Историческая справка:\n${text.historical_facts.map((f) => `- ${f}`).join('\n')}`,
        text.interesting_fact ? `Интересный факт: ${text.interesting_fact}` : '',
        `Связь с Казахстаном: ${text.cultural_connection}`,
        `Источники: ${street.sources.map((s) => s.title).join('; ')}`,
      ];
      return lines.filter(Boolean).join('\n');
    })
    .join('\n\n');
}
