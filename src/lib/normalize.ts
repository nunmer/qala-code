/**
 * Нормализация названий для поиска (§8 README).
 *
 * Задача: «Кабанбай», «Қабанбай», «Qabanbay» и «Qabanbai» должны
 * приводиться к одной форме и вести к одной сущности.
 *
 * Подход: и кириллица, и латиница сводятся к общему упрощённому
 * латинскому ключу. Точность здесь сознательно принесена в жертву
 * полноте — для поиска по названиям это правильный компромисс.
 */

/** Кириллица (русская и казахская) → латиница. */
const CYRILLIC_TO_LATIN: Readonly<Record<string, string>> = {
  а: 'a', ә: 'a', б: 'b', в: 'v', г: 'g', ғ: 'g', д: 'd', е: 'e', ё: 'e',
  ж: 'zh', з: 'z', и: 'i', й: 'i', к: 'k', қ: 'k', л: 'l', м: 'm', н: 'n',
  ң: 'n', о: 'o', ө: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ұ: 'u',
  ү: 'u', ф: 'f', х: 'h', һ: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh',
  ъ: '', ы: 'y', і: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

/**
 * Сведение латинских вариантов записи к общему виду.
 * Применяется уже после транслитерации, поэтому действует
 * одинаково и на исходно латинский ввод, и на кириллический.
 */
const LATIN_FOLDING: readonly (readonly [RegExp, string])[] = [
  [/q/g, 'k'],
  [/x/g, 'h'],
  [/w/g, 'v'],
  [/j/g, 'zh'],
  [/c(?!h)/g, 'k'],
  [/y/g, 'i'],
  [/(.)\1+/g, '$1'],
];

/**
 * Приводит строку к каноническому поисковому ключу.
 *
 * @example normalizeForSearch('Қабанбай') === normalizeForSearch('Qabanbay')
 */
export function normalizeForSearch(input: string): string {
  if (!input) return '';

  const transliterated = Array.from(input.toLowerCase())
    .map((char) => (char in CYRILLIC_TO_LATIN ? CYRILLIC_TO_LATIN[char] : char))
    .join('');

  const folded = LATIN_FOLDING.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    transliterated,
  );

  return folded.replace(/[^a-z0-9]/g, '');
}

/** Разбивает произвольный текст на нормализованные токены длиной от 3 символов. */
export function tokenize(input: string): readonly string[] {
  return input
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .map(normalizeForSearch)
    .filter((token) => token.length >= 3);
}

/**
 * Совпадение по основе слова.
 *
 * Русский язык словоизменителен: в вопросе «улицы в честь писателей»
 * и в подкатегории «писатели» одна основа, но разные окончания.
 * Сравниваем общий префикс нормализованных форм.
 */
export function stemMatch(a: string, b: string, minPrefix = 5): boolean {
  if (!a || !b) return false;
  if (a === b) return true;

  const limit = Math.min(a.length, b.length);
  if (limit < minPrefix) return false;

  let common = 0;
  while (common < limit && a[common] === b[common]) common += 1;

  return common >= minPrefix;
}
