'use client';

import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/i18n/LanguageProvider';
import type { MessageKey } from '@/i18n/messages';

const NAV: readonly { href: string; key: MessageKey }[] = [
  { href: '/map', key: 'nav.map' },
  { href: '/ai', key: 'nav.ai' },
  { href: '/meanings', key: 'nav.meanings' },
  { href: '/quest', key: 'nav.quest' },
  { href: '/streets', key: 'nav.catalog' },
];

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className="no-print sticky top-0 z-[1100] border-b border-steppe-800 bg-steppe-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="text-lg font-bold tracking-[0.18em] text-gold-400 transition group-hover:text-gold-500">
            QALA
          </span>
          <span className="text-lg font-bold tracking-[0.18em] text-steppe-100">CODE</span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-steppe-300 transition hover:bg-steppe-800 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher />

        <Link
          href="/admin"
          className="hidden shrink-0 rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-400 transition hover:border-steppe-600 hover:text-steppe-100 sm:block"
        >
          {t('nav.admin')}
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="no-print border-t border-steppe-800 px-4 py-8 text-center text-xs text-steppe-400">
      <p>{t('footer.note')}</p>
      <p className="mt-1">{t('footer.sources')}</p>
    </footer>
  );
}
