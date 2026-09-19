'use client';

import { CATEGORIES } from '@/data/categories';
import { SUBCATEGORIES, SUBCATEGORY_IDS, type SubcategoryId } from '@/data/subcategories';
import { useTranslation } from '@/i18n/LanguageProvider';
import { QUALITY_ISSUE_LABELS, dataQualityIssues } from '@/lib/stats';
import type { CategoryId, RecordStatus, Source, Street, StreetText } from '@/lib/types';
import { CategoryBadge } from '@/components/CategoryBadge';
import { TwoGisField } from './TwoGisField';

const STATUSES: readonly RecordStatus[] = ['draft', 'review', 'published'];

/**
 * Редактор одной записи.
 *
 * Все изменения выражаются как новый объект — исходная запись
 * не мутируется (правило иммутабельности проекта).
 */
export function StreetEditor({
  street,
  onChange,
  onDelete,
}: {
  street: Street;
  onChange: (next: Street) => void;
  onDelete: () => void;
}) {
  const { t, lang } = useTranslation();
  const issues = dataQualityIssues(street);

  const patch = (changes: Partial<Street>) => onChange({ ...street, ...changes });
  const patchText = (changes: Partial<StreetText>) =>
    onChange({ ...street, text: { ...street.text, ...changes } });

  function toggleSubcategory(id: SubcategoryId) {
    const next = street.subcategories.includes(id)
      ? street.subcategories.filter((item) => item !== id)
      : [...street.subcategories, id];
    patch({ subcategories: next });
  }

  return (
    <div className="space-y-4 rounded-xl border border-steppe-800 bg-steppe-900 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-steppe-100">
            {street.name_ru || t('admin.newStreetName')}
          </h3>
          <p className="text-xs text-steppe-400">{street.id}</p>
        </div>
        <CategoryBadge category={street.category} size="sm" />
      </div>

      <p className="rounded-lg border border-steppe-700 bg-steppe-950/60 p-2.5 text-[11px] leading-relaxed text-steppe-400">
        {t('admin.translationNote')}
      </p>

      {/* Расположение задаётся ссылкой 2ГИС — координат руками нет. */}
      <TwoGisField
        value={street.twogis_url}
        onChange={(url) => patch({ twogis_url: url })}
        onNameDetected={(name) => {
          if (!street.name_ru.trim()) patch({ name_ru: name });
        }}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t('admin.nameRu')}>
          <input
            value={street.name_ru}
            onChange={(event) => patch({ name_ru: event.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label={t('admin.nameKz')}>
          <input
            value={street.name_kz}
            onChange={(event) => patch({ name_kz: event.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Name (English)">
          <input
            value={street.name_en ?? ''}
            onChange={(event) => patch({ name_en: event.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label={t('admin.kind')}>
          <input
            value={street.text.kind}
            onChange={(event) => patchText({ kind: event.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label={t('admin.slug')}>
          <input
            value={street.slug}
            onChange={(event) =>
              patch({ slug: event.target.value.trim().toLowerCase().replace(/\s+/g, '-') })
            }
            className={inputClass}
          />
        </Field>
        <Field label={t('admin.category')}>
          <select
            value={street.category}
            onChange={(event) => patch({ category: event.target.value as CategoryId })}
            className={inputClass}
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label[lang]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('admin.status')}>
          <select
            value={street.status}
            onChange={(event) => patch({ status: event.target.value as RecordStatus })}
            className={inputClass}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <span className="mb-1.5 block text-xs text-steppe-400">{t('admin.subcategories')}</span>
        <div className="thin-scroll flex max-h-32 flex-wrap gap-1.5 overflow-y-auto rounded-lg border border-steppe-800 p-2">
          {SUBCATEGORY_IDS.map((id) => {
            const active = street.subcategories.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleSubcategory(id)}
                className={`rounded-md px-2 py-0.5 text-[11px] transition ${
                  active
                    ? 'bg-gold-500 text-steppe-950'
                    : 'bg-steppe-800 text-steppe-400 hover:text-steppe-100'
                }`}
              >
                {SUBCATEGORIES[id][lang]}
              </button>
            );
          })}
        </div>
      </div>

      <Field label={t('admin.description')}>
        <textarea
          rows={3}
          value={street.text.description}
          onChange={(event) => patchText({ description: event.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.whoIsIt')}>
        <textarea
          rows={3}
          value={street.text.who_is_it}
          onChange={(event) => patchText({ who_is_it: event.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.whyNamed')}>
        <textarea
          rows={3}
          value={street.text.why_named}
          onChange={(event) => patchText({ why_named: event.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.facts')}>
        <textarea
          rows={5}
          value={street.text.historical_facts.join('\n')}
          onChange={(event) =>
            patchText({
              historical_facts: event.target.value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean),
            })
          }
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.interesting')}>
        <textarea
          rows={2}
          value={street.text.interesting_fact ?? ''}
          onChange={(event) =>
            patchText({ interesting_fact: event.target.value.trim() || undefined })
          }
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.connection')}>
        <textarea
          rows={2}
          value={street.text.cultural_connection}
          onChange={(event) => patchText({ cultural_connection: event.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.altNames')}>
        <textarea
          rows={3}
          value={street.alt_names.join('\n')}
          onChange={(event) =>
            patch({
              alt_names: event.target.value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean),
            })
          }
          className={inputClass}
        />
      </Field>

      <Field label={t('admin.sources')}>
        <textarea
          rows={4}
          value={street.sources
            .map((source) => (source.url ? `${source.title} | ${source.url}` : source.title))
            .join('\n')}
          onChange={(event) => patch({ sources: parseSources(event.target.value) })}
          className={inputClass}
        />
      </Field>

      {issues.length > 0 && (
        <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          {t('admin.qualityIssues')}:{' '}
          {issues.map((issue) => QUALITY_ISSUE_LABELS[issue][lang]).join(', ')}.
        </p>
      )}

      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
      >
        {t('admin.deleteRecord')}
      </button>
    </div>
  );
}

/** Разбирает строки вида «Название | https://…» в список источников. */
function parseSources(raw: string): readonly Source[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, url] = line.split('|').map((part) => part.trim());
      return url ? { title, url } : { title };
    })
    .filter((source) => source.title.length > 0);
}

const inputClass =
  'w-full rounded-lg border border-steppe-700 bg-steppe-950 px-3 py-2 text-sm text-steppe-100 focus:border-gold-500 focus:outline-none';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-steppe-400">{label}</span>
      {children}
    </label>
  );
}
