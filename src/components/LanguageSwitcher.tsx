'use client';

import { LANGUAGES, LANGUAGE_LABELS, LANGUAGE_NAMES } from '@/i18n/config';
import { useTranslation } from '@/i18n/LanguageProvider';

/** Переключатель языка интерфейса. Выбор запоминается в браузере. */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className="flex shrink-0 overflow-hidden rounded-lg border border-steppe-700"
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          title={LANGUAGE_NAMES[code]}
          className={`px-2.5 py-1 text-xs font-medium transition ${
            lang === code
              ? 'bg-gold-500 text-steppe-950'
              : 'text-steppe-400 hover:bg-steppe-800 hover:text-steppe-100'
          }`}
        >
          {LANGUAGE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
