'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useTranslation } from '@/i18n/LanguageProvider';
import {
  isWithinAstana,
  parseTwoGisLocation,
  parseTwoGisName,
  type Coordinates,
} from '@/lib/twogis';

const MapPreview = dynamic(() => import('@/components/admin/PointPreview'), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center text-xs text-steppe-400">...</div>
  ),
});

/**
 * Поле ссылки 2ГИС - единственный способ задать расположение улицы.
 *
 * Координаты не вводятся руками: они разбираются из ссылки, показываются
 * пользователю и сразу отрисовываются на мини-карте, чтобы ошибку было
 * видно до сохранения.
 */
export function TwoGisField({
  value,
  onChange,
  onNameDetected,
}: {
  value: string;
  onChange: (url: string) => void;
  /** Название, найденное в ссылке (например, из /search/...). */
  onNameDetected?: (name: string) => void;
}) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(value);

  const location: Coordinates | null = useMemo(() => parseTwoGisLocation(draft), [draft]);
  const outside = location ? !isWithinAstana(location) : false;

  function apply() {
    onChange(draft.trim());

    const name = parseTwoGisName(draft);
    if (name && onNameDetected) onNameDetected(name);
  }

  return (
    <div className="space-y-2 rounded-lg border border-steppe-700 bg-steppe-950/60 p-3">
      <label className="block">
        <span className="mb-1 block text-xs text-steppe-400">{t('admin.twogisUrl')}</span>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={apply}
          placeholder="https://2gis.kz/astana/geo/.../71.4302,51.1282"
          className="w-full rounded-lg border border-steppe-700 bg-steppe-950 px-3 py-2 text-sm text-steppe-100 placeholder:text-steppe-600 focus:border-gold-500 focus:outline-none"
        />
      </label>

      <p className="text-[11px] leading-relaxed text-steppe-400">{t('admin.twogisHint')}</p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={apply}
          className="rounded-lg border border-steppe-700 px-3 py-1.5 text-xs text-steppe-200 transition hover:border-steppe-600"
        >
          {t('admin.twogisApply')}
        </button>

        {draft.trim() && !location && (
          <span className="text-xs text-red-300">{t('admin.twogisInvalid')}</span>
        )}
        {location && (
          <span className="text-xs tabular-nums text-steppe-400">
            {t('admin.twogisParsed')}: {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
          </span>
        )}
      </div>

      {outside && (
        <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2 text-xs text-amber-200">
          {t('admin.twogisOutside')}
        </p>
      )}

      {location && (
        <div>
          <span className="mb-1 block text-xs text-steppe-400">{t('admin.preview')}</span>
          <div className="h-40 overflow-hidden rounded-lg border border-steppe-800">
            <MapPreview location={location} />
          </div>
        </div>
      )}
    </div>
  );
}
