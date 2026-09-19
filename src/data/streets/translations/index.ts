import type { Lang } from '@/i18n/config';
import type { Street, StreetText } from '@/lib/types';
import { normalizeForSearch } from '@/lib/normalize';
import { STREET_TEXT_KK } from './kk';
import { STREET_TEXT_EN } from './en';

/**
 * Наложения переводов карточек улиц.
 *
 * Русский лежит в самой записи (`street.text`) - это язык-источник.
 * Остальные языки хранятся отдельно, чтобы файлы датасета оставались
 * читаемыми и чтобы было видно, что именно уже переведено.
 */
const OVERLAYS: Readonly<Record<Lang, Readonly<Record<string, StreetText>>>> = {
  ru: {},
  kk: STREET_TEXT_KK,
  en: STREET_TEXT_EN,
};

/** Текст карточки на выбранном языке; при отсутствии перевода - русский оригинал. */
export function getStreetText(street: Street, lang: Lang): StreetText {
  if (lang === 'ru') return street.text;
  return OVERLAYS[lang][street.slug] ?? street.text;
}

/** Есть ли перевод карточки на этот язык - интерфейс честно помечает подстановку. */
export function hasTranslation(street: Street, lang: Lang): boolean {
  if (lang === 'ru') return true;
  return Boolean(OVERLAYS[lang][street.slug]);
}

/** Название улицы на выбранном языке. */
export function getStreetName(street: Street, lang: Lang): string {
  if (lang === 'kk') return street.name_kz;
  if (lang === 'en') return street.name_en ?? street.name_ru;
  return street.name_ru;
}

/** Второстепенное название - показывается под основным. */
export function getSecondaryName(street: Street, lang: Lang): string {
  if (lang === 'kk') return street.name_ru;
  if (lang === 'en') return street.name_kz;
  return street.name_kz;
}

/**
 * Полный заголовок: «проспект Абая», «Абай даңғылы», «Abay Avenue».
 *
 * Часть названий уже содержит родовое слово («Коргалжынское шоссе»,
 * «Қорғалжын тас жолы») - тогда второй раз его подставлять не нужно.
 */
export function getStreetTitle(street: Street, lang: Lang): string {
  const name = getStreetName(street, lang);
  const kind = getStreetText(street, lang).kind;

  if (!kind) return name;
  if (normalizeForSearch(name).includes(normalizeForSearch(kind))) return name;

  // В казахском и английском родовое слово идёт после имени.
  return lang === 'ru' ? `${kind} ${name}` : `${name} ${kind}`;
}
