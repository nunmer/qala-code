import type { SubcategoryId } from '@/data/subcategories';
import type { Lang } from '@/i18n/config';

/**
 * Модель данных QALA CODE.
 * Соответствует структуре из §6 README, расширенной полями,
 * которые требуют §8 (поиск), §26 (статусы) и §29 (качество данных).
 */

/** Смысловые категории урбанонимов (§7 README). */
export type CategoryId =
  | 'personality'
  | 'geography'
  | 'history'
  | 'literature'
  | 'nature';

/** Жизненный цикл исследовательской записи (§26 README). */
export type RecordStatus = 'draft' | 'review' | 'published';

export interface Source {
  readonly title: string;
  readonly url?: string;
}

/**
 * Переводимая часть карточки.
 *
 * Русский - язык-источник: он заполняется при исследовании и всегда присутствует.
 * Казахский и английский хранятся отдельными наложениями и при отсутствии
 * подставляются из русского, а интерфейс честно помечает это.
 */
export interface StreetText {
  readonly kind: string;
  readonly description: string;
  readonly who_is_it: string;
  readonly why_named: string;
  readonly historical_facts: readonly string[];
  readonly interesting_fact?: string;
  readonly cultural_connection: string;
}

export type StreetTranslations = Readonly<Partial<Record<Lang, StreetText>>>;

export interface Street {
  readonly id: string;
  readonly name_ru: string;
  readonly name_kz: string;
  /** Название на английском; при отсутствии используется латинская транслитерация slug. */
  readonly name_en?: string;
  readonly slug: string;
  readonly category: CategoryId;
  readonly subcategories: readonly SubcategoryId[];
  /** Альтернативные написания для поиска (§8 README). */
  readonly alt_names: readonly string[];

  /**
   * Расположение задаётся ссылкой 2ГИС - это единственный источник координат.
   * Отдельных полей latitude/longitude нет: их легко разойтись с реальностью,
   * а ссылку всегда можно открыть и проверить.
   */
  readonly twogis_url: string;

  readonly status: RecordStatus;
  readonly sources: readonly Source[];

  /** Русский текст карточки - язык-источник. */
  readonly text: StreetText;
}

export interface Category {
  readonly id: CategoryId;
  readonly label: Readonly<Record<Lang, string>>;
  /** Цвет маркера и акцентов. Хранится как hex, чтобы работать и в Leaflet, и в CSS. */
  readonly color: string;
  readonly description: Readonly<Record<Lang, string>>;
}

/** Одна точка образовательного QR-маршрута (§18-19 README). */
export interface QuestStep {
  readonly order: number;
  readonly street_slug: string;
  readonly question: Readonly<Record<Lang, string>>;
  readonly options: Readonly<Record<Lang, readonly string[]>>;
  /** Индекс правильного варианта в `options`. */
  readonly answer_index: number;
  readonly explanation: Readonly<Record<Lang, string>>;
}

/** Агрегаты для «Карты смыслов» (§10 README). */
export interface CategoryStat {
  readonly category: Category;
  readonly count: number;
  readonly share: number;
}

export interface Statistics {
  readonly total: number;
  readonly published: number;
  readonly personalities: number;
  readonly categories: readonly CategoryStat[];
  readonly sourcesCount: number;
}
