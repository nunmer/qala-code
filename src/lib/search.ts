import { SUBCATEGORIES } from '@/data/subcategories';
import type { CategoryId, Street } from './types';
import { normalizeForSearch } from './normalize';

/**
 * Поиск и фильтрация улиц (§8, §9 README).
 * Все функции чистые и возвращают новые массивы - исходный датасет не мутируется.
 */

/** Все нормализованные варианты написания названия улицы. */
function searchKeys(street: Street): readonly string[] {
  return [
    street.name_ru,
    street.name_kz,
    street.name_en ?? '',
    street.slug,
    ...street.alt_names,
  ]
    .filter(Boolean)
    .map(normalizeForSearch);
}

/**
 * Оценка соответствия улицы запросу.
 * 0 - не подходит; больше - лучше. Точное совпадение всегда впереди префиксного.
 */
export function scoreMatch(street: Street, query: string): number {
  const normalized = normalizeForSearch(query);
  if (!normalized) return 0;

  const keys = searchKeys(street);

  if (keys.some((key) => key === normalized)) return 100;
  if (keys.some((key) => key.startsWith(normalized))) return 70;
  if (keys.some((key) => key.includes(normalized))) return 50;
  if (keys.some((key) => normalized.startsWith(key) && key.length >= 3)) return 40;

  // Последний шанс - совпадение по содержательным полям карточки.
  const subcategoryLabels = street.subcategories
    .flatMap((id) => Object.values(SUBCATEGORIES[id] ?? {}))
    .join(' ');
  const haystack = normalizeForSearch(
    `${street.text.description} ${street.text.who_is_it} ${subcategoryLabels}`,
  );
  return haystack.includes(normalized) ? 15 : 0;
}

export function searchStreets(
  streets: readonly Street[],
  query: string,
): readonly Street[] {
  if (!query.trim()) return streets;

  return streets
    .map((street) => ({ street, score: scoreMatch(street, query) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.street.name_ru.localeCompare(b.street.name_ru, 'ru'),
    )
    .map((entry) => entry.street);
}

/** Фильтр по категориям (§9). Пустой набор означает «показать все». */
export function filterByCategories(
  streets: readonly Street[],
  categories: ReadonlySet<CategoryId>,
): readonly Street[] {
  if (categories.size === 0) return streets;
  return streets.filter((street) => categories.has(street.category));
}

export function findBySlug(
  streets: readonly Street[],
  slug: string,
): Street | undefined {
  return streets.find((street) => street.slug === slug);
}

export function sortByName(streets: readonly Street[]): readonly Street[] {
  return [...streets].sort((a, b) => a.name_ru.localeCompare(b.name_ru, 'ru'));
}
