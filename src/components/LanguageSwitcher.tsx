'use client';

import { LANGUAGES, LANGUAGE_LABELS, LANGUAGE_NAMES, LANGUAGE_CODES } from '@/i18n/config';
import { useTranslation } from '@/i18n/LanguageProvider';

/**
 * Переключатель языка интерфейса. Выбор запоминается в браузере.
 *
 * На узком экране показывает двухбуквенные коды: полные подписи
 * вместе с логотипом и кнопкой меню не помещаются в строку заголовка.
 */
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
          aria-label={LANGUAGE_NAMES[code]}
          title={LANGUAGE_NAMES[code]}
          className={`px-2 py-1 text-[11px] font-medium transition sm:px-2.5 sm:text-xs ${
            lang === code
              ? 'bg-gold-500 text-steppe-950'
              : 'text-steppe-400 hover:bg-steppe-800 hover:text-steppe-100'
          }`}
        >
          <span className="sm:hidden">{LANGUAGE_CODES[code]}</span>
          <span className="hidden sm:inline">{LANGUAGE_LABELS[code]}</span>
        </button>
      ))}
    </div>
  );
}
