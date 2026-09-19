'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { CategoryBadge } from '@/components/CategoryBadge';
import { StreetPanel } from '@/components/StreetPanel';
import { getStreetTitle } from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import { publishedOnly, useDataset } from '@/lib/dataset';
import { filterByCategories, searchStreets, sortByName } from '@/lib/search';
import type { CategoryId, Street } from '@/lib/types';

// Leaflet обращается к window при импорте, поэтому карта грузится только в браузере.
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-steppe-400">…</div>
  ),
});

/** Интерактивная карта: поиск, фильтры, карточка улицы (§4, §5, §9 README). */
export default function MapPage() {
  const { t, lang } = useTranslation();
  const dataset = useDataset();
  const streets = useMemo(() => publishedOnly(dataset), [dataset]);

  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<ReadonlySet<CategoryId>>(new Set());
  const [selected, setSelected] = useState<Street | null>(null);

  const visible = useMemo(() => {
    const byCategory = filterByCategories(streets, categories);
    return query.trim() ? searchStreets(byCategory, query) : sortByName(byCategory);
  }, [streets, categories, query]);

  function toggleCategory(id: CategoryId) {
    setCategories((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="flex h-[calc(100vh-57px)] flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-steppe-800 bg-steppe-900 lg:w-80 lg:border-b-0 lg:border-r">
        <div className="space-y-4 border-b border-steppe-800 p-4">
          <div>
            <label htmlFor="street-search" className="sr-only">
              {t('map.searchLabel')}
            </label>
            <input
              id="street-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('map.searchPlaceholder')}
              className="w-full rounded-lg border border-steppe-700 bg-steppe-950 px-3 py-2 text-sm text-steppe-100 placeholder:text-steppe-600 focus:border-gold-500 focus:outline-none"
            />
            <p className="mt-1.5 text-[11px] text-steppe-400">{t('map.searchHint')}</p>
          </div>

          <CategoryFilter
            selected={categories}
            onToggle={toggleCategory}
            onReset={() => setCategories(new Set())}
            streets={streets}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 text-xs text-steppe-400">
          <span>
            {t('map.found')}:{' '}
            <span className="tabular-nums text-steppe-100">{visible.length}</span>{' '}
            {t('map.of')} {streets.length}
          </span>
        </div>

        <ul className="thin-scroll flex-1 overflow-y-auto border-t border-steppe-800">
          {visible.length === 0 && (
            <li className="p-4 text-sm text-steppe-400">{t('map.empty')}</li>
          )}
          {visible.map((street) => (
            <li key={street.id}>
              <button
                type="button"
                onClick={() => setSelected(street)}
                className={`w-full border-b border-steppe-800/60 px-4 py-3 text-left transition hover:bg-steppe-800 ${
                  selected?.id === street.id ? 'bg-steppe-800' : ''
                }`}
              >
                <span className="block text-sm font-medium text-steppe-100">
                  {getStreetTitle(street, lang)}
                </span>
                <span className="mt-0.5 block text-xs text-steppe-400">
                  {lang === 'ru' ? street.name_kz : street.name_ru}
                </span>
                <span className="mt-1.5 block">
                  <CategoryBadge category={street.category} size="sm" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="relative min-h-[50vh] flex-1">
        <MapView streets={visible} selected={selected} onSelect={setSelected} />

        {selected && (
          <div className="absolute inset-y-0 right-0 z-[1000] w-full max-w-md border-l border-steppe-800 bg-steppe-900/98 shadow-2xl backdrop-blur sm:w-[26rem]">
            <StreetPanel street={selected} onClose={() => setSelected(null)} />
          </div>
        )}

        <p className="pointer-events-none absolute bottom-2 left-2 z-[900] rounded-md bg-steppe-950/85 px-2 py-1 text-[10px] text-steppe-400">
          {t('map.locationSource')}
        </p>
      </div>
    </main>
  );
}
