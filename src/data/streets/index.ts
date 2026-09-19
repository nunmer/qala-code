import type { Street } from '@/lib/types';
import { PERSONALITY_STREETS } from './personalities';
import { GEOGRAPHY_STREETS } from './geography';
import { HISTORY_STREETS } from './history';
import { LITERATURE_STREETS, NATURE_STREETS } from './culture';

/**
 * База урбанонимов QALA CODE - результат исследовательской работы (Phase 1).
 *
 * Это исследованная выборка, а не полный реестр улиц Астаны.
 * Интерфейс обязан показывать размер выборки рядом с любой статистикой (§10 README).
 */
export const STREETS: readonly Street[] = [
  ...PERSONALITY_STREETS,
  ...GEOGRAPHY_STREETS,
  ...HISTORY_STREETS,
  ...LITERATURE_STREETS,
  ...NATURE_STREETS,
];

/** Географический центр Астаны - стартовая точка карты. */
export const ASTANA_CENTER: readonly [number, number] = [51.14, 71.43];
export const DEFAULT_ZOOM = 12;
