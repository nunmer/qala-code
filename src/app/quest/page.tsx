'use client';

import { CheckIcon } from '@/components/Icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { QrCode } from '@/components/QrCode';
import { QUEST_STEPS } from '@/data/quest';
import { STREETS } from '@/data/streets';
import { getStreetName, getStreetTitle } from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import { findBySlug } from '@/lib/search';
import { questUrl } from '@/lib/site';
import { loadQuestProgress, resetQuestProgress } from '@/lib/storage';

/** QR-квест «Прогулка по истории Астаны» (§18-19 README). */
export default function QuestPage() {
  const { t, lang } = useTranslation();
  const [completed, setCompleted] = useState<readonly number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    setCompleted(loadQuestProgress().completed);
    setMounted(true);
  }, []);

  const done = completed.length;
  const finished = done === QUEST_STEPS.length;

  function reset() {
    resetQuestProgress();
    setCompleted([]);
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-steppe-100">{t('quest.title')}</h1>
      <p className="mt-2 text-sm leading-relaxed text-steppe-400">{t('quest.intro')}</p>

      {mounted && (
        <section className="no-print mt-6 rounded-xl border border-steppe-800 bg-steppe-900 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-steppe-200">
              {t('quest.progress')}:{' '}
              <span className="tabular-nums text-gold-400">{done}</span> / {QUEST_STEPS.length}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowSheet((value) => !value)}
                className="rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100"
              >
                {showSheet ? t('quest.hideSheet') : t('quest.printSheet')}
              </button>
              {done > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-400 transition hover:border-steppe-600 hover:text-steppe-100"
                >
                  {t('quest.restart')}
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-steppe-800">
            <div
              className="h-full rounded-full bg-gold-500 transition-all"
              style={{ width: `${(done / QUEST_STEPS.length) * 100}%` }}
            />
          </div>

          {finished && (
            <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
              <p className="text-lg font-semibold text-emerald-300">{t('quest.finished')}</p>
              <p className="mt-1 text-sm text-emerald-200/90">{t('quest.finishedNote')}</p>
              <p className="mt-2 text-xs tracking-[0.2em] text-emerald-300/70">QALA CODE</p>
            </div>
          )}
        </section>
      )}

      <ol className="mt-8 space-y-3">
        {QUEST_STEPS.map((step) => {
          const street = findBySlug(STREETS, step.street_slug);
          const isDone = completed.includes(step.order);

          return (
            <li key={step.order}>
              <Link
                href={`/quest/${step.order}`}
                className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                  isDone
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-steppe-800 bg-steppe-900 hover:border-steppe-700'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    isDone ? 'bg-emerald-500 text-steppe-950' : 'bg-steppe-800 text-steppe-300'
                  }`}
                >
                  {isDone ? <CheckIcon /> : step.order}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-steppe-100">
                    QR №{step.order} -{' '}
                    {street ? getStreetTitle(street, lang) : step.street_slug}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-steppe-400">
                    {step.question[lang]}
                  </span>
                </span>
                <span className="shrink-0 text-steppe-500">→</span>
              </Link>
            </li>
          );
        })}
      </ol>

      {showSheet && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-steppe-400">
            {t('quest.printSheet')}
          </h2>
          <p className="no-print mb-4 text-xs text-steppe-400">{t('quest.printNote')}</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {QUEST_STEPS.map((step) => {
              const street = findBySlug(STREETS, step.street_slug);
              return (
                <div
                  key={step.order}
                  className="flex flex-col items-center gap-2 rounded-xl border border-steppe-800 p-4"
                >
                  <span className="text-xs font-semibold text-steppe-300">QR №{step.order}</span>
                  <QrCode
                    value={questUrl(step.order)}
                    size={120}
                    caption={street ? getStreetName(street, lang) : step.street_slug}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
