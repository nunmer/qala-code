import { afterEach, describe, expect, it, vi } from 'vitest';
import { STREETS } from '@/data/streets';
import { NO_DATA_ANSWER, ask, type LlmSettings } from '../ai';
import { buildContext, retrieve } from '../retrieval';
import { barFor, dataQualityIssues, formatShare } from '../stats';
import { questUrl, siteOrigin, streetUrl } from '../site';
import { buildTwoGisUrl, isTwoGisUrl, parseTwoGisName } from '../twogis';
import { findBySlug } from '../search';
import { LANGUAGES } from '@/i18n/config';
import type { Street } from '../types';

const SETTINGS: LlmSettings = {
  apiKey: 'test-key',
  model: 'gpt-4o-mini',
  baseUrl: 'https://api.openai.com/v1',
};

function mockFetch(response: unknown, ok = true, status = 200) {
  const spy = vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(response),
  });
  vi.stubGlobal('fetch', spy);
  return spy;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ask - цикл AI-гида (§12)', () => {
  it('без ключа отвечает из базы и не обращается к сети', async () => {
    const spy = mockFetch({});
    const result = await ask(STREETS, 'Кто такой Абай?', null);

    expect(spy).not.toHaveBeenCalled();
    expect(result.mode).toBe('retrieval');
    expect(result.streets[0]?.slug).toBe('abay');
  });

  it('на пустой вопрос не выполняет поиск', async () => {
    const result = await ask(STREETS, '   ', SETTINGS);
    expect(result.streets).toHaveLength(0);
    expect(result.mode).toBe('retrieval');
  });

  it('при пустой выборке не вызывает модель - ей нечем отвечать (§14)', async () => {
    const spy = mockFetch({});
    const result = await ask(STREETS, 'йцукенгшщз', SETTINGS);

    expect(spy).not.toHaveBeenCalled();
    expect(result.answer).toBe(NO_DATA_ANSWER.ru);
    expect(result.mode).toBe('retrieval');
  });

  it('передаёт модели только найденные записи', async () => {
    const spy = mockFetch({ choices: [{ message: { content: 'Ответ модели.' } }] });
    const result = await ask(STREETS, 'Кто такой Абай?', SETTINGS);

    expect(result.mode).toBe('llm');
    expect(result.answer).toBe('Ответ модели.');

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.openai.com/v1/chat/completions');

    const body = JSON.parse(String(init.body)) as {
      model: string;
      messages: { role: string; content: string }[];
    };
    expect(body.model).toBe('gpt-4o-mini');

    const userMessage = body.messages.find((m) => m.role === 'user')?.content ?? '';
    // В промпте присутствуют найденные записи и отсутствуют посторонние.
    expect(userMessage).toContain('Абай Құнанбайұлы');
    expect(userMessage).not.toContain('Коргалжынское шоссе');
  });

  it('требует от модели отвечать на языке интерфейса', async () => {
    const spy = mockFetch({ choices: [{ message: { content: 'ok' } }] });
    await ask(STREETS, 'Who was Abay?', SETTINGS, 'en');

    const body = JSON.parse(String((spy.mock.calls[0] as [string, RequestInit])[1].body)) as {
      messages: { role: string; content: string }[];
    };
    const system = body.messages.find((m) => m.role === 'system')?.content ?? '';

    expect(system).toContain('английском');
    expect(system).toContain(NO_DATA_ANSWER.en);
  });

  it('срезает лишний слеш в конце baseUrl', async () => {
    const spy = mockFetch({ choices: [{ message: { content: 'ок' } }] });
    await ask(STREETS, 'Кто такой Абай?', { ...SETTINGS, baseUrl: 'https://proxy.local/v1/' });

    expect(spy.mock.calls[0]?.[0]).toBe('https://proxy.local/v1/chat/completions');
  });

  it('пробрасывает ошибку API, а не выдумывает ответ', async () => {
    mockFetch({ error: { message: 'Invalid API key' } }, false, 401);

    await expect(ask(STREETS, 'Кто такой Абай?', SETTINGS)).rejects.toThrow('Invalid API key');
  });

  it('пустой ответ модели считается ошибкой', async () => {
    mockFetch({ choices: [{ message: { content: '   ' } }] });

    await expect(ask(STREETS, 'Кто такой Абай?', SETTINGS)).rejects.toThrow(/пустой ответ/i);
  });

  it('нечитаемое тело ответа не роняет приложение молча', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('not json')),
      }),
    );

    await expect(ask(STREETS, 'Кто такой Абай?', SETTINGS)).rejects.toThrow('HTTP 500');
  });
});

describe('buildContext (§13)', () => {
  it('включает все содержательные поля записи', () => {
    const abay = findBySlug(STREETS, 'abay');
    const context = buildContext([abay!]);

    expect(context).toContain('[Запись 1]');
    expect(context).toContain(abay!.text.who_is_it);
    expect(context).toContain(abay!.text.why_named);
    expect(context).toContain(abay!.text.historical_facts[0]);
    expect(context).toContain(abay!.sources[0].title);
  });

  it('на пустой выборке сообщает, что записей нет', () => {
    expect(buildContext([])).toContain('не найдено');
  });

  it('контекст ограничен результатом retrieval', () => {
    const { streets } = retrieve(STREETS, 'Какие названия связаны с природой?');
    const context = buildContext(streets);

    expect(context).toContain('Коргалжын');
    expect(context).not.toContain('Абай Құнанбайұлы');
  });

  it('строится на языке интерфейса, когда перевод есть', () => {
    const abay = findBySlug(STREETS, 'abay')!;
    expect(buildContext([abay], 'en')).toContain('Abay Qunanbaiuly');
    expect(buildContext([abay], 'kk')).toContain('Абай Құнанбайұлы');
  });
});

