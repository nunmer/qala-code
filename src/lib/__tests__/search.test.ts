import { describe, expect, it } from 'vitest';
import { STREETS } from '@/data/streets';
import { normalizeForSearch, stemMatch, tokenize } from '../normalize';
import { filterByCategories, findBySlug, searchStreets } from '../search';
import { buildStatistics, dataQualityIssues } from '../stats';
import { classifyQuery, retrieve } from '../retrieval';
import { NO_DATA_ANSWER, SUGGESTED_QUESTIONS, composeRetrievalAnswer } from '../ai';
import { isWithinAstana, parseTwoGisLocation } from '../twogis';
import { streetLocation } from '../location';
import { LANGUAGES } from '@/i18n/config';
import type { CategoryId } from '../types';

describe('normalizeForSearch (§8)', () => {
  it('сводит казахское, русское и латинское написание к одной форме', () => {
    const forms = ['Кабанбай', 'Қабанбай', 'Qabanbay', 'Qabanbai', 'Kabanbai'];
    const normalized = forms.map(normalizeForSearch);
    expect(new Set(normalized).size).toBe(1);
  });

  it('снимает различия казахских букв с русскими аналогами', () => {
    expect(normalizeForSearch('Әуезов')).toBe(normalizeForSearch('Ауэзов'));
    expect(normalizeForSearch('Жеңіс')).toBe(normalizeForSearch('Женис'));
    expect(normalizeForSearch('Тәуелсіздік')).toBe(normalizeForSearch('Тауелсиздик'));
  });

  it('не склеивает разные согласные: это задача alt_names, а не нормализации', () => {
    // «Сәтбаев» и «Сатпаев» различаются б/п - реальной согласной, а не
    // казахской графемой. Такие пары связываются через alt_names записи.
    expect(normalizeForSearch('Сәтбаев')).not.toBe(normalizeForSearch('Сатпаев'));
    expect(searchStreets(STREETS, 'Сәтбаев')[0]?.slug).toBe('satpayev');
    expect(searchStreets(STREETS, 'Сатпаев')[0]?.slug).toBe('satpayev');
  });

  it('отбрасывает пробелы, дефисы и регистр', () => {
    expect(normalizeForSearch('  Толе-би  ')).toBe(normalizeForSearch('толе би'));
  });

  it('возвращает пустую строку на пустом вводе', () => {
    expect(normalizeForSearch('')).toBe('');
    expect(normalizeForSearch('   ')).toBe('');
  });

  it('токенизирует текст, отбрасывая короткие слова', () => {
    expect(tokenize('Кто такой Абай?')).toContain(normalizeForSearch('абай'));
    expect(tokenize('а и в')).toHaveLength(0);
  });

  it('stemMatch сравнивает слова по общей основе', () => {
    expect(stemMatch('pisatelei', 'pisateli')).toBe(true);
    expect(stemMatch('pisatelei', 'poeti')).toBe(false);
    expect(stemMatch('abc', 'abc')).toBe(true);
    expect(stemMatch('ab', 'abcdef')).toBe(false);
    expect(stemMatch('', 'abcdef')).toBe(false);
  });
});

describe('searchStreets (§8)', () => {
  it('находит улицу по всем вариантам написания', () => {
    for (const query of ['Қабанбай', 'Кабанбай', 'Qabanbay', 'kabanbay-batyr']) {
      const results = searchStreets(STREETS, query);
      expect(results[0]?.slug, `запрос: ${query}`).toBe('kabanbay-batyr');
    }
  });

  it('находит Абая по русскому, казахскому и латинскому вводу', () => {
    for (const query of ['Абая', 'Абай', 'abay', 'Abai']) {
      expect(searchStreets(STREETS, query)[0]?.slug, `запрос: ${query}`).toBe('abay');
    }
  });

  it('находит улицу по английскому названию', () => {
    expect(searchStreets(STREETS, 'Saryarqa')[0]?.slug).toBe('saryarka');
    expect(searchStreets(STREETS, 'Bauyrzhan Momyshuly')[0]?.slug).toBe('baurzhan-momyshuly');
  });

  it('возвращает весь набор при пустом запросе', () => {
    expect(searchStreets(STREETS, '   ')).toHaveLength(STREETS.length);
  });

  it('возвращает пустой результат для заведомо отсутствующей улицы', () => {
    expect(searchStreets(STREETS, 'зурбаган')).toHaveLength(0);
  });

  it('не мутирует исходный массив', () => {
    const before = [...STREETS];
    searchStreets(STREETS, 'Абай');
    expect(STREETS).toEqual(before);
  });
});

