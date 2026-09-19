'use client';

import { getCategory } from '@/data/categories';
import { subcategoryLabel, type SubcategoryId } from '@/data/subcategories';
import { useTranslation } from '@/i18n/LanguageProvider';
import type { CategoryId } from '@/lib/types';

export function CategoryBadge({
  category,
  size = 'md',
}: {
  category: CategoryId;
  size?: 'sm' | 'md';
}) {
  const { lang } = useTranslation();
  const meta = getCategory(category);
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${padding}`}
      style={{
        color: meta.color,
        borderColor: `${meta.color}55`,
        backgroundColor: `${meta.color}1a`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label[lang]}
    </span>
  );
}

export function SubcategoryTags({ items }: { items: readonly SubcategoryId[] }) {
  const { lang } = useTranslation();
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md bg-steppe-800 px-2 py-0.5 text-[11px] text-steppe-300"
        >
          {subcategoryLabel(item, lang)}
        </span>
      ))}
    </div>
  );
}
