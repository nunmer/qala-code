'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { CATEGORIES } from '@/data/categories';
import { useTranslation } from '@/i18n/LanguageProvider';
import { useDataset } from '@/lib/dataset';
import { buildStatistics } from '@/lib/stats';

/** Главная страница (§20 README). */
export default function HomePage() {
  const { t } = useTranslation();
  const dataset = useDataset();
  const stats = useMemo(() => buildStatistics(dataset), [dataset]);

  return (
    <main className="flex-1">
      <section className="border-b border-steppe-800 bg-gradient-to-b from-steppe-900 to-steppe-950">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="text-gold-400">QALA</span> CODE
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-steppe-300 sm:text-xl">
            {t('home.tagline')}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-steppe-400">
            {t('home.intro')}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/map"
              className="rounded-xl bg-gold-500 px-6 py-3 font-semibold text-steppe-950 transition hover:bg-gold-400"
            >
              {t('home.openMap')}
            </Link>
            <Link
              href="/ai"
              className="rounded-xl border border-steppe-700 px-6 py-3 font-semibold text-steppe-100 transition hover:border-steppe-600 hover:bg-steppe-800"
            >
              {t('nav.ai')}
            </Link>
            <Link
              href="/meanings"
              className="rounded-xl border border-steppe-700 px-6 py-3 font-semibold text-steppe-100 transition hover:border-steppe-600 hover:bg-steppe-800"
            >
              {t('nav.meanings')}
            </Link>
            <Link
              href="/quest"
              className="rounded-xl border border-steppe-700 px-6 py-3 font-semibold text-steppe-100 transition hover:border-steppe-600 hover:bg-steppe-800"
            >
              {t('nav.quest')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat value={stats.total} label={t('home.stat.streets')} />
          <Stat value={CATEGORIES.length} label={t('home.stat.categories')} />
          <Stat value={stats.personalities} label={t('home.stat.personalities')} />
          <Stat value={stats.sourcesCount} label={t('home.stat.sources')} />
        </dl>
        <p className="mt-4 text-center text-xs text-steppe-400">{t('home.sampleNote')}</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="mb-6 text-center text-lg font-semibold text-steppe-100">
          {t('home.how')}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Feature
            title={t('home.how.research.title')}
            body={t('home.how.research.body')}
          />
          <Feature title={t('home.how.visual.title')} body={t('home.how.visual.body')} />
          <Feature title={t('home.how.ai.title')} body={t('home.how.ai.body')} />
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-steppe-800 bg-steppe-900 p-5 text-center">
      <dt className="text-3xl font-bold tabular-nums text-gold-400">{value}</dt>
      <dd className="mt-1 text-xs text-steppe-400">{label}</dd>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-steppe-800 bg-steppe-900 p-5">
      <h3 className="mb-2 font-semibold text-steppe-100">{title}</h3>
      <p className="text-sm leading-relaxed text-steppe-400">{body}</p>
    </div>
  );
}
