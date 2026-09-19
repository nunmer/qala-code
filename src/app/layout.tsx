import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { DEFAULT_LANG } from '@/i18n/config';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'QALA CODE — интерактивная карта истории улиц Астаны',
    template: '%s — QALA CODE',
  },
  description:
    'Образовательный проект: карта Астаны, за каждым названием улицы — человек, событие, место или культурное понятие. Собственная база урбанонимов и AI-гид по ней.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // lang выставляется по умолчанию, а после монтирования LanguageProvider
  // заменяет его на выбранный пользователем язык.
  return (
    <html lang={DEFAULT_LANG}>
      <body className="min-h-screen bg-steppe-950 text-steppe-100">
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
