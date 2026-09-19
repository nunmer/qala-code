import type { Lang } from './config';

/**
 * Строки интерфейса на трёх языках.
 *
 * Ключи русского словаря задают контракт: тип `MessageKey` выводится из него,
 * поэтому пропущенный перевод — ошибка компиляции, а не пустое место в UI.
 */
const ru = {
  'nav.map': 'Карта',
  'nav.ai': 'AI-гид',
  'nav.meanings': 'Карта смыслов',
  'nav.quest': 'QR-квест',
  'nav.catalog': 'Каталог',
  'nav.admin': 'Данные',
  'nav.language': 'Язык интерфейса',

  'footer.note':
    'QALA CODE — образовательный исследовательский проект. Данные основаны на исследованной выборке улиц Астаны.',
  'footer.sources':
    'Расположение каждой улицы задано ссылкой 2ГИС. Источники указаны в карточке улицы.',

  'home.tagline': 'Узнай город через историю его улиц.',
  'home.intro':
    'Карта города — это не только дороги и адреса. За каждым названием может стоять человек, событие, место, природный объект или культурное понятие. Мы собрали эти истории в собственную базу данных, нанесли их на карту и построили AI-гид, который отвечает только по этой базе.',
  'home.openMap': 'Открыть карту',
  'home.stat.streets': 'исследованных улиц',
  'home.stat.categories': 'смысловых категорий',
  'home.stat.personalities': 'исторических личностей',
  'home.stat.sources': 'источников',
  'home.sampleNote':
    'Показатели рассчитаны по исследованной выборке, а не по полному реестру улиц Астаны.',
  'home.how': 'Как устроен проект',
  'home.how.research.title': 'Исследование',
  'home.how.research.body':
    'Собственная база урбанонимов: название, происхождение, историческая справка, культурная связь и источники для каждой записи.',
  'home.how.visual.title': 'Визуализация',
  'home.how.visual.body':
    'Карта с фильтрами по категориям, поиск с учётом казахского, русского и латинского написания, страница для каждой улицы.',
  'home.how.ai.title': 'AI поверх базы',
  'home.how.ai.body':
    'Гид отвечает естественным языком, но только на основании найденных записей проекта. Он не придумывает факты и не подменяет исследование.',

  'map.searchLabel': 'Поиск улицы',
  'map.searchPlaceholder': 'Абая, Қабанбай, Qabanbay…',
  'map.searchHint': 'Поиск понимает казахское, русское и латинское написание.',
  'map.categories': 'Категории',
  'map.reset': 'сбросить',
  'map.found': 'Найдено',
  'map.of': 'из',
  'map.empty': 'Ничего не найдено. Попробуйте другое написание или снимите фильтры.',
  'map.loading': 'Загрузка карты…',
  'map.openCard': 'Открыть карточку →',
  'map.locationSource': 'Расположение по данным 2ГИС и OpenStreetMap',

  'street.back': '← К карте',
  'street.who': 'Кто это / что это',
  'street.why': 'Почему улица названа так',
  'street.facts': 'Историческая справка',
  'street.interesting': 'Интересный факт',
  'street.connection': 'Связь с Казахстаном',
  'street.location': 'Расположение',
  'street.sources': 'Источники',
  'street.qr': 'QR-код улицы',
  'street.qrNote':
    'Код ведёт на эту страницу. Его можно распечатать и разместить на маршруте — так цифровая карта выходит за пределы экрана.',
  'street.related': 'Другие улицы этой категории',
  'street.openIn2gis': 'Открыть в 2ГИС →',
  'street.noLocation': 'Для этой записи не указана ссылка 2ГИС, поэтому её нет на карте.',
  'street.draftWarning': 'Статус записи',
  'street.draftNote': 'Информация ещё проверяется и может быть неполной.',
  'street.fullPage': 'Полная страница, источники и QR-код →',
  'street.close': 'Закрыть карточку',

  'ai.title': '🤖 AI-гид по улицам Астаны',
  'ai.intro':
    'Спросите о названиях улиц обычным языком. Гид ищет ответ в базе QALA CODE и отвечает только по найденным записям — он не придумывает факты, даты и источники. Если данных в базе нет, он так и скажет.',
  'ai.placeholder': 'Почему улица называется…',
  'ai.askButton': 'Спросить',
  'ai.question': 'Вопрос',
  'ai.popular': 'Популярные вопросы',
  'ai.usedRecords': 'Записи базы, использованные для ответа',
  'ai.modeLlm': 'Ответ сформулирован моделью строго по приведённым записям базы.',
  'ai.modeRetrieval': 'Ответ собран напрямую из базы QALA CODE, без обращения к модели.',
  'ai.emptyHistory': 'Задайте вопрос или выберите один из популярных.',
  'ai.modelError': 'Модель недоступна',
  'ai.modelErrorNote': 'Ниже — ответ, собранный напрямую из базы QALA CODE.',
  'ai.connected': 'Модель подключена',
  'ai.notConnected': 'Модель не подключена',
  'ai.configure': 'настроить',
  'ai.collapse': 'свернуть',
  'ai.worksWithoutKey':
    'Гид работает и без ключа: поиск по базе выполняется всегда, а ответ собирается напрямую из найденных записей. Ключ нужен только для того, чтобы ответ формулировался естественным языком.',
  'ai.keyWarning':
    'Ключ сохраняется только в localStorage этого браузера и отправляется напрямую в API провайдера. Он не попадает в репозиторий и не виден другим пользователям сайта. Но при публичном развёртывании любой, кто получит доступ к этому браузеру, увидит ключ — для продакшена вызов модели нужно вынести на серверный прокси.',
  'ai.apiKey': 'API-ключ',
  'ai.model': 'Модель',
  'ai.baseUrl': 'Base URL (OpenAI-совместимый)',
  'ai.save': 'Сохранить',
  'ai.disconnect': 'Отключить и удалить ключ',

  'meanings.title': 'Карта смыслов Астаны',
  'meanings.intro':
    'Какие смысловые категории представлены среди исследованных названий улиц. Диаграмма показывает, о чём «говорит» карта города: чьи имена и какие понятия на ней закреплены.',
  'meanings.sampleWarning':
    'Статистика основана на исследованной выборке. Это не полный реестр улиц Астаны, поэтому доли описывают выборку, а не город целиком.',
  'meanings.textSummary': 'То же в виде текстовой сводки',
  'meanings.explainTitle': 'Что показывает эта диаграмма',
  'meanings.explainBody':
    'Преобладание категории «Личности» — не случайность выборки, а особенность самой топонимики: городские названия чаще всего увековечивают людей. Категории «История» и «География» показывают второй слой — понятия государственности и имена мест, через которые город связывает себя с остальным Казахстаном.',
  'meanings.onMap': 'Посмотреть это распределение на карте →',
  'meanings.researched': 'Исследовано',
  'meanings.publishedRecords': 'Опубликовано записей',
  'meanings.uniqueSources': 'Уникальных источников',

  'catalog.title': 'Каталог исследованных улиц',
  'catalog.subtitle': 'записей, сгруппированных по смысловым категориям.',

  'quest.title': 'QR-квест «Прогулка по истории Астаны»',
  'quest.intro':
    'Образовательный маршрут по десяти точкам. На каждой точке — QR-код: после сканирования открывается информация об улице, историческая справка и вопрос. Ответили — переходите к следующей точке.',
  'quest.progress': 'Пройдено',
  'quest.printSheet': 'Лист QR-кодов для печати',
  'quest.hideSheet': 'Скрыть QR-коды',
  'quest.restart': 'Начать заново',
  'quest.finished': '🎉 Маршрут завершён!',
  'quest.finishedNote': 'Вы исследовали 10 улиц и узнали их историческое происхождение.',
  'quest.printNote':
    'Распечатайте этот лист и разместите коды на точках маршрута. Каждый код ведёт на страницу своей точки квеста.',
  'quest.allPoints': '← Все точки маршрута',
  'quest.point': 'Точка',
  'quest.reference': 'Историческая справка',
  'quest.fullCard': 'Полная карточка улицы и источники →',
  'quest.correct': 'Верно!',
  'quest.incorrect': 'Не совсем — правильный ответ отмечен выше.',
  'quest.next': 'Следующая точка',
  'quest.finish': 'Завершить маршрут →',

  'admin.title': 'Данные проекта',
  'admin.intro':
    'Редактор исследовательской базы. Правки сохраняются в этом браузере и сразу видны на карте, в AI-гиде и на страницах улиц. Чтобы они попали в сам проект, выгрузите JSON и положите его в датасет — постоянного хранилища у статического приложения нет.',
  'admin.export': 'Выгрузить JSON',
  'admin.import': 'Загрузить JSON',
  'admin.resetLocal': 'Сбросить локальные правки',
  'admin.addRecord': '+ Новая запись',
  'admin.deleteRecord': 'Удалить запись',
  'admin.confirmDelete': 'Удалить запись безвозвратно? Отменить это действие нельзя.',
  'admin.quality': 'Качество данных',
  'admin.qualityOk':
    'Все записи соответствуют минимальным требованиям: название, категория, описание, объяснение происхождения, минимум 3 факта, источник и ссылка 2ГИС.',
  'admin.records': 'Записи',
  'admin.editing': 'Редактирование',
  'admin.selectRecord': 'Выберите запись слева или создайте новую.',
  'admin.login': 'Вход в редактор',
  'admin.username': 'Логин',
  'admin.password': 'Пароль',
  'admin.signIn': 'Войти',
  'admin.signOut': 'Выйти',
  'admin.badCredentials': 'Неверный логин или пароль.',
  'admin.demoAuthWarning':
    'Это демонстрационная защита. Приложение статическое: проверка выполняется в браузере, а вся база всё равно входит в состав сайта. Не размещайте здесь данные, которые нельзя публиковать.',
  'admin.twogisUrl': 'Ссылка 2ГИС',
  'admin.twogisHint':
    'Вставьте ссылку из 2ГИС — координаты и название подставятся автоматически. Ссылка заменяет собой поля широты и долготы.',
  'admin.twogisApply': 'Заполнить из ссылки',
  'admin.twogisInvalid': 'В ссылке не удалось найти координаты. Проверьте, что это ссылка 2ГИС.',
  'admin.twogisOutside': 'Точка находится за пределами Астаны — проверьте ссылку.',
  'admin.twogisParsed': 'Координаты из ссылки',
  'admin.preview': 'Предпросмотр точки',
  'admin.nameRu': 'Название (рус.)',
  'admin.nameKz': 'Название (каз.)',
  'admin.kind': 'Тип объекта',
  'admin.slug': 'Slug (адрес страницы)',
  'admin.category': 'Категория',
  'admin.subcategories': 'Подкатегории',
  'admin.status': 'Статус',
  'admin.description': 'Описание',
  'admin.whoIsIt': 'Кто это / что это',
  'admin.whyNamed': 'Почему так названа',
  'admin.facts': 'Исторические факты (по одному в строке)',
  'admin.interesting': 'Интересный факт',
  'admin.connection': 'Связь с Казахстаном',
  'admin.altNames': 'Альтернативные написания (по одному в строке)',
  'admin.sources': 'Источники (название | ссылка, по одному в строке)',
  'admin.qualityIssues': 'Запись не соответствует минимальным требованиям',
  'admin.newStreetName': 'Новая улица',
  'admin.slugTaken': 'Такой slug уже занят.',
  'admin.translationNote':
    'Редактор правит русскую версию — язык-источник. Казахский и английский переводы хранятся отдельно и подставляются при переключении языка.',

  'common.loading': 'Загрузка…',
  'common.notFound': 'Страница не найдена',
  'common.notFoundNote':
    'В базе QALA CODE нет записи по этому адресу. Возможно, улица ещё не исследована.',
  'common.translationFallback': 'Перевод этой записи ещё не готов — показан русский оригинал.',
} as const;

