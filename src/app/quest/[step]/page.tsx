import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { QuestStepView } from '@/components/QuestStepView';
import { QUEST_STEPS } from '@/data/quest';
import { STREETS } from '@/data/streets';
import { findBySlug } from '@/lib/search';

/** Статические страницы всех десяти точек маршрута (§18 README). */
export function generateStaticParams() {
  return QUEST_STEPS.map((step) => ({ step: String(step.order) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: string }>;
}): Promise<Metadata> {
  const { step } = await params;
  const questStep = QUEST_STEPS.find((item) => String(item.order) === step);
  if (!questStep) return { title: 'Точка маршрута не найдена' };

  const street = findBySlug(STREETS, questStep.street_slug);
  return { title: `QR №${questStep.order} — ${street?.name_ru ?? 'точка маршрута'}` };
}

export default async function QuestStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const questStep = QUEST_STEPS.find((item) => String(item.order) === step);
  if (!questStep) notFound();

  const street = findBySlug(STREETS, questStep.street_slug);
  if (!street) notFound();

  return <QuestStepView step={questStep} street={street} total={QUEST_STEPS.length} />;
}
