import type { NextConfig } from 'next';

/**
 * Статический экспорт: приложение целиком собирается в `out/`
 * и может быть выложено на любой статический хостинг
 * (GitHub Pages, Vercel, Netlify, обычный nginx).
 *
 * Бэкенда нет — вся выборка, поиск и retrieval выполняются в браузере
 * поверх встроенного датасета QALA CODE.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
