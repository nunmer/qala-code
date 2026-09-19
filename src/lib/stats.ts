import { CATEGORIES } from '@/data/categories';
import type { CategoryStat, Statistics, Street } from './types';
import { parseTwoGisLocation } from './twogis';

/**
 * Агрегаты для «Карты смыслов» (§10 README).
 *
 * Все доли считаются от размера исследованной выборки, а не от
 * общего числа улиц Астаны — интерфейс обязан это подписывать.
 */
export function buildStatistics(streets: readonly Street[]): Statistics {
  const total = streets.length;

  const categories: readonly CategoryStat[] = CATEGORIES.map((category) => {
    const count = streets.filter((street) => street.category === category.id).length;
    return {
      category,
      count,
      share: total === 0 ? 0 : count / total,
    };
  })
    .slice()
    .sort((a, b) => b.count - a.count);

  const uniqueSources = new Set(
    streets.flatMap((street) => street.sources.map((source) => source.url ?? source.title)),
  );

  return {
    total,
    published: streets.filter((street) => street.status === 'published').length,
    personalities: streets.filter((street) => street.category === 'personality').length,
    categories,
    sourcesCount: uniqueSources.size,
  };
}

/** Текстовая гистограмма в стиле §10 README — используется в «Карте смыслов». */
export function barFor(share: number, width = 20): string {
  const filled = Math.round(share * width);
  return '█'.repeat(filled).padEnd(width, '░');
}

export function formatShare(share: number): string {
  return `${(share * 100).toFixed(1)}%`;
}

/** Машинные коды проблем — интерфейс переводит их на язык пользователя. */
export type QualityIssue =
  | 'name'
  | 'description'
  | 'why_named'
  | 'facts'
  | 'sources'
  | 'location'
  | 'slug';

/**
 * Проверка записи на соответствие минимальным требованиям §29 README.
 * Пустой список означает, что запись готова к публикации.
 */
export function dataQualityIssues(street: Street): readonly QualityIssue[] {
  const issues: QualityIssue[] = [];

  if (!street.name_ru.trim() || !street.name_kz.trim()) issues.push('name');
  if (!street.slug.trim()) issues.push('slug');
  if (!street.text.description.trim()) issues.push('description');
  if (!street.text.why_named.trim()) issues.push('why_named');
  if (street.text.historical_facts.length < 3) issues.push('facts');
  if (street.sources.length === 0) issues.push('sources');
  if (!parseTwoGisLocation(street.twogis_url)) issues.push('location');

  return issues;
}

/** Подписи проблем качества данных на трёх языках. */
export const QUALITY_ISSUE_LABELS: Readonly<
  Record<QualityIssue, Readonly<Record<'ru' | 'kk' | 'en', string>>>
> = {
  name: {
    ru: 'нет названия на одном из языков',
    kk: 'тілдердің бірінде атау жоқ',
    en: 'a name is missing in one of the languages',
  },
  slug: { ru: 'не задан slug', kk: 'slug берілмеген', en: 'no slug set' },
  description: { ru: 'нет описания', kk: 'сипаттама жоқ', en: 'no description' },
  why_named: {
    ru: 'не объяснено происхождение названия',
    kk: 'атаудың шығу тегі түсіндірілмеген',
    en: 'the origin of the name is not explained',
  },
  facts: {
    ru: 'меньше трёх исторических фактов',
    kk: 'тарихи деректер үштен аз',
    en: 'fewer than three historical facts',
  },
  sources: { ru: 'нет источников', kk: 'дереккөздер жоқ', en: 'no sources' },
  location: {
    ru: 'нет рабочей ссылки 2ГИС',
    kk: 'жарамды 2ГИС сілтемесі жоқ',
    en: 'no working 2GIS link',
  },
};
