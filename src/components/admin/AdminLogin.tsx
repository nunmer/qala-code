'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/LanguageProvider';
import { checkCredentials, startSession } from '@/lib/auth';

/**
 * Форма входа в редактор.
 *
 * Предупреждение о характере этой защиты показано прямо на форме:
 * приложение статическое, проверка идёт в браузере, и данные всё равно
 * входят в состав сайта. Это ограничение интерфейса, а не безопасность.
 */
export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();

    if (!checkCredentials(username, password)) {
      setError(true);
      setPassword('');
      return;
    }

    startSession();
    onSuccess();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-2xl font-bold text-steppe-100">{t('admin.login')}</h1>

      <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
        {t('admin.demoAuthWarning')}
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs text-steppe-400">{t('admin.username')}</span>
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setError(false);
            }}
            autoComplete="username"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-steppe-400">{t('admin.password')}</span>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            autoComplete="current-password"
            className={inputClass}
          />
        </label>

        {error && (
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-2.5 text-xs text-red-200">
            {t('admin.badCredentials')}
          </p>
        )}

        <button
          type="submit"
          disabled={!username.trim() || !password}
          className="w-full rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('admin.signIn')}
        </button>
      </form>
    </main>
  );
}

const inputClass =
  'w-full rounded-lg border border-steppe-700 bg-steppe-950 px-3 py-2 text-sm text-steppe-100 focus:border-gold-500 focus:outline-none';
