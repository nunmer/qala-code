'use client';

import { useEffect, useState } from 'react';
import { STREETS } from '@/data/streets';
import type { Street } from './types';
import { loadOverrides } from './storage';

/**
 * Эффективный датасет = исследованная база + локальные правки админки.
 *
 * Первый рендер всегда отдаёт базовую версию, чтобы разметка совпала
 * со статически сгенерированной; правки из localStorage применяются
 * уже после монтирования.
 */
export function useDataset(): readonly Street[] {
  const [streets, setStreets] = useState<readonly Street[]>(STREETS);

  useEffect(() => {
    const overrides = loadOverrides();
    if (overrides && overrides.length > 0) setStreets(overrides);
  }, []);

  return streets;
}

/** Только опубликованные записи - то, что видят пользователь и AI-гид (§26). */
export function publishedOnly(streets: readonly Street[]): readonly Street[] {
  return streets.filter((street) => street.status === 'published');
}
