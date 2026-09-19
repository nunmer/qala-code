import type { Street } from './types';
import { parseTwoGisLocation, type Coordinates } from './twogis';

/**
 * Координаты улицы — производная от ссылки 2ГИС.
 *
 * Записи без разбираемой ссылки просто не попадают на карту:
 * лучше отсутствие маркера, чем маркер в неверном месте.
 */
export function streetLocation(street: Street): Coordinates | null {
  return parseTwoGisLocation(street.twogis_url);
}

export interface LocatedStreet {
  readonly street: Street;
  readonly location: Coordinates;
}

export function withLocation(streets: readonly Street[]): readonly LocatedStreet[] {
  return streets.flatMap((street) => {
    const location = streetLocation(street);
    return location ? [{ street, location }] : [];
  });
}
