'use client';

import Link from 'next/link';
import { getStreetText, getStreetTitle, hasTranslation } from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import type { Street } from '@/lib/types';
import { CategoryBadge, SubcategoryTags } from './CategoryBadge';

/** Карточка улицы в боковой панели карты (§5 README). */
export function StreetPanel({
  street,
  onClose,
}: {
  street: Street;
  onClose: () => void;
}) {
  const { t, lang } = useTranslation();
  const text = getStreetText(street, lang);
  const translated = hasTranslation(street, lang);

  return (
    <article className="flex h-full flex-col">
      <header className="flex items-start justify-between gap-3 border-b border-steppe-800 p-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-steppe-100">
            {getStreetTitle(street, lang)}
          </h2>
          <p className="truncate text-sm text-steppe-400">
            {lang === 'ru' ? street.name_kz : street.name_ru}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('street.close')}
          className="shrink-0 rounded-lg border border-steppe-700 px-2 py-1 text-xs text-steppe-400 transition hover:border-steppe-600 hover:text-steppe-100"
        >
          ✕
        </button>
      </header>

      <div className="thin-scroll flex-1 space-y-4 overflow-y-auto p-4 text-sm leading-relaxed">
        {!translated && (
          <p className="rounded-lg border border-steppe-700 bg-steppe-800/60 p-2.5 text-[11px] text-steppe-300">
            {t('common.translationFallback')}
          </p>
        )}

        <div className="space-y-2">
          <CategoryBadge category={street.category} />
          <SubcategoryTags items={street.subcategories} />
        </div>

        <Section title={t('street.who')}>{text.who_is_it}</Section>
        <Section title={t('street.why')}>{text.why_named}</Section>

        <div>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-steppe-400">
            {t('street.facts')}
          </h3>
          <ol className="space-y-1.5">
            {text.historical_facts.map((fact, index) => (
              <li key={fact} className="flex gap-2 text-steppe-300">
                <span className="shrink-0 tabular-nums text-gold-500">{index + 1}.</span>
                <span>{fact}</span>
              </li>
            ))}
          </ol>
        </div>

        {text.interesting_fact && (
          <p className="rounded-lg border border-gold-500/30 bg-gold-500/10 p-3 text-steppe-200">
            <span className="mr-1.5 font-semibold text-gold-400">
              {t('street.interesting')}:
            </span>
            {text.interesting_fact}
          </p>
        )}

        <Section title={t('street.connection')}>{text.cultural_connection}</Section>
      </div>

      <footer className="border-t border-steppe-800 p-4">
        <Link
          href={`/street/${street.slug}`}
          className="block rounded-lg bg-gold-500 px-4 py-2.5 text-center text-sm font-semibold text-steppe-950 transition hover:bg-gold-400"
        >
          {t('street.fullPage')}
        </Link>
      </footer>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-steppe-400">
        {title}
      </h3>
      <p className="text-steppe-200">{children}</p>
    </div>
  );
}
