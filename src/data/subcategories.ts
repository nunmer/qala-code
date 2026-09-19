import type { Lang } from '@/i18n/config';

/**
 * Управляемый словарь подкатегорий.
 *
 * Раньше подкатегории были свободными строками на русском - из-за этого
 * их нельзя было перевести и нельзя было надёжно сопоставлять в retrieval.
 * Теперь это ключи со словарём подписей на трёх языках.
 */
export type SubcategoryId =
  | 'literature'
  | 'education'
  | 'pedagogy'
  | 'military'
  | 'history'
  | 'statesmen'
  | 'writers'
  | 'poets'
  | 'scientists'
  | 'folk-art'
  | 'geography-science'
  | 'ethnography'
  | 'geology'
  | 'law'
  | 'regions'
  | 'steppe'
  | 'historic-territories'
  | 'cities'
  | 'archaeology'
  | 'mountains'
  | 'historic-names'
  | 'statehood'
  | 'concepts'
  | 'ideology'
  | 'ancient-turkic'
  | 'events'
  | 'society'
  | 'epic'
  | 'folklore'
  | 'music'
  | 'art'
  | 'reserves'
  | 'birds'
  | 'wetlands'
  | 'rivers'
  | 'hydronyms'
  | 'plants'
  | 'landscape';

type Labels = Readonly<Record<Lang, string>>;

export const SUBCATEGORIES: Readonly<Record<SubcategoryId, Labels>> = {
  literature: { ru: 'литература', kk: 'әдебиет', en: 'literature' },
  education: { ru: 'просвещение', kk: 'ағартушылық', en: 'enlightenment' },
  pedagogy: { ru: 'педагогика', kk: 'педагогика', en: 'pedagogy' },
  military: { ru: 'военные', kk: 'әскери қайраткерлер', en: 'military' },
  history: { ru: 'история', kk: 'тарих', en: 'history' },
  statesmen: { ru: 'государственные деятели', kk: 'мемлекет қайраткерлері', en: 'statesmen' },
  writers: { ru: 'писатели', kk: 'жазушылар', en: 'writers' },
  poets: { ru: 'поэты', kk: 'ақындар', en: 'poets' },
  scientists: { ru: 'учёные', kk: 'ғалымдар', en: 'scientists' },
  'folk-art': { ru: 'народное творчество', kk: 'халық өнері', en: 'folk art' },
  'geography-science': { ru: 'география', kk: 'география', en: 'geography' },
  ethnography: { ru: 'этнография', kk: 'этнография', en: 'ethnography' },
  geology: { ru: 'геология', kk: 'геология', en: 'geology' },
  law: { ru: 'право', kk: 'құқық', en: 'law' },
  regions: { ru: 'регионы', kk: 'өңірлер', en: 'regions' },
  steppe: { ru: 'степь', kk: 'дала', en: 'steppe' },
  'historic-territories': {
    ru: 'исторические территории',
    kk: 'тарихи аймақтар',
    en: 'historic territories',
  },
  cities: { ru: 'города', kk: 'қалалар', en: 'cities' },
  archaeology: { ru: 'археология', kk: 'археология', en: 'archaeology' },
  mountains: { ru: 'горы', kk: 'таулар', en: 'mountains' },
  'historic-names': {
    ru: 'исторические названия',
    kk: 'тарихи атаулар',
    en: 'historic names',
  },
  statehood: { ru: 'государственность', kk: 'мемлекеттілік', en: 'statehood' },
  concepts: { ru: 'понятия', kk: 'ұғымдар', en: 'concepts' },
  ideology: { ru: 'идеология', kk: 'идеология', en: 'ideology' },
  'ancient-turkic': {
    ru: 'древнетюркское наследие',
    kk: 'көне түркі мұрасы',
    en: 'ancient Turkic heritage',
  },
  events: { ru: 'события', kk: 'оқиғалар', en: 'events' },
  society: { ru: 'общество', kk: 'қоғам', en: 'society' },
  epic: { ru: 'эпос', kk: 'эпос', en: 'epic' },
  folklore: { ru: 'фольклор', kk: 'фольклор', en: 'folklore' },
  music: { ru: 'музыка', kk: 'музыка', en: 'music' },
  art: { ru: 'искусство', kk: 'өнер', en: 'art' },
  reserves: { ru: 'заповедники', kk: 'қорықтар', en: 'nature reserves' },
  birds: { ru: 'птицы', kk: 'құстар', en: 'birds' },
  wetlands: {
    ru: 'водно-болотные угодья',
    kk: 'сулы-батпақты алқаптар',
    en: 'wetlands',
  },
  rivers: { ru: 'реки', kk: 'өзендер', en: 'rivers' },
  hydronyms: { ru: 'гидронимы', kk: 'гидронимдер', en: 'hydronyms' },
  plants: { ru: 'растения', kk: 'өсімдіктер', en: 'plants' },
  landscape: { ru: 'ландшафт', kk: 'ландшафт', en: 'landscape' },
};

export const SUBCATEGORY_IDS = Object.keys(SUBCATEGORIES) as readonly SubcategoryId[];

export function subcategoryLabel(id: SubcategoryId, lang: Lang): string {
  return SUBCATEGORIES[id]?.[lang] ?? id;
}