describe('stats - вспомогательные функции (§10, §29)', () => {
  it('barFor строит шкалу фиксированной ширины', () => {
    expect(barFor(0, 10)).toBe('░'.repeat(10));
    expect(barFor(1, 10)).toBe('█'.repeat(10));
    expect(barFor(0.5, 10)).toHaveLength(10);
  });

  it('formatShare печатает долю в процентах', () => {
    expect(formatShare(0.5)).toBe('50.0%');
    expect(formatShare(0)).toBe('0.0%');
  });

  it('dataQualityIssues перечисляет всё недостающее', () => {
    const broken: Street = {
      ...STREETS[0],
      name_ru: '',
      slug: '',
      twogis_url: 'https://2gis.kz/astana',
      sources: [],
      text: {
        ...STREETS[0].text,
        description: '  ',
        why_named: '',
        historical_facts: ['единственный факт'],
      },
    };

    const issues = dataQualityIssues(broken);
    expect(issues).toContain('name');
    expect(issues).toContain('slug');
    expect(issues).toContain('description');
    expect(issues).toContain('why_named');
    expect(issues).toContain('facts');
    expect(issues).toContain('sources');
    expect(issues).toContain('location');
  });

  it('полноценная запись не имеет замечаний', () => {
    expect(dataQualityIssues(STREETS[0])).toEqual([]);
  });
});

describe('site - адреса для QR-кодов (§17)', () => {
  it('формирует адрес страницы улицы', () => {
    expect(streetUrl('abay')).toBe(`${siteOrigin()}/street/abay/`);
  });

  it('формирует адрес точки квеста', () => {
    expect(questUrl(3)).toBe(`${siteOrigin()}/quest/3/`);
  });

  it('вне браузера использует канонический домен проекта', () => {
    expect(siteOrigin()).toBe('https://qalacode.kz');
  });
});

describe('twogis - вспомогательные функции', () => {
  it('распознаёт домены 2ГИС', () => {
    expect(isTwoGisUrl('https://2gis.kz/astana')).toBe(true);
    expect(isTwoGisUrl('https://2gis.ru/moscow')).toBe(true);
    expect(isTwoGisUrl('https://maps.google.com')).toBe(false);
    expect(isTwoGisUrl('не ссылка')).toBe(false);
  });

  it('собирает ссылку, которую сам же и разбирает', () => {
    const url = buildTwoGisUrl({ lat: 51.1282, lon: 71.4302 });
    expect(url).toContain('2gis.kz');
    expect(isTwoGisUrl(url)).toBe(true);
  });

  it('достаёт название из поисковой ссылки', () => {
    expect(parseTwoGisName('https://2gis.kz/astana/search/проспект%20Абая')).toBe(
      'проспект Абая',
    );
    expect(parseTwoGisName('https://2gis.kz/astana/geo/123/71.4,51.1')).toBeNull();
    expect(parseTwoGisName('мусор')).toBeNull();
  });
});

describe('переводы карточек', () => {
  it('у каждой записи есть перевод на казахский и английский', async () => {
    const { hasTranslation } = await import('@/data/streets/translations');

    for (const lang of LANGUAGES) {
      const missing = STREETS.filter((street) => !hasTranslation(street, lang)).map(
        (street) => street.slug,
      );
      expect(missing, `нет перевода на ${lang}`).toEqual([]);
    }
  });

  it('заголовок строится по правилам языка', async () => {
    const { getStreetTitle } = await import('@/data/streets/translations');
    const abay = findBySlug(STREETS, 'abay')!;

    expect(getStreetTitle(abay, 'ru')).toBe('проспект Абая');
    expect(getStreetTitle(abay, 'kk')).toBe('Абай даңғылы');
    expect(getStreetTitle(abay, 'en')).toBe('Abay Avenue');
  });

  it('не дублирует родовое слово, если оно уже в названии', async () => {
    const { getStreetTitle } = await import('@/data/streets/translations');
    const korgalzhyn = findBySlug(STREETS, 'korgalzhyn')!;

    // name_ru = «Коргалжынское шоссе», kind = «шоссе» - «шоссе» один раз.
    expect(getStreetTitle(korgalzhyn, 'ru')).toBe('Коргалжынское шоссе');
    expect(getStreetTitle(korgalzhyn, 'kk')).toBe('Қорғалжын тас жолы');
    expect(getStreetTitle(korgalzhyn, 'en')).toBe('Korgalzhyn Highway');
  });

  it('при отсутствии перевода подставляется русский оригинал', async () => {
    const { getStreetText, hasTranslation } = await import('@/data/streets/translations');
    const orphan: Street = { ...STREETS[0], slug: 'no-such-slug' };

    expect(hasTranslation(orphan, 'en')).toBe(false);
    expect(getStreetText(orphan, 'en')).toEqual(orphan.text);
  });
});
