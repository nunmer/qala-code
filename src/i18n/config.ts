/** Языки интерфейса. Русский - язык по умолчанию и язык-источник данных. */
export const LANGUAGES = ['ru', 'kk', 'en'] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = 'ru';

export const LANGUAGE_LABELS: Readonly<Record<Lang, string>> = {
  ru: 'Рус',
  kk: 'Қаз',
  en: 'Eng',
};

/** Двухбуквенные коды для узких экранов. */
export const LANGUAGE_CODES: Readonly<Record<Lang, string>> = {
  ru: 'RU',
  kk: 'KZ',
  en: 'EN',
};

export const LANGUAGE_NAMES: Readonly<Record<Lang, string>> = {
  ru: 'Русский',
  kk: 'Қазақша',
  en: 'English',
};

/** Локаль для сортировки и форматирования чисел. */
export const LOCALES: Readonly<Record<Lang, string>> = {
  ru: 'ru-RU',
  kk: 'kk-KZ',
  en: 'en-US',
};

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);
}