export type MessageKey = keyof typeof ru;

type Dictionary = Readonly<Record<MessageKey, string>>;

const kk: Dictionary = {
  'nav.map': 'Карта',
  'nav.ai': 'AI-гид',
  'nav.meanings': 'Мағыналар картасы',
  'nav.quest': 'QR-квест',
  'nav.catalog': 'Каталог',
  'nav.admin': 'Деректер',
  'nav.language': 'Интерфейс тілі',

  'footer.note':
    'QALA CODE — білім беру-зерттеу жобасы. Деректер Астана көшелерінің зерттелген таңдамасына негізделген.',
  'footer.sources':
    'Әр көшенің орналасуы 2ГИС сілтемесімен берілген. Дереккөздер көше карточкасында көрсетілген.',

  'home.tagline': 'Қаланы көшелерінің тарихы арқылы таны.',
  'home.intro':
    'Қала картасы — тек жолдар мен мекенжайлар ғана емес. Әр атаудың артында адам, оқиға, жер, табиғат нысаны немесе мәдени ұғым тұруы мүмкін. Біз осы тарихтарды жеке дерекқорға жинап, картаға түсірдік және тек осы дерекқор бойынша жауап беретін AI-гид жасадық.',
  'home.openMap': 'Картаны ашу',
  'home.stat.streets': 'зерттелген көше',
  'home.stat.categories': 'мағыналық санат',
  'home.stat.personalities': 'тарихи тұлға',
  'home.stat.sources': 'дереккөз',
  'home.sampleNote':
    'Көрсеткіштер зерттелген таңдама бойынша есептелген, Астананың толық көше тізілімі бойынша емес.',
  'home.how': 'Жоба қалай құрылған',
  'home.how.research.title': 'Зерттеу',
  'home.how.research.body':
    'Жеке урбаноним дерекқоры: әр жазба үшін атау, шығу тегі, тарихи анықтама, мәдени байланыс және дереккөздер.',
  'home.how.visual.title': 'Визуализация',
  'home.how.visual.body':
    'Санаттар бойынша сүзгісі бар карта, қазақ, орыс және латын жазуын ескеретін іздеу, әр көшеге жеке бет.',
  'home.how.ai.title': 'Дерекқор үстіндегі AI',
  'home.how.ai.body':
    'Гид табиғи тілмен жауап береді, бірақ тек жобаның табылған жазбаларына сүйенеді. Ол дерек ойлап таппайды және зерттеуді алмастырмайды.',

  'map.searchLabel': 'Көше іздеу',
  'map.searchPlaceholder': 'Абай, Қабанбай, Qabanbay…',
  'map.searchHint': 'Іздеу қазақ, орыс және латын жазуын түсінеді.',
  'map.categories': 'Санаттар',
  'map.reset': 'тазалау',
  'map.found': 'Табылды',
  'map.of': 'ішінен',
  'map.empty': 'Ештеңе табылмады. Басқа жазылуын көріңіз немесе сүзгілерді алып тастаңыз.',
  'map.loading': 'Карта жүктелуде…',
  'map.openCard': 'Карточканы ашу →',
  'map.locationSource': 'Орналасуы 2ГИС және OpenStreetMap деректері бойынша',

  'street.back': '← Картаға',
  'street.who': 'Бұл кім / бұл не',
  'street.why': 'Көше неге осылай аталған',
  'street.facts': 'Тарихи анықтама',
  'street.interesting': 'Қызықты дерек',
  'street.connection': 'Қазақстанмен байланысы',
  'street.location': 'Орналасуы',
  'street.sources': 'Дереккөздер',
  'street.qr': 'Көшенің QR-коды',
  'street.qrNote':
    'Код осы бетке апарады. Оны басып шығарып, маршрутқа орналастыруға болады — сонда сандық карта экраннан шығады.',
  'street.related': 'Осы санаттағы басқа көшелер',
  'street.openIn2gis': '2ГИС-те ашу →',
  'street.noLocation': 'Бұл жазба үшін 2ГИС сілтемесі көрсетілмеген, сондықтан ол картада жоқ.',
  'street.draftWarning': 'Жазба мәртебесі',
  'street.draftNote': 'Ақпарат әлі тексерілуде және толық болмауы мүмкін.',
  'street.fullPage': 'Толық бет, дереккөздер және QR-код →',
  'street.close': 'Карточканы жабу',

  'ai.title': '🤖 Астана көшелері бойынша AI-гид',
  'ai.intro':
    'Көше атаулары туралы кәдімгі тілмен сұраңыз. Гид жауапты QALA CODE дерекқорынан іздейді және тек табылған жазбалар бойынша жауап береді — ол дерек, күн және дереккөз ойлап таппайды. Дерекқорда мәлімет болмаса, солай деп айтады.',
  'ai.placeholder': 'Көше неге осылай аталады…',
  'ai.askButton': 'Сұрау',
  'ai.question': 'Сұрақ',
  'ai.popular': 'Жиі қойылатын сұрақтар',
  'ai.usedRecords': 'Жауапқа пайдаланылған дерекқор жазбалары',
  'ai.modeLlm': 'Жауапты модель тек келтірілген дерекқор жазбалары бойынша тұжырымдады.',
  'ai.modeRetrieval': 'Жауап модельге жүгінбей, тікелей QALA CODE дерекқорынан жинақталды.',
  'ai.emptyHistory': 'Сұрақ қойыңыз немесе жиі қойылатындардың бірін таңдаңыз.',
  'ai.modelError': 'Модель қолжетімсіз',
  'ai.modelErrorNote': 'Төменде — тікелей QALA CODE дерекқорынан жинақталған жауап.',
  'ai.connected': 'Модель қосылған',
  'ai.notConnected': 'Модель қосылмаған',
  'ai.configure': 'баптау',
  'ai.collapse': 'жию',
  'ai.worksWithoutKey':
    'Гид кілтсіз де жұмыс істейді: дерекқордан іздеу әрқашан орындалады, жауап табылған жазбалардан тікелей жинақталады. Кілт тек жауап табиғи тілмен тұжырымдалуы үшін қажет.',
  'ai.keyWarning':
    'Кілт тек осы браузердің localStorage-інде сақталады және тікелей провайдер API-іне жіберіледі. Ол репозиторийге түспейді және сайттың басқа пайдаланушыларына көрінбейді. Бірақ жария орналастыруда осы браузерге қолжетімділігі бар кез келген адам кілтті көреді — өнімде модельге сұранысты серверлік проксиге шығару қажет.',
  'ai.apiKey': 'API-кілт',
  'ai.model': 'Модель',
  'ai.baseUrl': 'Base URL (OpenAI-үйлесімді)',
  'ai.save': 'Сақтау',
  'ai.disconnect': 'Ажырату және кілтті өшіру',

  'meanings.title': 'Астананың мағыналар картасы',
  'meanings.intro':
    'Зерттелген көше атаулары арасында қандай мағыналық санаттар бар. Диаграмма қала картасының «не айтатынын» көрсетеді: онда кімнің есімдері мен қандай ұғымдар бекітілген.',
  'meanings.sampleWarning':
    'Статистика зерттелген таңдамаға негізделген. Бұл Астананың толық көше тізілімі емес, сондықтан үлестер қаланы емес, таңдаманы сипаттайды.',
  'meanings.textSummary': 'Сол мәлімет мәтіндік түрде',
  'meanings.explainTitle': 'Бұл диаграмма нені көрсетеді',
  'meanings.explainBody':
    '«Тұлғалар» санатының басым болуы — таңдаманың кездейсоқтығы емес, топонимиканың өз ерекшелігі: қала атаулары көбіне адамдарды мәңгілендіреді. «Тарих» пен «География» санаттары екінші қабатты көрсетеді — қала өзін Қазақстанның қалған бөлігімен байланыстыратын мемлекеттілік ұғымдары мен жер атаулары.',
  'meanings.onMap': 'Бұл таралымды картадан көру →',
  'meanings.researched': 'Зерттелді',
  'meanings.publishedRecords': 'Жарияланған жазба',
  'meanings.uniqueSources': 'Бірегей дереккөз',

  'catalog.title': 'Зерттелген көшелер каталогы',
  'catalog.subtitle': 'жазба, мағыналық санаттар бойынша топтастырылған.',

  'quest.title': 'QR-квест «Астана тарихымен серуен»',
  'quest.intro':
    'Он нүктеден тұратын білім беру маршруты. Әр нүктеде QR-код бар: сканерлегеннен кейін көше туралы ақпарат, тарихи анықтама және сұрақ ашылады. Жауап бердіңіз — келесі нүктеге өтесіз.',
  'quest.progress': 'Өтілді',
  'quest.printSheet': 'Басып шығаруға арналған QR-кодтар парағы',
  'quest.hideSheet': 'QR-кодтарды жасыру',
  'quest.restart': 'Қайта бастау',
  'quest.finished': '🎉 Маршрут аяқталды!',
  'quest.finishedNote': 'Сіз 10 көшені зерттеп, олардың тарихи шығу тегін білдіңіз.',
  'quest.printNote':
    'Осы парақты басып шығарып, кодтарды маршрут нүктелеріне орналастырыңыз. Әр код өз квест нүктесінің бетіне апарады.',
  'quest.allPoints': '← Маршруттың барлық нүктесі',
  'quest.point': 'Нүкте',
  'quest.reference': 'Тарихи анықтама',
  'quest.fullCard': 'Көшенің толық карточкасы және дереккөздер →',
  'quest.correct': 'Дұрыс!',
  'quest.incorrect': 'Мүлде емес — дұрыс жауап жоғарыда белгіленген.',
  'quest.next': 'Келесі нүкте',
  'quest.finish': 'Маршрутты аяқтау →',

  'admin.title': 'Жоба деректері',
  'admin.intro':
    'Зерттеу дерекқорының редакторы. Өзгерістер осы браузерде сақталады және картада, AI-гидте және көше беттерінде бірден көрінеді. Олар жобаның өзіне түсуі үшін JSON-ды жүктеп алып, деректер жинағына салыңыз — статикалық қосымшада тұрақты қойма жоқ.',
  'admin.export': 'JSON жүктеп алу',
  'admin.import': 'JSON жүктеу',
  'admin.resetLocal': 'Жергілікті өзгерістерді тазалау',
  'admin.addRecord': '+ Жаңа жазба',
  'admin.deleteRecord': 'Жазбаны өшіру',
  'admin.confirmDelete': 'Жазбаны қайтарымсыз өшіру керек пе? Бұл әрекетті болдырмау мүмкін емес.',
  'admin.quality': 'Деректер сапасы',
  'admin.qualityOk':
    'Барлық жазба ең аз талаптарға сай: атауы, санаты, сипаттамасы, шығу тегінің түсіндірмесі, кемінде 3 дерек, дереккөз және 2ГИС сілтемесі.',
  'admin.records': 'Жазбалар',
  'admin.editing': 'Өңдеу',
  'admin.selectRecord': 'Сол жақтан жазба таңдаңыз немесе жаңасын жасаңыз.',
  'admin.login': 'Редакторға кіру',
  'admin.username': 'Логин',
  'admin.password': 'Құпиясөз',
  'admin.signIn': 'Кіру',
  'admin.signOut': 'Шығу',
  'admin.badCredentials': 'Логин немесе құпиясөз қате.',
  'admin.demoAuthWarning':
    'Бұл — көрсетілім қорғанысы. Қосымша статикалық: тексеру браузерде орындалады, ал бүкіл дерекқор бәрібір сайт құрамына кіреді. Мұнда жариялауға болмайтын деректерді орналастырмаңыз.',
  'admin.twogisUrl': '2ГИС сілтемесі',
  'admin.twogisHint':
    '2ГИС-тен сілтеме қойыңыз — координаттар мен атау автоматты түрде толтырылады. Сілтеме ендік пен бойлық өрістерін алмастырады.',
  'admin.twogisApply': 'Сілтемеден толтыру',
  'admin.twogisInvalid':
    'Сілтемеден координаттар табылмады. Бұл 2ГИС сілтемесі екенін тексеріңіз.',
  'admin.twogisOutside': 'Нүкте Астанадан тыс жерде — сілтемені тексеріңіз.',
  'admin.twogisParsed': 'Сілтемеден алынған координаттар',
  'admin.preview': 'Нүктені алдын ала қарау',
  'admin.nameRu': 'Атауы (орысша)',
  'admin.nameKz': 'Атауы (қазақша)',
  'admin.kind': 'Нысан түрі',
  'admin.slug': 'Slug (бет мекенжайы)',
  'admin.category': 'Санаты',
  'admin.subcategories': 'Ішкі санаттар',
  'admin.status': 'Мәртебесі',
  'admin.description': 'Сипаттамасы',
  'admin.whoIsIt': 'Бұл кім / бұл не',
  'admin.whyNamed': 'Неге осылай аталған',
  'admin.facts': 'Тарихи деректер (әрқайсысы жеке жолда)',
  'admin.interesting': 'Қызықты дерек',
  'admin.connection': 'Қазақстанмен байланысы',
  'admin.altNames': 'Балама жазылуы (әрқайсысы жеке жолда)',
  'admin.sources': 'Дереккөздер (атауы | сілтеме, әрқайсысы жеке жолда)',
  'admin.qualityIssues': 'Жазба ең аз талаптарға сай емес',
  'admin.newStreetName': 'Жаңа көше',
  'admin.slugTaken': 'Мұндай slug бос емес.',
  'admin.translationNote':
    'Редактор орысша нұсқаны — бастапқы тілді — өңдейді. Қазақша және ағылшынша аудармалар бөлек сақталады және тіл ауысқанда қойылады.',

  'common.loading': 'Жүктелуде…',
  'common.notFound': 'Бет табылмады',
  'common.notFoundNote':
    'QALA CODE дерекқорында бұл мекенжай бойынша жазба жоқ. Бәлкім, көше әлі зерттелмеген.',
  'common.translationFallback':
    'Бұл жазбаның аудармасы әзір дайын емес — орысша түпнұсқа көрсетілген.',
};

