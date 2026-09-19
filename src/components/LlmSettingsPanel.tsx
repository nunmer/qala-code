'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/LanguageProvider';
import { DEFAULT_LLM_SETTINGS, type LlmSettings } from '@/lib/ai';
import { clearLlmSettings, saveLlmSettings } from '@/lib/storage';

/**
 * Подключение LLM к AI-гиду.
 *
 * Приложение статическое: серверного прокси нет, поэтому ключ хранится
 * только в localStorage браузера и уходит напрямую в API провайдера.
 * Для локальной работы и защиты проекта этого достаточно; для публичного
 * развёртывания вызов нужно вынести на сервер — предупреждение показано явно.
 */
export function LlmSettingsPanel({
  settings,
  onChange,
}: {
  settings: LlmSettings | null;
  onChange: (settings: LlmSettings | null) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(settings?.model ?? DEFAULT_LLM_SETTINGS.model);
  const [baseUrl, setBaseUrl] = useState(settings?.baseUrl ?? DEFAULT_LLM_SETTINGS.baseUrl);

  function save() {
    const trimmed = apiKey.trim();
    if (!trimmed) return;

    const next: LlmSettings = { apiKey: trimmed, model: model.trim(), baseUrl: baseUrl.trim() };
    saveLlmSettings(next);
    onChange(next);
    setApiKey('');
    setOpen(false);
  }

  function disconnect() {
    clearLlmSettings();
    onChange(null);
    setOpen(false);
  }

  return (
    <div className="rounded-xl border border-steppe-800 bg-steppe-900">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm">
          <span
            className={`h-2 w-2 rounded-full ${settings ? 'bg-emerald-400' : 'bg-steppe-600'}`}
          />
          <span className="text-steppe-200">
            {settings ? `${t('ai.connected')}: ${settings.model}` : t('ai.notConnected')}
          </span>
        </span>
        <span className="text-xs text-steppe-400">
          {open ? t('ai.collapse') : t('ai.configure')}
        </span>
      </button>

      {!settings && !open && (
        <p className="border-t border-steppe-800 px-4 py-3 text-xs leading-relaxed text-steppe-400">
          {t('ai.worksWithoutKey')}
        </p>
      )}

      {open && (
        <div className="space-y-3 border-t border-steppe-800 p-4">
          <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
            {t('ai.keyWarning')}
          </p>

          <Field label={t('ai.apiKey')}>
            <input
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder={settings ? '••••••••' : 'sk-…'}
              autoComplete="off"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={t('ai.model')}>
              <input
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={t('ai.baseUrl')}>
              <input
                value={baseUrl}
                onChange={(event) => setBaseUrl(event.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={save}
              disabled={!apiKey.trim()}
              className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t('ai.save')}
            </button>
            {settings && (
              <button
                type="button"
                onClick={disconnect}
                className="rounded-lg border border-steppe-700 px-4 py-2 text-sm text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100"
              >
                {t('ai.disconnect')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-steppe-700 bg-steppe-950 px-3 py-2 text-sm text-steppe-100 placeholder:text-steppe-600 focus:border-gold-500 focus:outline-none';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-steppe-400">{label}</span>
      {children}
    </label>
  );
}
