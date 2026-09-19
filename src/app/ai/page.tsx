'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LlmSettingsPanel } from '@/components/LlmSettingsPanel';
import { CategoryBadge } from '@/components/CategoryBadge';
import { getStreetTitle } from '@/data/streets/translations';
import { useTranslation } from '@/i18n/LanguageProvider';
import { publishedOnly, useDataset } from '@/lib/dataset';
import { SUGGESTED_QUESTIONS, ask, type AskResult, type LlmSettings } from '@/lib/ai';
import { loadLlmSettings } from '@/lib/storage';
import type { Street } from '@/lib/types';

interface Exchange {
  readonly id: number;
  readonly question: string;
  readonly answer: string;
  readonly streets: readonly Street[];
  readonly mode: AskResult['mode'];
  readonly error?: string;
}

/** AI-гид (§11-14, §16 README). */
export default function AiPage() {
  const { t, lang } = useTranslation();
  const dataset = useDataset();
  const streets = useMemo(() => publishedOnly(dataset), [dataset]);

  const [settings, setSettings] = useState<LlmSettings | null>(null);
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<readonly Exchange[]>([]);
  const [pending, setPending] = useState(false);
  const counter = useRef(0);

  useEffect(() => {
    setSettings(loadLlmSettings());
  }, []);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    setPending(true);
    setQuestion('');

    try {
      const result = await ask(streets, trimmed, settings, lang);
      counter.current += 1;
      setHistory((previous) => [
        ...previous,
        {
          id: counter.current,
          question: trimmed,
          answer: result.answer,
          streets: result.streets,
          mode: result.mode,
        },
      ]);
    } catch (error) {
      // Вызов модели не удался - отдаём то, что нашёл retrieval, и честно
      // показываем причину, а не подставляем выдуманный ответ.
      const fallback = await ask(streets, trimmed, null, lang);
      counter.current += 1;
      setHistory((previous) => [
        ...previous,
        {
          id: counter.current,
          question: trimmed,
          answer: fallback.answer,
          streets: fallback.streets,
          mode: 'retrieval',
          error: error instanceof Error ? error.message : 'unknown error',
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-steppe-100">{t('ai.title')}</h1>
        <p className="mt-2 text-sm leading-relaxed text-steppe-400">{t('ai.intro')}</p>
      </header>

      <LlmSettingsPanel settings={settings} onChange={setSettings} />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submit(question);
        }}
        className="mt-6"
      >
        <div className="flex gap-2">
          <label htmlFor="ai-question" className="sr-only">
            {t('ai.question')}
          </label>
          <input
            id="ai-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={t('ai.placeholder')}
            disabled={pending}
            className="min-w-0 flex-1 rounded-lg border border-steppe-700 bg-steppe-900 px-3 py-3 text-base text-steppe-100 placeholder:text-steppe-600 focus:border-gold-500 focus:outline-none disabled:opacity-60 sm:px-4 sm:text-sm"
          />
          <button
            type="submit"
            disabled={pending || !question.trim()}
            className="shrink-0 rounded-lg bg-gold-500 px-4 py-3 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
          >
            {pending ? '...' : t('ai.askButton')}
          </button>
        </div>
      </form>

      <section className="mt-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-steppe-400">
          {t('ai.popular')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS[lang].map((item) => (
            <button
              key={item}
              type="button"
              disabled={pending}
              onClick={() => void submit(item)}
              className="rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100 disabled:opacity-40"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-6">
        {history.map((exchange) => (
          <article key={exchange.id} className="rounded-xl border border-steppe-800 bg-steppe-900">
            <p className="border-b border-steppe-800 px-4 py-3 text-sm font-medium text-steppe-100">
              {exchange.question}
            </p>

            <div className="px-4 py-4">
              {exchange.error && (
                <p className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                  {t('ai.modelError')} ({exchange.error}). {t('ai.modelErrorNote')}
                </p>
              )}

              <p className="whitespace-pre-line text-sm leading-relaxed text-steppe-200">
                {exchange.answer}
              </p>

              {exchange.streets.length > 0 && (
                <div className="mt-4 border-t border-steppe-800 pt-3">
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-steppe-400">
                    {t('ai.usedRecords')}
                  </h3>
                  <ul className="space-y-1.5">
                    {exchange.streets.map((street) => (
                      <li key={street.id}>
                        <Link
                          href={`/street/${street.slug}`}
                          className="group flex flex-wrap items-center gap-2 text-sm"
                        >
                          <span className="text-sky-qala underline-offset-2 group-hover:underline">
                            {getStreetTitle(street, lang)}
                          </span>
                          <CategoryBadge category={street.category} size="sm" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-3 text-[11px] text-steppe-400">
                {exchange.mode === 'llm' ? t('ai.modeLlm') : t('ai.modeRetrieval')}
              </p>
            </div>
          </article>
        ))}

        {history.length === 0 && (
          <p className="rounded-xl border border-dashed border-steppe-800 p-8 text-center text-sm text-steppe-400">
            {t('ai.emptyHistory')}
          </p>
        )}
      </section>
    </main>
  );
}
