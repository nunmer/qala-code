'use client';

import { CATEGORIES } from '@/data/categories';
import { useTranslation } from '@/i18n/LanguageProvider';
import type { CategoryId, Street } from '@/lib/types';

/** Фильтрация по нескольким категориям одновременно (§9 README). */
export function CategoryFilter({
  selected,
  onToggle,
  onReset,
  streets,
}: {
  selected: ReadonlySet<CategoryId>;
  onToggle: (id: CategoryId) => void;
  onReset: () => void;
  streets: readonly Street[];
}) {
  const { t, lang } = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-steppe-400">
          {t('map.categories')}
        </h3>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-steppe-400 underline-offset-2 transition hover:text-steppe-100 hover:underline"
          >
            {t('map.reset')}
          </button>
        )}
      </div>

      <ul className="space-y-1">
        {CATEGORIES.map((category) => {
          const count = streets.filter((s) => s.category === category.id).length;
          const checked = selected.has(category.id);

          return (
            <li key={category.id}>
              <label
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-steppe-800"
                title={category.description[lang]}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(category.id)}
                  className="h-3.5 w-3.5 shrink-0 cursor-pointer accent-gold-500"
                />
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span
                  className={`flex-1 text-sm ${checked ? 'text-steppe-100' : 'text-steppe-300'}`}
                >
                  {category.label[lang]}
                </span>
                <span className="text-xs tabular-nums text-steppe-400">{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
