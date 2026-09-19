/**
 * Базовый URL для QR-кодов (§17 README).
 *
 * В сборке используется NEXT_PUBLIC_SITE_URL, если он задан.
 * Иначе берётся origin текущей вкладки - тогда QR-коды работают
 * и при локальной разработке, и на превью-развёртывании.
 */
const CONFIGURED = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

export function siteOrigin(): string {
  if (CONFIGURED) return CONFIGURED;
  if (typeof window !== 'undefined') return window.location.origin;
  return 'https://qalacode.kz';
}

export function streetUrl(slug: string): string {
  return `${siteOrigin()}/street/${slug}/`;
}

export function questUrl(order: number): string {
  return `${siteOrigin()}/quest/${order}/`;
}
