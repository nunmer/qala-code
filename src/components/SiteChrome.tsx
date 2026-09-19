'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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

/** Страницы, которые занимают весь экран и потому идут без подвала. */
const FULL_SCREEN_ROUTES = ['/map'];

export function SiteHeader() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Переход по ссылке закрывает меню: на мобильном оно перекрывает контент.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="no-print sticky top-0 z-[1100] shrink-0 border-b border-steppe-800 bg-steppe-950/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:px-4">
        <Link href="/" className="group flex shrink-0 items-baseline gap-1.5">
          <span className="text-base font-bold tracking-[0.16em] text-gold-400 transition group-hover:text-gold-500 sm:text-lg sm:tracking-[0.18em]">
            QALA
          </span>
          <span className="text-base font-bold tracking-[0.16em] text-steppe-100 sm:text-lg sm:tracking-[0.18em]">
            CODE
          </span>
        </Link>

        {/* Горизонтальное меню появляется только там, где для него есть место. */}
        <nav className="hidden flex-1 items-center gap-1 text-sm lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 transition hover:bg-steppe-800 hover:text-white ${
                pathname.startsWith(item.href) ? 'text-white' : 'text-steppe-300'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <LanguageSwitcher />

          <Link
            href="/admin"
            className="hidden shrink-0 rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-400 transition hover:border-steppe-600 hover:text-steppe-100 lg:block"
          >
            {t('nav.admin')}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={t('nav.menu')}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-steppe-700 text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100 lg:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-t border-steppe-800 bg-steppe-950 shadow-xl lg:hidden">
          <ul className="mx-auto max-w-7xl px-3 py-2 sm:px-4">
            {[...NAV, { href: '/admin', key: 'nav.admin' as MessageKey }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition hover:bg-steppe-800 ${
                    pathname.startsWith(item.href) ? 'text-white' : 'text-steppe-300'
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
      {open ? (
        <path
          d="M4 4l10 10M14 4L4 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M2.5 5h13M2.5 9h13M2.5 13h13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Карта занимает весь экран: подвал под ней только добавлял бы прокрутку.
  if (FULL_SCREEN_ROUTES.some((route) => pathname.startsWith(route))) return null;

  return (
    <footer className="no-print border-t border-steppe-800 px-4 py-8 text-center text-xs leading-relaxed text-steppe-400">
      <p className="mx-auto max-w-2xl">{t('footer.note')}</p>
      <p className="mx-auto mt-1 max-w-2xl">{t('footer.sources')}</p>
    </footer>
  );
}
