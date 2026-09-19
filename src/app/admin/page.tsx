'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { StreetEditor } from '@/components/admin/StreetEditor';
import { STREETS } from '@/data/streets';
import { useTranslation } from '@/i18n/LanguageProvider';
import { endSession, hasSession } from '@/lib/auth';
import { QUALITY_ISSUE_LABELS, dataQualityIssues } from '@/lib/stats';
import { clearOverrides, loadOverrides, saveOverrides } from '@/lib/storage';
import type { RecordStatus, Street } from '@/lib/types';

/**
 * Редактор данных (§25-26 README).
 *
 * У статического приложения нет сервера, поэтому правки хранятся как рабочая
 * копия в localStorage и выгружаются файлом. Исследователь редактирует записи
 * здесь, экспортирует JSON и коммитит его в датасет - так изменения попадают
 * в собранную версию сайта.
 */
export default function AdminPage() {
  const { t, lang } = useTranslation();

  const [authorised, setAuthorised] = useState(false);
  const [checked, setChecked] = useState(false);

  const [streets, setStreets] = useState<readonly Street[]>(STREETS);
  const [dirty, setDirty] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setAuthorised(hasSession());
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!authorised) return;
    const overrides = loadOverrides();
    if (overrides && overrides.length > 0) {
      setStreets(overrides);
      setDirty(true);
    }
  }, [authorised]);

  const active = useMemo(
    () => streets.find((street) => street.id === activeId) ?? null,
    [streets, activeId],
  );

  /**
   * Переход к форме редактирования.
   *
   * На узком экране форма заменяет собой список и начинается ниже шапки
   * страницы: без прокрутки выбор записи выглядит так, будто ничего не
   * произошло. Выравниваем по верху экрана, иначе виден один заголовок.
   * На широком экране обе колонки рядом, и дёргать страницу незачем.
   *
   * Прокрутка живёт в эффекте, а не в обработчике клика: до перерисовки
   * элемент формы ещё скрыт, и scrollIntoView по нему ничего не делает.
   * Плавный режим не используется - браузер молча пропускает его
   * в неактивной вкладке.
   */
  useEffect(() => {
    if (!activeId || !editorRef.current) return;
    const narrow = window.matchMedia('(max-width: 1023px)').matches;
    editorRef.current.scrollIntoView({ block: narrow ? 'start' : 'nearest' });
  }, [activeId]);

  /**
   * На узком экране список и форма идут одной колонкой, и форма оказывается
   * ниже всех записей. Без перехода к ней выбор записи выглядит так,
   * будто ничего не произошло.
   */
  function select(id: string) {
    setActiveId(id);
  }

  /** Единая точка записи: иммутабельно обновляем список и сохраняем копию. */
  function commit(next: readonly Street[]) {
    setStreets(next);
    saveOverrides(next);
    setDirty(true);
  }

  function updateStreet(next: Street) {
    const clash = streets.some(
      (street) => street.id !== next.id && street.slug === next.slug && next.slug,
    );
    setNotice(clash ? t('admin.slugTaken') : null);

    commit(streets.map((street) => (street.id === next.id ? next : street)));
  }

  function addStreet() {
    const created = blankStreet(streets);
    commit([created, ...streets]);
    select(created.id);
  }

  function deleteStreet(id: string) {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    commit(streets.filter((street) => street.id !== id));
    setActiveId(null);
  }

  function resetToBase() {
    clearOverrides();
    setStreets(STREETS);
    setDirty(false);
    setActiveId(null);
    setNotice(null);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(streets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qala-code-streets.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    try {
      const parsed = JSON.parse(await file.text()) as Street[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('empty');
      }
      commit(parsed);
      setActiveId(null);
      setNotice(null);
    } catch {
      setNotice('JSON');
    }
  }

  function signOut() {
    endSession();
    setAuthorised(false);
  }

  if (!checked) {
    return <main className="flex-1 px-4 py-20 text-center text-sm text-steppe-400">...</main>;
  }

  if (!authorised) {
    return <AdminLogin onSuccess={() => setAuthorised(true)} />;
  }

  const incomplete = streets.filter((street) => dataQualityIssues(street).length > 0);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-steppe-100">{t('admin.title')}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-steppe-400">
            {t('admin.intro')}
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="shrink-0 rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-400 transition hover:border-steppe-600 hover:text-steppe-100"
        >
          {t('admin.signOut')}
        </button>
      </header>

      <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
        {t('admin.demoAuthWarning')}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addStreet}
          className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-steppe-950 transition hover:bg-gold-400"
        >
          {t('admin.addRecord')}
        </button>
        <button
          type="button"
          onClick={exportJson}
          className="rounded-lg border border-steppe-700 px-4 py-2 text-sm text-steppe-200 transition hover:border-steppe-600"
        >
          {t('admin.export')} ({streets.length})
        </button>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="rounded-lg border border-steppe-700 px-4 py-2 text-sm text-steppe-200 transition hover:border-steppe-600"
        >
          {t('admin.import')}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void importJson(file);
            event.target.value = '';
          }}
        />
        {dirty && (
          <button
            type="button"
            onClick={resetToBase}
            className="rounded-lg border border-steppe-700 px-4 py-2 text-sm text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100"
          >
            {t('admin.resetLocal')}
          </button>
        )}
      </div>

      {notice && (
        <p className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {notice}
        </p>
      )}

      <section className="mt-6 rounded-xl border border-steppe-800 bg-steppe-900 p-4">
        <h2 className="text-sm font-semibold text-steppe-100">{t('admin.quality')}</h2>
        {incomplete.length === 0 ? (
          <p className="mt-1.5 text-sm text-emerald-400">{t('admin.qualityOk')}</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm text-amber-300">
            {incomplete.map((street) => (
              <li key={street.id}>
                {street.name_ru || street.id}:{' '}
                {dataQualityIssues(street)
                  .map((issue) => QUALITY_ISSUE_LABELS[issue][lang])
                  .join(', ')}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <section className={active ? 'hidden lg:block' : 'block'}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-steppe-400">
            {t('admin.records')}
          </h2>
          <ul className="thin-scroll max-h-[40rem] space-y-1 overflow-y-auto pr-1">
            {streets.map((street) => (
              <li key={street.id}>
                <button
                  type="button"
                  onClick={() => select(street.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                    activeId === street.id
                      ? 'border-gold-500/50 bg-steppe-800'
                      : 'border-steppe-800 hover:border-steppe-700 hover:bg-steppe-850'
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-steppe-100">
                      {street.name_ru || t('admin.newStreetName')}
                    </span>
                    <span className="block truncate text-xs text-steppe-400">{street.slug}</span>
                  </span>
                  <StatusPill status={street.status} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section
          ref={editorRef}
          className={`scroll-mt-16 ${active ? 'block' : 'hidden lg:block'}`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-steppe-400">
              {t('admin.editing')}
            </h2>
            {active && (
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-300 transition hover:border-steppe-600 hover:text-steppe-100 lg:hidden"
              >
                {t('admin.backToList')}
              </button>
            )}
          </div>
          {active ? (
            <StreetEditor
              street={active}
              onChange={updateStreet}
              onDelete={() => deleteStreet(active.id)}
            />
          ) : (
            <p className="rounded-xl border border-dashed border-steppe-800 p-8 text-center text-sm text-steppe-400">
              {t('admin.selectRecord')}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function StatusPill({ status }: { status: RecordStatus }) {
  const tone =
    status === 'published'
      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
      : status === 'review'
        ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
        : 'border-steppe-700 bg-steppe-800 text-steppe-400';

  return (
    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${tone}`}>
      {status}
    </span>
  );
}

/** Пустая запись со статусом draft - заполняется исследователем. */
function blankStreet(existing: readonly Street[]): Street {
  const maxId = existing.reduce((max, street) => {
    const match = /street_(\d+)/.exec(street.id);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  const number = String(maxId + 1).padStart(3, '0');

  return {
    id: `street_${number}`,
    name_ru: '',
    name_kz: '',
    name_en: '',
    slug: `street-${number}`,
    category: 'personality',
    subcategories: [],
    alt_names: [],
    twogis_url: '',
    status: 'draft',
    sources: [],
    text: {
      kind: 'улица',
      description: '',
      who_is_it: '',
      why_named: '',
      historical_facts: [],
      cultural_connection: '',
    },
  };
}