const en: Dictionary = {
  'nav.map': 'Map',
  'nav.ai': 'AI guide',
  'nav.meanings': 'Map of meanings',
  'nav.quest': 'QR quest',
  'nav.catalog': 'Catalogue',
  'nav.admin': 'Data',
  'nav.language': 'Interface language',

  'footer.note':
    'QALA CODE is an educational research project. The data is based on a researched sample of Astana streets.',
  'footer.sources':
    'Each street is located by a 2GIS link. Sources are listed on every street page.',

  'home.tagline': 'Discover the city through the history of its streets.',
  'home.intro':
    'A city map is more than roads and addresses. Behind a street name there may stand a person, an event, a place, a natural feature or a cultural idea. We collected those stories into our own database, put them on the map, and built an AI guide that answers strictly from it.',
  'home.openMap': 'Open the map',
  'home.stat.streets': 'streets researched',
  'home.stat.categories': 'meaning categories',
  'home.stat.personalities': 'historical figures',
  'home.stat.sources': 'sources',
  'home.sampleNote':
    'Figures are calculated from the researched sample, not from the full register of Astana streets.',
  'home.how': 'How the project works',
  'home.how.research.title': 'Research',
  'home.how.research.body':
    'Our own database of urbanonyms: for every entry a name, its origin, a historical note, a cultural connection and sources.',
  'home.how.visual.title': 'Visualisation',
  'home.how.visual.body':
    'A map with category filters, search that understands Kazakh, Russian and Latin spellings, and a page for every street.',
  'home.how.ai.title': 'AI on top of the database',
  'home.how.ai.body':
    'The guide answers in natural language, but only from the project records it retrieves. It does not invent facts and does not replace the research.',

  'map.searchLabel': 'Search for a street',
  'map.searchPlaceholder': 'Abay, Qabanbay, Кабанбай…',
  'map.searchHint': 'Search understands Kazakh, Russian and Latin spellings.',
  'map.categories': 'Categories',
  'map.reset': 'reset',
  'map.found': 'Found',
  'map.of': 'of',
  'map.empty': 'Nothing found. Try a different spelling or clear the filters.',
  'map.loading': 'Loading the map…',
  'map.openCard': 'Open the card →',
  'map.locationSource': 'Locations from 2GIS and OpenStreetMap',

  'street.back': '← Back to the map',
  'street.who': 'Who or what this is',
  'street.why': 'Why the street carries this name',
  'street.facts': 'Historical note',
  'street.interesting': 'Notable detail',
  'street.connection': 'Connection to Kazakhstan',
  'street.location': 'Location',
  'street.sources': 'Sources',
  'street.qr': 'Street QR code',
  'street.qrNote':
    'The code leads to this page. Print it and place it along a route — that takes the digital map off the screen.',
  'street.related': 'Other streets in this category',
  'street.openIn2gis': 'Open in 2GIS →',
  'street.noLocation': 'This entry has no 2GIS link, so it does not appear on the map.',
  'street.draftWarning': 'Entry status',
  'street.draftNote': 'This information is still being checked and may be incomplete.',
  'street.fullPage': 'Full page, sources and QR code →',
  'street.close': 'Close the card',

  'ai.title': '🤖 AI guide to the streets of Astana',
  'ai.intro':
    'Ask about street names in plain language. The guide searches the QALA CODE database and answers only from the records it finds — it does not invent facts, dates or sources. If the database has nothing, it says so.',
  'ai.placeholder': 'Why is the street called…',
  'ai.askButton': 'Ask',
  'ai.question': 'Question',
  'ai.popular': 'Popular questions',
  'ai.usedRecords': 'Database records used for this answer',
  'ai.modeLlm': 'The model phrased this answer strictly from the database records shown.',
  'ai.modeRetrieval': 'Assembled directly from the QALA CODE database, without calling a model.',
  'ai.emptyHistory': 'Ask a question or pick one of the popular ones.',
  'ai.modelError': 'The model is unavailable',
  'ai.modelErrorNote': 'Below is an answer assembled directly from the QALA CODE database.',
  'ai.connected': 'Model connected',
  'ai.notConnected': 'No model connected',
  'ai.configure': 'configure',
  'ai.collapse': 'collapse',
  'ai.worksWithoutKey':
    'The guide works without a key: the database search always runs, and the answer is assembled from the records it finds. A key is only needed to have the answer phrased in natural language.',
  'ai.keyWarning':
    'The key is stored only in this browser’s localStorage and sent straight to the provider’s API. It never enters the repository and is not visible to other visitors. But on a public deployment anyone with access to this browser can read it — in production the model call must move to a server-side proxy.',
  'ai.apiKey': 'API key',
  'ai.model': 'Model',
  'ai.baseUrl': 'Base URL (OpenAI-compatible)',
  'ai.save': 'Save',
  'ai.disconnect': 'Disconnect and delete the key',

  'meanings.title': 'The map of meanings of Astana',
  'meanings.intro':
    'Which categories of meaning appear among the researched street names. The chart shows what the city map is saying: whose names and which ideas are fixed on it.',
  'meanings.sampleWarning':
    'These statistics come from the researched sample. This is not the full register of Astana streets, so the shares describe the sample rather than the city.',
  'meanings.textSummary': 'The same as a text summary',
  'meanings.explainTitle': 'What this chart shows',
  'meanings.explainBody':
    'The dominance of the “People” category is not an accident of sampling but a property of toponymy itself: city names most often commemorate people. “History” and “Geography” reveal a second layer — ideas of statehood and names of places through which the city ties itself to the rest of Kazakhstan.',
  'meanings.onMap': 'See this distribution on the map →',
  'meanings.researched': 'Researched',
  'meanings.publishedRecords': 'Published entries',
  'meanings.uniqueSources': 'Unique sources',

  'catalog.title': 'Catalogue of researched streets',
  'catalog.subtitle': 'entries, grouped by category of meaning.',

  'quest.title': 'QR quest “A walk through the history of Astana”',
  'quest.intro':
    'An educational route of ten points. Each point carries a QR code: scanning it opens information about the street, a historical note and a question. Answer it and move on to the next point.',
  'quest.progress': 'Completed',
  'quest.printSheet': 'Printable sheet of QR codes',
  'quest.hideSheet': 'Hide QR codes',
  'quest.restart': 'Start over',
  'quest.finished': '🎉 Route complete!',
  'quest.finishedNote': 'You explored 10 streets and learned where their names come from.',
  'quest.printNote':
    'Print this sheet and place the codes at the route points. Each code leads to its own quest page.',
  'quest.allPoints': '← All route points',
  'quest.point': 'Point',
  'quest.reference': 'Historical note',
  'quest.fullCard': 'Full street card and sources →',
  'quest.correct': 'Correct!',
  'quest.incorrect': 'Not quite — the correct answer is marked above.',
  'quest.next': 'Next point',
  'quest.finish': 'Finish the route →',

  'admin.title': 'Project data',
  'admin.intro':
    'Editor for the research database. Changes are saved in this browser and appear immediately on the map, in the AI guide and on street pages. To get them into the project itself, export the JSON and put it into the dataset — a static application has no persistent storage.',
  'admin.export': 'Export JSON',
  'admin.import': 'Import JSON',
  'admin.resetLocal': 'Discard local changes',
  'admin.addRecord': '+ New entry',
  'admin.deleteRecord': 'Delete entry',
  'admin.confirmDelete': 'Delete this entry permanently? This cannot be undone.',
  'admin.quality': 'Data quality',
  'admin.qualityOk':
    'Every entry meets the minimum requirements: name, category, description, explanation of origin, at least 3 facts, a source and a 2GIS link.',
  'admin.records': 'Entries',
  'admin.editing': 'Editing',
  'admin.selectRecord': 'Select an entry on the left, or create a new one.',
  'admin.login': 'Sign in to the editor',
  'admin.username': 'Username',
  'admin.password': 'Password',
  'admin.signIn': 'Sign in',
  'admin.signOut': 'Sign out',
  'admin.badCredentials': 'Wrong username or password.',
  'admin.demoAuthWarning':
    'This is a demonstration gate. The application is static: the check runs in the browser, and the whole database ships with the site anyway. Do not put anything here that cannot be published.',
  'admin.twogisUrl': '2GIS link',
  'admin.twogisHint':
    'Paste a link from 2GIS — coordinates and the name are filled in automatically. The link replaces the latitude and longitude fields.',
  'admin.twogisApply': 'Fill from link',
  'admin.twogisInvalid': 'No coordinates found in the link. Check that it is a 2GIS link.',
  'admin.twogisOutside': 'The point lies outside Astana — check the link.',
  'admin.twogisParsed': 'Coordinates from the link',
  'admin.preview': 'Point preview',
  'admin.nameRu': 'Name (Russian)',
  'admin.nameKz': 'Name (Kazakh)',
  'admin.kind': 'Object type',
  'admin.slug': 'Slug (page address)',
  'admin.category': 'Category',
  'admin.subcategories': 'Subcategories',
  'admin.status': 'Status',
  'admin.description': 'Description',
  'admin.whoIsIt': 'Who or what this is',
  'admin.whyNamed': 'Why it carries this name',
  'admin.facts': 'Historical facts (one per line)',
  'admin.interesting': 'Notable detail',
  'admin.connection': 'Connection to Kazakhstan',
  'admin.altNames': 'Alternative spellings (one per line)',
  'admin.sources': 'Sources (title | link, one per line)',
  'admin.qualityIssues': 'This entry does not meet the minimum requirements',
  'admin.newStreetName': 'New street',
  'admin.slugTaken': 'That slug is already taken.',
  'admin.translationNote':
    'The editor edits the Russian version — the source language. Kazakh and English translations are stored separately and applied when the language is switched.',

  'common.loading': 'Loading…',
  'common.notFound': 'Page not found',
  'common.notFoundNote':
    'The QALA CODE database has no entry at this address. The street may not be researched yet.',
  'common.translationFallback':
    'A translation of this entry is not ready yet — the Russian original is shown.',
};

export const MESSAGES: Readonly<Record<Lang, Dictionary>> = { ru, kk, en };
