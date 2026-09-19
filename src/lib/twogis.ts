/**
 * Работа со ссылками 2ГИС.
 *
 * Ссылка 2ГИС - единственный источник расположения улицы в проекте.
 * Отдельных полей latitude/longitude в базе больше нет: координаты
 * вычисляются из ссылки, поэтому расположение всегда можно проверить,
 * открыв ту же ссылку в 2ГИС.
 */

export interface Coordinates {
  readonly lat: number;
  readonly lon: number;
}

/** Границы Астаны - для предупреждения о явно неподходящей точке. */
export const ASTANA_BOUNDS = {
  minLat: 50.95,
  maxLat: 51.35,
  minLon: 71.15,
  maxLon: 71.75,
} as const;

/**
 * 2ГИС записывает точку как `долгота,широта` - именно в этом порядке.
 * Встречается в трёх местах ссылки:
 *   /astana/geo/<id>/71.430255,51.128207
 *   /astana/firm/<id>?m=71.430255%2C51.128207%2F16
 *   /astana?m=71.43%2C51.128%2F16
 */
const COORD_PAIR = /(-?\d{1,3}\.\d+)\s*(?:,|%2C)\s*(-?\d{1,3}\.\d+)/i;

export function isTwoGisUrl(raw: string): boolean {
  try {
    const { hostname } = new URL(raw.trim());
    return /(^|\.)2gis\.[a-z.]+$/i.test(hostname);
  } catch {
    return false;
  }
}

/**
 * Достаёт координаты из ссылки 2ГИС.
 * Возвращает null, если ссылка не распознана - вызывающий код обязан
 * это обработать, а не подставлять точку по умолчанию.
 */
export function parseTwoGisLocation(raw: string): Coordinates | null {
  if (!raw) return null;

  const decoded = safeDecode(raw.trim());
  const match = COORD_PAIR.exec(decoded);
  if (!match) return null;

  const lon = Number(match[1]);
  const lat = Number(match[2]);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;

  return { lat, lon };
}

/** Точка попадает в границы Астаны. */
export function isWithinAstana({ lat, lon }: Coordinates): boolean {
  return (
    lat >= ASTANA_BOUNDS.minLat &&
    lat <= ASTANA_BOUNDS.maxLat &&
    lon >= ASTANA_BOUNDS.minLon &&
    lon <= ASTANA_BOUNDS.maxLon
  );
}

/** Собирает ссылку 2ГИС, открывающую карту в указанной точке. */
export function buildTwoGisUrl({ lat, lon }: Coordinates, zoom = 16): string {
  return `https://2gis.kz/astana?m=${lon}%2C${lat}%2F${zoom}`;
}

/**
 * Название улицы, если оно есть в самой ссылке
 * (например, .../search/проспект%20Абая).
 */
export function parseTwoGisName(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const parts = url.pathname.split('/').filter(Boolean);
    const searchIndex = parts.indexOf('search');
    if (searchIndex >= 0 && parts[searchIndex + 1]) {
      const name = safeDecode(parts[searchIndex + 1]).replace(/\+/g, ' ').trim();
      return name.length > 1 && !/^\d/.test(name) ? name : null;
    }
    return null;
  } catch {
    return null;
  }
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
