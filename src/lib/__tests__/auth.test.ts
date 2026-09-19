import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STREETS } from '@/data/streets';
import { checkCredentials, endSession, hasSession, startSession } from '../auth';
import { streetLocation, withLocation } from '../location';

/** Минимальная замена sessionStorage для проверки логики сессии. */
function stubSessionStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal('window', {
    sessionStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    },
  });
  return store;
}

/** Хранилище, которое всегда бросает исключение — приватный режим браузера. */
function stubBrokenStorage() {
  vi.stubGlobal('window', {
    sessionStorage: {
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {
        throw new Error('denied');
      },
      removeItem: () => {
        throw new Error('denied');
      },
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('checkCredentials — демонстрационный вход', () => {
  it('принимает пару admin/admin', () => {
    expect(checkCredentials('admin', 'admin')).toBe(true);
  });

  it('игнорирует лишние пробелы в логине', () => {
    expect(checkCredentials('  admin  ', 'admin')).toBe(true);
  });

  it('отклоняет неверные данные', () => {
    expect(checkCredentials('admin', 'wrong')).toBe(false);
    expect(checkCredentials('root', 'admin')).toBe(false);
    expect(checkCredentials('', '')).toBe(false);
  });

  it('не подрезает пробелы в пароле — пароль сравнивается как есть', () => {
    expect(checkCredentials('admin', ' admin ')).toBe(false);
  });
});

describe('сессия редактора', () => {
  beforeEach(() => {
    stubSessionStorage();
  });

  it('начинается закрытой', () => {
    expect(hasSession()).toBe(false);
  });

  it('открывается и закрывается', () => {
    startSession();
    expect(hasSession()).toBe(true);

    endSession();
    expect(hasSession()).toBe(false);
  });

  it('недоступное хранилище не роняет страницу', () => {
    stubBrokenStorage();

    expect(() => startSession()).not.toThrow();
    expect(() => endSession()).not.toThrow();
    expect(hasSession()).toBe(false);
  });

  it('вне браузера сессии нет', () => {
    vi.stubGlobal('window', undefined);
    expect(hasSession()).toBe(false);
  });
});

describe('location — координаты из ссылки 2ГИС', () => {
  it('возвращает точку для каждой записи базы', () => {
    for (const street of STREETS) {
      expect(streetLocation(street), street.slug).not.toBeNull();
    }
  });

  it('withLocation пропускает записи без разбираемой ссылки', () => {
    const broken = { ...STREETS[0], id: 'broken', twogis_url: 'https://2gis.kz/astana' };
    const located = withLocation([STREETS[0], broken]);

    expect(located).toHaveLength(1);
    expect(located[0].street.id).toBe(STREETS[0].id);
    expect(located[0].location.lat).toBeGreaterThan(50);
  });

  it('пустой вход даёт пустой выход', () => {
    expect(withLocation([])).toEqual([]);
  });
});
