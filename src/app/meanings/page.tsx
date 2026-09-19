'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from '@/i18n/LanguageProvider';
import { useDataset } from '@/lib/dataset';
import { barFor, buildStatistics, formatShare } from '@/lib/stats';

/** Карта смыслов Астаны (§10 README). */
export default function MeaningsPage() {
  const { t, lang } = useTranslation();
  const dataset = useDataset();
  const stats = useMemo(() => buildStatistics(dataset), [dataset]);
  const max = Math.max(...stats.categories.map((entry) => entry.count), 1);

  const summary = [
    `${t('meanings.researched')}: ${stats.total}`,
    '',
    ...stats.categories.map(({ category, count, share }) => {
      const label = category.label[lang].padEnd(26, ' ');
      const bar = barFor(count / max);
      return `${label}${bar} ${String(count).padStart(3, ' ')}  ${formatShare(share).padStart(6, ' ')}`;
    }),
    '',
    `${t('meanings.publishedRecords')}: ${stats.published}`,
    `${t('meanings.uniqueSources')}: ${stats.sourcesCount}`,
  ].join('\n');

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-steppe-100">{t('meanings.title')}</h1>
      <p className="mt-2 text-sm leading-relaxed text-steppe-400">{t('meanings.intro')}</p>

      <p className="mt-5 rounded-lg border border-gold-500/30 bg-gold-500/10 p-3 text-sm text-gold-400">
        {t('meanings.sampleWarning')} ({t('meanings.researched')}: {stats.total})
      </p>

      <section className="mt-8 space-y-4">
        {stats.categories.map(({ category, count, share }) => (
          <div key={category.id}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-steppe-100">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.label[lang]}
              </span>
              <span className="text-sm tabular-nums text-steppe-400">
                {count} · {formatShare(share)}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-steppe-800">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(count / max) * 100}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-steppe-400">
              {category.description[lang]}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steppe-400">
          {t('meanings.textSummary')}
        </h2>
        <pre className="thin-scroll overflow-x-auto rounded-xl border border-steppe-800 bg-steppe-900 p-4 text-xs leading-relaxed text-steppe-300">
          {summary}
        </pre>
      </section>

      <section className="mt-10 rounded-xl border border-steppe-800 bg-steppe-900 p-5">
        <h2 className="text-sm font-semibold text-steppe-100">{t('meanings.explainTitle')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-steppe-400">
          {t('meanings.explainBody')}
        </p>
        <Link
          href="/map"
          className="mt-4 inline-block text-sm text-sky-qala underline-offset-2 hover:underline"
        >
          {t('meanings.onMap')}
        </Link>
      </section>
    </main>
  );
}
