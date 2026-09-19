'use client';

import { CloseIcon } from '@/components/Icons';
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
    <div className="flex h-full items-center justify-center text-sm text-steppe-400">...</div>
  ),
});

/** Какая панель открыта поверх карты на узком экране. */
type MobileSheet = 'none' | 'filters' | 'list';

/**
 * Интерактивная карта: поиск, фильтры, карточка улицы (§4, §5, §9 README).
 *
 * Раскладка принципиально разная:
 *  - на широком экране слева постоянная панель, справа карта;
 *  - на узком экране карта занимает весь экран, а поиск, фильтры и список
 *    открываются поверх неё. Складывать их в колонку нельзя: панель
 *    вытесняет карту за пределы экрана, и главный объект страницы
 *    становится недоступен.
 */
export default function MapPage() {
  const { t, lang } = useTranslation();
  const dataset = useDataset();
  const streets = useMemo(() => publishedOnly(dataset), [dataset]);

  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<ReadonlySet<CategoryId>>(new Set());
  const [selected, setSelected] = useState<Street | null>(null);
  const [sheet, setSheet] = useState<MobileSheet>('none');

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

  function pick(street: Street) {
    setSelected(street);
    setSheet('none');
  }

  const found = (
    <span>
      {t('map.found')}: <span className="tabular-nums text-steppe-100">{visible.length}</span>{' '}
      {t('map.of')} {streets.length}
    </span>
  );

  // Поле рисуется дважды: в боковой панели и в строке над картой.
  // Идентификатор передаётся снаружи, иначе на узком экране в документе
  // оказались бы два элемента с одним id и подпись указывала бы не туда.
  const searchField = (id: string) => (
    <div>
      <label htmlFor={id} className="sr-only">
        {t('map.searchLabel')}
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('map.searchPlaceholder')}
        className="w-full rounded-lg border border-steppe-700 bg-steppe-950 px-3 py-2 text-base text-steppe-100 placeholder:text-steppe-600 focus:border-gold-500 focus:outline-none sm:text-sm"
      />
    </div>
  );

  const resultList = (
    <ul>
      {visible.length === 0 && (
        <li className="p-4 text-sm text-steppe-400">{t('map.empty')}</li>
      )}
      {visible.map((street) => (
        <li key={street.id}>
          <button
            type="button"
            onClick={() => pick(street)}
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
  );

  return (
    <main className="flex h-[calc(100dvh-var(--header-h))] flex-col lg:flex-row">
      {/* Постоянная панель - только на широком экране. */}
      <aside className="hidden w-80 shrink-0 flex-col border-r border-steppe-800 bg-steppe-900 lg:flex">
        <div className="space-y-4 border-b border-steppe-800 p-4">
          {searchField('street-search-desktop')}
          <p className="text-[11px] leading-relaxed text-steppe-400">{t('map.searchHint')}</p>
          <CategoryFilter
            selected={categories}
            onToggle={toggleCategory}
            onReset={() => setCategories(new Set())}
            streets={streets}
          />
        </div>

        <div className="px-4 py-2 text-xs text-steppe-400">{found}</div>

        <div className="thin-scroll flex-1 overflow-y-auto border-t border-steppe-800">
          {resultList}
        </div>
      </aside>

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Компактная строка управления над картой на узком экране. */}
        <div className="flex shrink-0 items-center gap-2 border-b border-steppe-800 bg-steppe-900 p-2 lg:hidden">
          <div className="min-w-0 flex-1">{searchField('street-search-mobile')}</div>
          <SheetButton
            active={sheet === 'filters'}
            onClick={() => setSheet(sheet === 'filters' ? 'none' : 'filters')}
            label={t('map.categories')}
            badge={categories.size > 0 ? categories.size : undefined}
          />
          <SheetButton
            active={sheet === 'list'}
            onClick={() => setSheet(sheet === 'list' ? 'none' : 'list')}
            label={t('map.list')}
            badge={visible.length}
          />
        </div>

        <div className="relative min-h-0 flex-1">
          <MapView streets={visible} selected={selected} onSelect={pick} />

          <p className="pointer-events-none absolute bottom-2 left-2 z-[900] hidden rounded-md bg-steppe-950/85 px-2 py-1 text-[10px] text-steppe-400 sm:block">
            {t('map.locationSource')}
          </p>

          {/* Панели поверх карты: снизу на телефоне, сбоку на планшете и шире. */}
          {sheet === 'filters' && (
            <MobilePanel title={t('map.categories')} onClose={() => setSheet('none')}>
              <div className="p-4">
                <CategoryFilter
                  selected={categories}
                  onToggle={toggleCategory}
                  onReset={() => setCategories(new Set())}
                  streets={streets}
                />
                <p className="mt-4 text-[11px] leading-relaxed text-steppe-400">
                  {t('map.searchHint')}
                </p>
              </div>
            </MobilePanel>
          )}

          {sheet === 'list' && (
            <MobilePanel title={t('map.list')} onClose={() => setSheet('none')}>
              <div className="border-b border-steppe-800 px-4 py-2 text-xs text-steppe-400">
                {found}
              </div>
              {resultList}
            </MobilePanel>
          )}

          {selected && (
            <div className="absolute inset-0 z-[1010] border-steppe-800 bg-steppe-900 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[26rem] sm:border-l sm:shadow-2xl">
              <StreetPanel street={selected} onClose={() => setSelected(null)} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function SheetButton({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs transition ${
        active
          ? 'border-gold-500 bg-gold-500 text-steppe-950'
          : 'border-steppe-700 text-steppe-300'
      }`}
    >
      <span className="max-w-[5.5rem] truncate">{label}</span>
      {badge !== undefined && (
        <span
          className={`rounded px-1 text-[10px] tabular-nums ${
            active ? 'bg-steppe-950/20' : 'bg-steppe-800'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/** Панель поверх карты на узком экране. */
function MobilePanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 z-[1005] flex flex-col bg-steppe-900 lg:hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-steppe-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-steppe-100">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="rounded-lg border border-steppe-700 px-2.5 py-1 text-xs text-steppe-400 transition hover:text-steppe-100"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="thin-scroll flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
