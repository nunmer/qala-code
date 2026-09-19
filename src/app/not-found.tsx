'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n/LanguageProvider';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 py-20 text-center sm:py-24">
      <h1 className="text-3xl font-bold text-steppe-100">{t('common.notFound')}</h1>
      <p className="mt-3 text-sm text-steppe-400">{t('common.notFoundNote')}</p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/map"
          className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400"
        >
          {t('home.openMap')}
        </Link>
        <Link
          href="/streets"
          className="rounded-lg border border-steppe-700 px-5 py-2.5 text-sm text-steppe-200 transition hover:border-steppe-600"
        >
          {t('nav.catalog')}
        </Link>
      </div>
    </main>
  );
}
