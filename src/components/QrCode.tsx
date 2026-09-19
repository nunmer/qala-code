'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

/**
 * QR-код для страницы улицы или точки квеста (§17 README).
 * Генерируется в браузере — внешние сервисы не задействованы,
 * поэтому ссылки не утекают на сторонние домены.
 */
export function QrCode({
  value,
  size = 160,
  caption,
}: {
  value: string;
  size?: number;
  caption?: string;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: { dark: '#0a0e14', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Не удалось построить QR-код');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [value, size]);

  return (
    <figure className="flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center overflow-hidden rounded-xl bg-white p-2"
        style={{ width: size, height: size }}
      >
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- data: URL, оптимизация не нужна
          <img src={dataUrl} alt={`QR-код: ${value}`} width={size} height={size} />
        ) : (
          <span className="px-2 text-center text-[10px] leading-tight text-steppe-900">
            {error ?? 'Генерация…'}
          </span>
        )}
      </div>
      <figcaption className="max-w-[220px] break-all text-center text-[10px] text-steppe-400">
        {caption ?? value}
      </figcaption>
    </figure>
  );
}
