'use client';

/**
 * Вход в редактор данных.
 *
 * ВАЖНО, и интерфейс говорит об этом пользователю прямо:
 * это НЕ защита данных. Приложение статическое, сервера нет - проверка
 * выполняется в браузере, а весь датасет всё равно входит в состав сайта
 * и доступен любому, кто откроет исходники страницы.
 *
 * Смысл этой формы - не пускать случайного посетителя в режим
 * редактирования и не показывать ему инструменты, которые он примет
 * за официальный способ менять данные проекта. Для настоящего
 * разграничения доступа нужен бэкенд с серверной проверкой.
 */

const SESSION_KEY = 'qala-code:admin-session';

/**
 * Учётные данные демонстрационного входа.
 * Переопределяются переменными сборки, но секретом не являются ни в каком
 * варианте: любая NEXT_PUBLIC_* переменная попадает в бандл.
 */
const DEMO_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? 'admin';
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin';

export function checkCredentials(username: string, password: string): boolean {
  return username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD;
}

/**
 * Сессия живёт в sessionStorage: закрытие вкладки завершает её.
 * Пароль не сохраняется - только факт успешного входа.
 */
export function startSession(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, 'active');
  } catch {
    // Недоступное хранилище - вход просто не переживёт перезагрузку страницы.
  }
}

export function endSession(): void {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* см. выше */
  }
}

export function hasSession(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === 'active';
  } catch {
    return false;
  }
}
