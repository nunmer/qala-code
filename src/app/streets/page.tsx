'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { CategoryBadge } from '@/components/CategoryBadge';
import { CATEGORIES } from '@/data/categories';
import { getStreetTitle } from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import { useDataset } from '@/lib/dataset';
import { sortByName } from '@/lib/search';

/** Каталог всех записей базы - навигация без карты. */
export default function StreetsPage() {
  const { t, lang } = useTranslation();
  const streets = useDataset();

  const grouped = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        items: sortByName(streets.filter((street) => street.category === category.id)),
      })).filter((group) => group.items.length > 0),
    [streets],
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-steppe-100">{t('catalog.title')}</h1>
      <p className="mt-2 text-sm text-steppe-400">
        {streets.length} {t('catalog.subtitle')}
      </p>

      <div className="mt-8 space-y-10">
        {grouped.map(({ category, items }) => (
          <section key={category.id}>
            <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-steppe-100">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.label[lang]}
              <span className="text-sm font-normal text-steppe-400">({items.length})</span>
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-steppe-400">
              {category.description[lang]}
            </p>

            <ul className="grid gap-2 sm:grid-cols-2">
              {items.map((street) => (
                <li key={street.id}>
                  <Link
                    href={`/street/${street.slug}`}
                    className="block rounded-lg border border-steppe-800 bg-steppe-900 p-3 transition hover:border-steppe-700 hover:bg-steppe-850"
                  >
                    <span className="block text-sm font-medium text-steppe-100">
                      {getStreetTitle(street, lang)}
                    </span>
                    <span className="mt-0.5 block text-xs text-steppe-400">
                      {lang === 'ru' ? street.name_kz : street.name_ru}
                    </span>
                    <span className="mt-2 block">
                      <CategoryBadge category={street.category} size="sm" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
