import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StreetDetail } from '@/components/StreetDetail';
import { STREETS } from '@/data/streets';
import { findBySlug } from '@/lib/search';
import { getStreetTitle } from '@/data/streets/translations';

/** Статически генерируем страницу для каждой улицы (§21 README: /street/{slug}). */
export function generateStaticParams() {
  return STREETS.map((street) => ({ slug: street.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const street = findBySlug(STREETS, slug);
  if (!street) return { title: 'Улица не найдена' };

  // Метаданные статические, поэтому берём русский — язык-источник.
  return {
    title: getStreetTitle(street, 'ru'),
    description: street.text.description,
  };
}

export default async function StreetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const street = findBySlug(STREETS, slug);
  if (!street) notFound();

  return <StreetDetail street={street} />;
}
