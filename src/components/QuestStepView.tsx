'use client';

import { CheckIcon, CloseIcon } from '@/components/Icons';
import Link from 'next/link';
import { useState } from 'react';
import { CategoryBadge } from '@/components/CategoryBadge';
import { getStreetText, getStreetTitle } from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import { markQuestStepDone } from '@/lib/storage';
import type { QuestStep, Street } from '@/lib/types';

/** Одна точка QR-квеста: справка, вопрос, проверка ответа, переход дальше (§18-19). */
export function QuestStepView({
  step,
  street,
  total,
}: {
  step: QuestStep;
  street: Street;
  total: number;
}) {
  const { t, lang } = useTranslation();
  const [chosen, setChosen] = useState<number | null>(null);

  const answered = chosen !== null;
  const correct = chosen === step.answer_index;
  const isLast = step.order === total;
  const text = getStreetText(street, lang);

  function choose(index: number) {
    if (answered) return;
    setChosen(index);
    markQuestStepDone(step.order);
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:py-10">
      <div className="flex items-center justify-between text-xs text-steppe-400">
        <Link href="/quest" className="transition hover:text-steppe-100">
          {t('quest.allPoints')}
        </Link>
        <span className="tabular-nums">
          {t('quest.point')} {step.order} / {total}
        </span>
      </div>

      <header className="mt-4">
        <p className="text-sm font-semibold tracking-wider text-gold-400">QR №{step.order}</p>
        <h1 className="mt-1 text-2xl font-bold text-steppe-100">
          {getStreetTitle(street, lang)}
        </h1>
        <p className="mt-1 text-steppe-400">
          {lang === 'ru' ? street.name_kz : street.name_ru}
        </p>
        <div className="mt-3">
          <CategoryBadge category={street.category} />
        </div>
      </header>

      <section className="mt-6 rounded-xl border border-steppe-800 bg-steppe-900 p-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-steppe-400">
          {t('quest.reference')}
        </h2>
        <p className="text-sm leading-relaxed text-steppe-200">{text.who_is_it}</p>
        <ul className="mt-3 space-y-1.5">
          {text.historical_facts.slice(0, 3).map((fact) => (
            <li key={fact} className="flex gap-2 text-sm text-steppe-300">
              <span className="text-gold-500">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/street/${street.slug}`}
          className="mt-3 inline-block text-xs text-sky-qala underline-offset-2 hover:underline"
        >
          {t('quest.fullCard')}
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-steppe-100">{step.question[lang]}</h2>
        <ul className="space-y-2">
          {step.options[lang].map((option, index) => {
            const isChosen = chosen === index;
            const isAnswer = index === step.answer_index;

            const tone = !answered
              ? 'border-steppe-700 hover:border-steppe-600 hover:bg-steppe-800'
              : isAnswer
                ? 'border-emerald-500/60 bg-emerald-500/10'
                : isChosen
                  ? 'border-red-500/60 bg-red-500/10'
                  : 'border-steppe-800 opacity-60';

            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => choose(index)}
                  disabled={answered}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm text-steppe-200 transition ${tone} ${
                    answered ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  {option}
                  {answered && isAnswer && (
                    <CheckIcon className="ml-2 inline text-emerald-400" />
                  )}
                  {answered && isChosen && !isAnswer && (
                    <CloseIcon className="ml-2 inline text-red-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {answered && (
        <section className="mt-5 rounded-xl border border-steppe-800 bg-steppe-900 p-5">
          <p
            className={`text-sm font-semibold ${correct ? 'text-emerald-400' : 'text-amber-400'}`}
          >
            {correct ? t('quest.correct') : t('quest.incorrect')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-steppe-300">
            {step.explanation[lang]}
          </p>

          <div className="mt-4">
            {isLast ? (
              <Link
                href="/quest"
                className="inline-block rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400"
              >
                {t('quest.finish')}
              </Link>
            ) : (
              <Link
                href={`/quest/${step.order + 1}`}
                className="inline-block rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400"
              >
                {t('quest.next')}: QR №{step.order + 1} →
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
