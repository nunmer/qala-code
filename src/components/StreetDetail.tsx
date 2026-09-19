'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CategoryBadge, SubcategoryTags } from '@/components/CategoryBadge';
import { QrCode } from '@/components/QrCode';
import { STREETS } from '@/data/streets';
import {
  getStreetName,
  getStreetText,
  getStreetTitle,
  hasTranslation,
} from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import { streetLocation } from '@/lib/location';
import { findBySlug } from '@/lib/search';
import { loadOverrides } from '@/lib/storage';
import { streetUrl } from '@/lib/site';
import type { Street } from '@/lib/types';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-xs text-steppe-400">...</div>
  ),
});

/** Страница улицы (§5, §21 README). */
export function StreetDetail({ street: initial }: { street: Street }) {
  const { t, lang } = useTranslation();
  const [street, setStreet] = useState(initial);
  const [url, setUrl] = useState('');

  // Правки, сделанные в редакторе данных, должны быть видны и здесь.
  useEffect(() => {
    const overrides = loadOverrides();
    if (overrides) {
      const updated = findBySlug(overrides, initial.slug);
      if (updated) setStreet(updated);
    }
    setUrl(streetUrl(initial.slug));
  }, [initial.slug]);

  const text = getStreetText(street, lang);
  const translated = hasTranslation(street, lang);
  const location = useMemo(() => streetLocation(street), [street]);

  const related = STREETS.filter(
    (item) => item.category === street.category && item.slug !== street.slug,
  ).slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:py-10">
      <Link
        href="/map"
        className="no-print text-sm text-steppe-400 transition hover:text-steppe-100"
      >
        {t('street.back')}
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl font-bold text-steppe-100 sm:text-4xl">
          {getStreetTitle(street, lang)}
        </h1>
        <p className="mt-1 text-lg text-steppe-400">
          {lang === 'ru' ? street.name_kz : street.name_ru}
        </p>
        <div className="mt-4 space-y-2">
          <CategoryBadge category={street.category} />
          <SubcategoryTags items={street.subcategories} />
        </div>

        {!translated && (
          <p className="mt-4 rounded-lg border border-steppe-700 bg-steppe-800/60 p-3 text-sm text-steppe-300">
            {t('common.translationFallback')}
          </p>
        )}

        {street.status !== 'published' && (
          <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
            {t('street.draftWarning')}: {street.status}. {t('street.draftNote')}
          </p>
        )}
      </header>

      <p className="mt-6 text-lg leading-relaxed text-steppe-200">{text.description}</p>

      <Block title={t('street.who')}>{text.who_is_it}</Block>
      <Block title={t('street.why')}>{text.why_named}</Block>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steppe-400">
          {t('street.facts')}
        </h2>
        <ol className="space-y-2.5">
          {text.historical_facts.map((fact, index) => (
            <li key={fact} className="flex gap-3 leading-relaxed text-steppe-200">
              <span className="shrink-0 font-semibold tabular-nums text-gold-500">
                {index + 1}.
              </span>
              <span>{fact}</span>
            </li>
          ))}
        </ol>
      </section>

      {text.interesting_fact && (
        <p className="mt-8 rounded-xl border border-gold-500/30 bg-gold-500/10 p-4 leading-relaxed text-steppe-200">
          <span className="mr-2 font-semibold text-gold-400">{t('street.interesting')}:</span>
          {text.interesting_fact}
        </p>
      )}

      <Block title={t('street.connection')}>{text.cultural_connection}</Block>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steppe-400">
          {t('street.location')}
        </h2>

        {location ? (
          <>
            <div className="h-72 overflow-hidden rounded-xl border border-steppe-800">
              <MapView
                streets={[street]}
                selected={street}
                onSelect={() => {}}
                fitOnChange={false}
              />
            </div>
            <a
              href={street.twogis_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-sky-qala underline-offset-2 hover:underline"
            >
              {t('street.openIn2gis')}
            </a>
            <p className="mt-1 text-xs text-steppe-400">{t('map.locationSource')}</p>
          </>
        ) : (
          <p className="rounded-lg border border-steppe-800 bg-steppe-900 p-4 text-sm text-steppe-400">
            {t('street.noLocation')}
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steppe-400">
          {t('street.sources')}
        </h2>
        <ul className="space-y-2">
          {street.sources.map((source) => (
            <li key={source.title} className="text-sm">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-qala underline-offset-2 hover:underline"
                >
                  {source.title}
                </a>
              ) : (
                <span className="text-steppe-300">{source.title}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 flex flex-col items-start gap-6 rounded-xl border border-steppe-800 bg-steppe-900 p-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-steppe-400">
            {t('street.qr')}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-steppe-300">{t('street.qrNote')}</p>
        </div>
        {url && <QrCode value={url} size={150} />}
      </section>

      {related.length > 0 && (
        <section className="no-print mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steppe-400">
            {t('street.related')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/street/${item.slug}`}
                className="rounded-lg border border-steppe-700 px-3 py-1.5 text-sm text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100"
              >
                {getStreetName(item, lang)}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-steppe-400">
        {title}
      </h2>
      <p className="leading-relaxed text-steppe-200">{children}</p>
    </section>
  );
}
