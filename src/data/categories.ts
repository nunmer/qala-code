import type { Category, CategoryId } from '@/lib/types';

/** Система категорий урбанонимов из §7 README. */
export const CATEGORIES: readonly Category[] = [
  {
    id: 'personality',
    label: { ru: 'Личности', kk: 'Тұлғалар', en: 'People' },
    emoji: '🟦',
    color: '#3b82f6',
    description: {
      ru: 'Названия, связанные с конкретными людьми: государственными деятелями, военными, учёными, писателями, деятелями искусства.',
      kk: 'Нақты адамдармен байланысты атаулар: мемлекет қайраткерлері, әскери адамдар, ғалымдар, жазушылар, өнер қайраткерлері.',
      en: 'Names tied to specific people: statesmen, military commanders, scholars, writers and artists.',
    },
  },
  {
    id: 'geography',
    label: { ru: 'География Казахстана', kk: 'Қазақстан географиясы', en: 'Geography of Kazakhstan' },
    emoji: '🟩',
    color: '#10b981',
    description: {
      ru: 'Названия географических объектов: городов, регионов, рек, озёр, гор, степей и исторических территорий.',
      kk: 'Географиялық нысандардың атаулары: қалалар, өңірлер, өзендер, көлдер, таулар, далалар және тарихи аймақтар.',
      en: 'Names of geographical features: cities, regions, rivers, lakes, mountains, steppes and historic territories.',
    },
  },
  {
    id: 'history',
    label: { ru: 'История и государственность', kk: 'Тарих және мемлекеттілік', en: 'History and statehood' },
    emoji: '🟨',
    color: '#f59e0b',
    description: {
      ru: 'Названия, связанные с историческими событиями, государственностью и ключевыми общественными понятиями.',
      kk: 'Тарихи оқиғалармен, мемлекеттілікпен және негізгі қоғамдық ұғымдармен байланысты атаулар.',
      en: 'Names tied to historical events, statehood and key public ideas.',
    },
  },
  {
    id: 'literature',
    label: { ru: 'Литература и искусство', kk: 'Әдебиет және өнер', en: 'Literature and art' },
    emoji: '🟪',
    color: '#a855f7',
    description: {
      ru: 'Названия, связанные с литературными произведениями, эпосом, музыкой, театром и культурными явлениями.',
      kk: 'Әдеби шығармалармен, эпоспен, музыкамен, театрмен және мәдени құбылыстармен байланысты атаулар.',
      en: 'Names tied to literary works, epics, music, theatre and cultural phenomena.',
    },
  },
  {
    id: 'nature',
    label: { ru: 'Природа', kk: 'Табиғат', en: 'Nature' },
    emoji: '🟧',
    color: '#f97316',
    description: {
      ru: 'Названия, связанные с животными, растениями, природными объектами, ландшафтами и природными явлениями.',
      kk: 'Жануарлармен, өсімдіктермен, табиғи нысандармен, ландшафттармен және табиғат құбылыстарымен байланысты атаулар.',
      en: 'Names tied to animals, plants, natural features, landscapes and natural phenomena.',
    },
  },
] as const;

const BY_ID = new Map<CategoryId, Category>(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id: CategoryId): Category {
  const category = BY_ID.get(id);
  if (!category) {
    throw new Error(`Неизвестная категория: ${id}`);
  }
  return category;
}

/**
 * Подсказки категории по ключевым словам вопроса — используется retrieval (§13 README).
 * Ключи заданы на трёх языках, чтобы AI-гид понимал вопрос на языке интерфейса.
 */
export const CATEGORY_KEYWORDS: Readonly<Record<CategoryId, readonly string[]>> = {
  personality: [
    'личност', 'человек', 'люди', 'в честь кого', 'кто такой', 'кто такая',
    'батыр', 'хан', 'герой', 'полковод', 'учён', 'учен', 'деятел', 'биограф',
    'тұлға', 'адам', 'кім', 'батыр', 'қаһарман', 'ғалым', 'қайраткер',
    'people', 'person', 'who was', 'named after', 'hero', 'commander', 'scholar',
  ],
  geography: [
    'географ', 'город', 'регион', 'река', 'озер', 'озёр', 'гора', 'горы',
    'степ', 'местност', 'территор', 'карта казахстана', 'область',
    'қала', 'өңір', 'өзен', 'көл', 'тау', 'дала', 'аймақ', 'облыс',
    'geograph', 'city', 'region', 'river', 'lake', 'mountain', 'steppe', 'territor',
  ],
  history: [
    'истори', 'государств', 'независим', 'событи', 'восстан', 'ханств',
    'победа', 'война', 'дата', 'эпох',
    'тарих', 'мемлекет', 'тәуелсіз', 'оқиға', 'көтеріліс', 'хандық', 'жеңіс', 'соғыс',
    'histor', 'statehood', 'independen', 'event', 'uprising', 'khanate', 'victory', 'war',
  ],
  literature: [
    'литератур', 'писател', 'поэт', 'акын', 'книг', 'произведен', 'эпос',
    'искусств', 'театр', 'музык', 'культур',
    'әдебиет', 'жазушы', 'ақын', 'кітап', 'шығарма', 'өнер', 'музыка', 'мәдениет',
    'literature', 'writer', 'poet', 'book', 'epic', 'art', 'theatre', 'music', 'cultur',
  ],
  nature: [
    'природ', 'животн', 'растен', 'птиц', 'заповедн', 'ландшафт', 'цвет',
    'дерев', 'фламинго', 'экологи',
    'табиғат', 'жануар', 'өсімдік', 'құс', 'қорық', 'ағаш',
    'nature', 'animal', 'plant', 'bird', 'reserve', 'landscape', 'tree', 'flamingo',
  ],
} as const;