describe('filterByCategories (§9)', () => {
  it('пустой набор категорий означает «показать все»', () => {
    expect(filterByCategories(STREETS, new Set())).toHaveLength(STREETS.length);
  });

  it('фильтрует по нескольким категориям сразу', () => {
    const selected = new Set<CategoryId>(['personality', 'nature']);
    const result = filterByCategories(STREETS, selected);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((street) => selected.has(street.category))).toBe(true);
  });
});

describe('целостность датасета (§29)', () => {
  it('slug каждой улицы уникален', () => {
    const slugs = STREETS.map((street) => street.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('id каждой улицы уникален', () => {
    const ids = STREETS.map((street) => street.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('все опубликованные записи отвечают минимальным требованиям', () => {
    const broken = STREETS.filter((street) => street.status === 'published')
      .map((street) => ({ slug: street.slug, issues: dataQualityIssues(street) }))
      .filter((entry) => entry.issues.length > 0);

    expect(broken).toEqual([]);
  });

  it('у каждой записи есть разбираемая ссылка 2ГИС', () => {
    const broken = STREETS.filter((street) => !streetLocation(street)).map((s) => s.slug);
    expect(broken).toEqual([]);
  });

  it('все координаты попадают в границы Астаны', () => {
    for (const street of STREETS) {
      const location = streetLocation(street);
      expect(location, street.slug).not.toBeNull();
      expect(isWithinAstana(location!), `${street.slug}: ${JSON.stringify(location)}`).toBe(true);
    }
  });

  it('координаты не совпадают у разных улиц', () => {
    const points = STREETS.map((street) => {
      const location = streetLocation(street)!;
      return `${location.lat},${location.lon}`;
    });
    expect(new Set(points).size).toBe(points.length);
  });

  it('у каждой записи есть хотя бы один источник', () => {
    expect(STREETS.every((street) => street.sources.length > 0)).toBe(true);
  });

  it('у каждой записи есть название на трёх языках', () => {
    for (const street of STREETS) {
      expect(street.name_ru.trim(), street.slug).not.toBe('');
      expect(street.name_kz.trim(), street.slug).not.toBe('');
      expect((street.name_en ?? '').trim(), street.slug).not.toBe('');
    }
  });

  it('findBySlug находит запись и возвращает undefined для неизвестной', () => {
    expect(findBySlug(STREETS, 'abay')?.name_ru).toBe('Абая');
    expect(findBySlug(STREETS, 'no-such-street')).toBeUndefined();
  });
});

describe('buildStatistics (§10)', () => {
  it('сумма по категориям равна размеру выборки', () => {
    const stats = buildStatistics(STREETS);
    const sum = stats.categories.reduce((total, entry) => total + entry.count, 0);
    expect(sum).toBe(stats.total);
  });

  it('доли в сумме дают единицу', () => {
    const stats = buildStatistics(STREETS);
    const sum = stats.categories.reduce((total, entry) => total + entry.share, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it('корректно обрабатывает пустой датасет', () => {
    const stats = buildStatistics([]);
    expect(stats.total).toBe(0);
    expect(stats.categories.every((entry) => entry.share === 0)).toBe(true);
  });
});

describe('retrieval (§13)', () => {
  it('определяет категорию по ключевым словам вопроса', () => {
    expect(classifyQuery('Какие улицы названы в честь писателей?').categories).toContain(
      'literature',
    );
    expect(classifyQuery('Какие названия связаны с природой?').categories).toContain('nature');
  });

  it('по вопросу об улице возвращает именно её', () => {
    const { streets } = retrieve(STREETS, 'Почему улица называется Қабанбай батыр?');
    expect(streets[0]?.slug).toBe('kabanbay-batyr');
  });

  it('по тематическому вопросу возвращает записи нужной категории', () => {
    const { streets } = retrieve(STREETS, 'Какие названия связаны с природой?');
    expect(streets.length).toBeGreaterThan(0);
    expect(streets.some((street) => street.category === 'nature')).toBe(true);
  });

  it('вопрос о писателях находит улицы людей, а не эпические сюжеты', () => {
    const { streets } = retrieve(STREETS, 'Какие улицы названы в честь писателей?');
    const slugs = streets.map((street) => street.slug);

    // Писатели и поэты лежат в категории «Личности» с подкатегорией «писатели»,
    // поэтому вопрос должен доставать именно их.
    expect(slugs).toContain('seyfullin');
    expect(slugs).toContain('auezov');

    // Кобланды батыр - герой эпоса, а не писатель.
    expect(slugs.indexOf('koblandy-batyr')).not.toBe(0);
  });

  it('вопрос об учёных находит учёных', () => {
    const slugs = retrieve(STREETS, 'Какие улицы названы в честь учёных?').streets.map(
      (street) => street.slug,
    );
    expect(slugs).toContain('satpayev');
    expect(slugs).toContain('ualikhanov');
  });

  it('распознаёт списочное намерение вопроса', () => {
    expect(classifyQuery('Какие улицы названы в честь писателей?').wantsList).toBe(true);
    expect(classifyQuery('Кто такой Абай?').wantsList).toBe(false);
  });

  it('никогда не возвращает неопубликованные записи', () => {
    const withDraft = [...STREETS, { ...STREETS[0], id: 'x', slug: 'x', status: 'draft' as const }];
    const { streets } = retrieve(withDraft, STREETS[0].name_ru);
    expect(streets.every((street) => street.status === 'published')).toBe(true);
  });

  it('на бессмысленный запрос не возвращает ничего', () => {
    expect(retrieve(STREETS, 'йцукенгшщз').streets).toHaveLength(0);
  });

  it('каждый популярный вопрос §16 даёт релевантную выборку на всех языках', () => {
    const expectations: Readonly<Record<string, CategoryId>> = {
      'Найди улицы, связанные с историей Казахстана': 'history',
      'Какие названия связаны с природой?': 'nature',
      'Покажи улицы, связанные с географией Казахстана': 'geography',
      'Қазақстан тарихымен байланысты көшелерді тап': 'history',
      'Қандай атаулар табиғатпен байланысты?': 'nature',
      'Find streets connected to the history of Kazakhstan': 'history',
      'Which names are connected to nature?': 'nature',
    };

    for (const lang of LANGUAGES) {
      for (const question of SUGGESTED_QUESTIONS[lang]) {
        const { streets } = retrieve(STREETS, question, lang);
        expect(streets.length, `[${lang}] ${question}`).toBeGreaterThan(0);

        const expected = expectations[question];
        if (expected) {
          expect(
            streets.every((street) => street.category === expected),
            `[${lang}] ${question}`,
          ).toBe(true);
        }
      }
    }
  });

  it('вопросы на казахском и английском находят нужную улицу', () => {
    expect(retrieve(STREETS, 'Абай кім?', 'kk').streets[0]?.slug).toBe('abay');
    expect(retrieve(STREETS, 'Who was Abay?', 'en').streets[0]?.slug).toBe('abay');
  });

  it('отсеивает слова, встречающиеся почти во всех записях', () => {
    const { tokens } = classifyQuery('Какие улицы названы в честь Казахстана?');
    expect(tokens).toHaveLength(0);
  });
});

describe('ответ AI-гида без модели (§14)', () => {
  it('при пустой выборке отвечает установленной формулировкой на языке интерфейса', () => {
    for (const lang of LANGUAGES) {
      expect(composeRetrievalAnswer('что угодно', [], lang)).toBe(NO_DATA_ANSWER[lang]);
    }
  });

  it('строит ответ только из полей найденной записи', () => {
    const abay = findBySlug(STREETS, 'abay');
    expect(abay).toBeDefined();

    const answer = composeRetrievalAnswer('Кто такой Абай?', [abay!], 'ru');
    expect(answer).toContain('Абая');
    expect(answer).toContain(abay!.text.who_is_it);
  });
});

describe('parseTwoGisLocation', () => {
  it('разбирает ссылку вида /geo/<id>/<lon>,<lat>', () => {
    const location = parseTwoGisLocation(
      'https://2gis.kz/astana/geo/70000001006475573/71.430255,51.128207',
    );
    expect(location).toEqual({ lat: 51.128207, lon: 71.430255 });
  });

  it('разбирает параметр m с URL-кодированием', () => {
    const location = parseTwoGisLocation('https://2gis.kz/astana?m=71.442162%2C51.16777%2F16');
    expect(location).toEqual({ lat: 51.16777, lon: 71.442162 });
  });

  it('разбирает ссылку на организацию', () => {
    const location = parseTwoGisLocation(
      'https://2gis.kz/astana/firm/70000001018424799?m=71.41%2C51.09%2F17',
    );
    expect(location).toEqual({ lat: 51.09, lon: 71.41 });
  });

  it('возвращает null, когда координат нет', () => {
    expect(parseTwoGisLocation('https://2gis.kz/astana')).toBeNull();
    expect(parseTwoGisLocation('не ссылка')).toBeNull();
    expect(parseTwoGisLocation('')).toBeNull();
  });

  it('отвергает значения за пределами допустимых координат', () => {
    expect(parseTwoGisLocation('https://2gis.kz/astana?m=999.5%2C888.5%2F16')).toBeNull();
  });

  it('isWithinAstana отличает городскую точку от посторонней', () => {
    expect(isWithinAstana({ lat: 51.13, lon: 71.43 })).toBe(true);
    expect(isWithinAstana({ lat: 43.24, lon: 76.89 })).toBe(false);
  });
});
