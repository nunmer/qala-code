'use client';

import type { LlmSettings } from './ai';
import type { Street } from './types';

/**
 * Локальное хранилище браузера.
 *
 * Бэкенда у приложения нет, поэтому всё пользовательское состояние —
 * настройки AI, прогресс квеста и рабочая копия датасета в админке —
 * живёт в localStorage и никуда не отправляется.
 */

const KEYS = {
  llm: 'qala-code:llm-settings',
  quest: 'qala-code:quest-progress',
  overrides: 'qala-code:dataset-overrides',
} as const;

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    // Повреждённое или недоступное хранилище не должно ломать страницу.
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Приватный режим или переполненное хранилище — молча деградируем.
  }
}

function remove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* см. выше */
  }
}

/* --- Настройки LLM ------------------------------------------------------ */

export function loadLlmSettings(): LlmSettings | null {
  const stored = readJson<Partial<LlmSettings>>(KEYS.llm);
  if (!stored?.apiKey || !stored.model || !stored.baseUrl) return null;
  return { apiKey: stored.apiKey, model: stored.model, baseUrl: stored.baseUrl };
}

export function saveLlmSettings(settings: LlmSettings): void {
  writeJson(KEYS.llm, settings);
}

export function clearLlmSettings(): void {
  remove(KEYS.llm);
}

/* --- Прогресс QR-квеста (§19) ------------------------------------------- */

export interface QuestProgress {
  /** Номера пройденных точек. */
  readonly completed: readonly number[];
}

export function loadQuestProgress(): QuestProgress {
  return readJson<QuestProgress>(KEYS.quest) ?? { completed: [] };
}

export function markQuestStepDone(order: number): QuestProgress {
  const current = loadQuestProgress();
  if (current.completed.includes(order)) return current;

  const next: QuestProgress = {
    completed: [...current.completed, order].sort((a, b) => a - b),
  };
  writeJson(KEYS.quest, next);
  return next;
}

export function resetQuestProgress(): void {
  remove(KEYS.quest);
}

/* --- Рабочая копия датасета для админки (§25) --------------------------- */

export function loadOverrides(): readonly Street[] | null {
  return readJson<Street[]>(KEYS.overrides);
}

export function saveOverrides(streets: readonly Street[]): void {
  writeJson(KEYS.overrides, streets);
}

export function clearOverrides(): void {
  remove(KEYS.overrides);
}
