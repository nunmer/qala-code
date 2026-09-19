import type { QuestStep } from '@/lib/types';

/**
 * QR-квест «Прогулка по истории Астаны» (§18-19 README).
 *
 * Десять точек, каждая привязана к улице из базы QALA CODE.
 * Все вопросы проверяются по опубликованным записям: правильный ответ
 * всегда можно обосновать полем карточки, а не внешним знанием.
 */
export const QUEST_STEPS: readonly QuestStep[] = [
  {
    order: 1,
    street_slug: 'abay',
    question: {
      ru: 'Как называется главное прозаическое произведение Абая?',
      kk: 'Абайдың басты прозалық шығармасы қалай аталады?',
      en: 'What is the title of Abay\'s principal prose work?',
    },
    options: {
      ru: ['«Қара сөз» («Слова назидания»)', '«Абай жолы»', '«Тар жол, тайғақ кешу»', '«Көкшетау»'],
      kk: ['«Қара сөз»', '«Абай жолы»', '«Тар жол, тайғақ кешу»', '«Көкшетау»'],
      en: ['"Qara Sozi" ("Words of Edification")', '"Abay Zholy"', '"Tar Zhol, Taighaq Keshu"', '"Kokshetau"'],
    },
    answer_index: 0,
    explanation: {
      ru: '«Қара сөз» - сборник философских размышлений Абая. «Абай жолы» написал Мұхтар Әуезов, «Тар жол, тайғақ кешу» и «Көкшетау» - Сәкен Сейфуллин.',
      kk: '«Қара сөз» - Абайдың философиялық толғаныстар жинағы. «Абай жолын» Мұхтар Әуезов, «Тар жол, тайғақ кешу» мен «Көкшетауды» Сәкен Сейфуллин жазған.',
      en: '"Qara Sozi" is Abay\'s collection of philosophical reflections. "Abay Zholy" was written by Mukhtar Auezov, while "Tar Zhol, Taighaq Keshu" and "Kokshetau" are by Saken Seyfullin.',
    },
  },
  {
    order: 2,
    street_slug: 'kabanbay-batyr',
    question: {
      ru: 'К какой категории относится название этой улицы?',
      kk: 'Бұл көшенің атауы қай санатқа жатады?',
      en: 'Which category does this street name belong to?',
    },
    options: {
      ru: ['География Казахстана', 'Историческая личность', 'Природа', 'Литература и искусство'],
      kk: ['Қазақстан географиясы', 'Тарихи тұлға', 'Табиғат', 'Әдебиет және өнер'],
      en: ['Geography of Kazakhstan', 'A historical figure', 'Nature', 'Literature and art'],
    },
    answer_index: 1,
    explanation: {
      ru: 'Қабанбай батыр - реальный военачальник XVIII века, поэтому название относится к категории «Личности».',
      kk: 'Қабанбай батыр - XVIII ғасырдағы нақты қолбасшы, сондықтан атау «Тұлғалар» санатына жатады.',
      en: 'Qabanbay Batyr was a real eighteenth-century commander, so the name belongs to the "People" category.',
    },
  },
  {
    order: 3,
    street_slug: 'saryarka',
    question: {
      ru: 'С каким географическим понятием связано название улицы?',
      kk: 'Көше атауы қандай географиялық ұғыммен байланысты?',
      en: 'Which geographical concept is this street name tied to?',
    },
    options: {
      ru: [
        'С рекой в Восточном Казахстане',
        'С горным хребтом на юге страны',
        'Со степной областью в центре Казахстана',
        'С озером близ Астаны',
      ],
      kk: [
        'Шығыс Қазақстандағы өзенмен',
        'Елдің оңтүстігіндегі тау жотасымен',
        'Қазақстанның орталығындағы дала өлкесімен',
        'Астана маңындағы көлмен',
      ],
      en: [
        'A river in East Kazakhstan',
        'A mountain range in the south of the country',
        'A steppe region in the centre of Kazakhstan',
        'A lake near Astana',
      ],
    },
    answer_index: 2,
    explanation: {
      ru: 'Сарыарқа - историко-географическая область в центре Казахстана, Казахский мелкосопочник. Название переводится как «жёлтый хребет».',
      kk: 'Сарыарқа - Қазақстанның орталығындағы тарихи-географиялық өлке, Қазақтың ұсақ шоқысы. Атау «сары жон» деп аударылады.',
      en: 'Saryarqa is a historical and geographical region in central Kazakhstan, the Kazakh Uplands. The name translates as "yellow ridge".',
    },
  },
  {
    order: 4,
    street_slug: 'kenesary',
    question: {
      ru: 'Чем известен Кенесары Қасымұлы?',
      kk: 'Кенесары Қасымұлы немен белгілі?',
      en: 'What is Kenesary Qasymuly known for?',
    },
    options: {
      ru: [
        'Он был последним ханом и возглавил восстание 1837-1847 годов',
        'Он основал Казахское ханство',
        'Он был первым президентом Академии наук',
        'Он записал эпос «Манас»',
      ],
      kk: [
        'Ол соңғы хан болды және 1837-1847 жылдардағы көтерілісті басқарды',
        'Ол Қазақ хандығын құрды',
        'Ол Ғылым академиясының тұңғыш президенті болды',
        'Ол «Манас» эпосын жазып алды',
      ],
      en: [
        'He was the last khan and led the uprising of 1837-1847',
        'He founded the Kazakh Khanate',
        'He was the first president of the Academy of Sciences',
        'He recorded the epic "Manas"',
      ],
    },
    answer_index: 0,
    explanation: {
      ru: 'Кенесары - внук Абылай хана, избран ханом в 1841 году и возглавил самое длительное национально-освободительное восстание XIX века.',
      kk: 'Кенесары - Абылай ханның немересі, 1841 жылы хан болып сайланып, XIX ғасырдағы ең ұзақ ұлт-азаттық көтерілісті басқарды.',
      en: 'Kenesary, a grandson of Abylai Khan, was elected khan in 1841 and led the longest national liberation uprising of the nineteenth century.',
    },
  },
  {
    order: 5,
    street_slug: 'tauelsizdik',
    question: {
      ru: 'Какая дата связана с названием этого проспекта?',
      kk: 'Осы даңғылдың атауымен қандай күн байланысты?',
      en: 'Which date is tied to the name of this avenue?',
    },
    options: {
      ru: ['1 мая', '30 августа', '16 декабря', '9 мая'],
      kk: ['1 мамыр', '30 тамыз', '16 желтоқсан', '9 мамыр'],
      en: ['1 May', '30 August', '16 December', '9 May'],
    },
    answer_index: 2,
    explanation: {
      ru: '16 декабря 1991 года был принят конституционный закон «О государственной независимости Республики Казахстан». Эта же дата связана с событиями «Желтоқсан» 1986 года.',
      kk: '1991 жылдың 16 желтоқсанында «Қазақстан Республикасының мемлекеттік тәуелсіздігі туралы» конституциялық заң қабылданды. Дәл сол күн 1986 жылғы «Желтоқсан» оқиғаларымен де байланысты.',
      en: 'On 16 December 1991 the constitutional law "On the State Independence of the Republic of Kazakhstan" was adopted. The same date is tied to the "Zheltoqsan" events of 1986.',
    },
  },
  {
    order: 6,
    street_slug: 'ualikhanov',
    question: {
      ru: 'Чем занимался Шоқан Уәлиханов?',
      kk: 'Шоқан Уәлиханов немен айналысты?',
      en: 'What did Shoqan Ualikhanov do?',
    },
    options: {
      ru: [
        'Был композитором-кюйши',
        'Был учёным-востоковедом, географом и этнографом',
        'Командовал батальоном под Москвой',
        'Был бием Старшего жуза',
      ],
      kk: [
        'Күйші-композитор болды',
        'Шығыстанушы ғалым, географ және этнограф болды',
        'Мәскеу түбінде батальон басқарды',
        'Ұлы жүздің биі болды',
      ],
      en: [
        'He was a kuishi composer',
        'He was an orientalist scholar, geographer and ethnographer',
        'He commanded a battalion near Moscow',
        'He was a bi of the Senior Zhuz',
      ],
    },
    answer_index: 1,
    explanation: {
      ru: 'Уәлиханов - учёный, этнограф и географ, член Русского географического общества, совершивший экспедицию в Кашгар в 1858-1859 годах.',
      kk: 'Уәлиханов - ғалым, этнограф және географ, Орыс географиялық қоғамының мүшесі; 1858-1859 жылдары Қашқарға экспедиция жасады.',
      en: 'Ualikhanov was a scholar, ethnographer and geographer, a member of the Russian Geographical Society, who made an expedition to Kashgar in 1858-1859.',
    },
  },
  {
    order: 7,
    street_slug: 'korgalzhyn',
    question: {
      ru: 'Чем известен Коргалжынский заповедник?',
      kk: 'Қорғалжын қорығы немен белгілі?',
      en: 'What is the Korgalzhyn reserve known for?',
    },
    options: {
      ru: [
        'Это крупнейший горнолыжный курорт страны',
        'Это самое северное в мире место гнездования розового фламинго',
        'Это место добычи меди',
        'Это городище средневекового города',
      ],
      kk: [
        'Бұл елдегі ең ірі тау шаңғысы курорты',
        'Бұл - қызғылт фламингоның әлемдегі ең солтүстік ұя салу орны',
        'Бұл - мыс өндіру орны',
        'Бұл - ортағасырлық қаланың қалашығы',
      ],
      en: [
        'It is the country\'s largest ski resort',
        'It is the world\'s northernmost nesting site of the greater flamingo',
        'It is a copper mining site',
        'It is the site of a medieval city',
      ],
    },
    answer_index: 1,
    explanation: {
      ru: 'Озеро Тенгиз в Коргалжынском заповеднике - одно из самых северных мест гнездования розового фламинго. Заповедник входит в объект Всемирного наследия ЮНЕСКО «Сарыарка».',
      kk: 'Қорғалжын қорығындағы Теңіз көлі - қызғылт фламингоның ең солтүстік ұя салу орындарының бірі. Қорық ЮНЕСКО-ның «Сарыарқа» Дүниежүзілік мұра нысанына кіреді.',
      en: 'Lake Tengiz in the Korgalzhyn reserve is one of the northernmost nesting sites of the greater flamingo. The reserve is part of the UNESCO World Heritage property "Saryarka".',
    },
  },
  {
    order: 8,
    street_slug: 'mangilik-el',
    question: {
      ru: 'К какому историческому периоду восходит выражение «Мәңгілік Ел»?',
      kk: '«Мәңгілік Ел» тіркесі қай тарихи кезеңге барып тіреледі?',
      en: 'To which historical period does the phrase "Mangilik El" go back?',
    },
    options: {
      ru: [
        'К советскому периоду',
        'К древнетюркским руническим надписям VIII века',
        'К эпохе Казахского ханства XV века',
        'К 1991 году',
      ],
      kk: [
        'Кеңес кезеңіне',
        'VIII ғасырдағы көне түркі руна жазбаларына',
        'XV ғасырдағы Қазақ хандығы дәуіріне',
        '1991 жылға',
      ],
      en: [
        'The Soviet period',
        'Ancient Turkic runic inscriptions of the eighth century',
        'The era of the fifteenth-century Kazakh Khanate',
        'The year 1991',
      ],
    },
    answer_index: 1,
    explanation: {
      ru: 'Выражение связывают с орхонскими руническими памятниками VIII века в честь Күлтегіна и Білге кагана - древнейшими текстами на тюркском языке.',
      kk: 'Тіркесті VIII ғасырдағы Күлтегін мен Білге қаған құрметіне қойылған Орхон руна ескерткіштерімен - түркі тіліндегі ең көне мәтіндермен байланыстырады.',
      en: 'The phrase is connected with the eighth-century Orkhon runic monuments to Kultegin and Bilge Khagan - the oldest texts in a Turkic language.',
    },
  },
  {
    order: 9,
    street_slug: 'syganak',
    question: {
      ru: 'Что такое Сығанақ?',
      kk: 'Сығанақ дегеніміз не?',
      en: 'What was Syganak?',
    },
    options: {
      ru: [
        'Река на западе Казахстана',
        'Средневековый город на Сырдарье',
        'Горный массив в центре страны',
        'Имя батыра XVIII века',
      ],
      kk: [
        'Қазақстанның батысындағы өзен',
        'Сырдариядағы ортағасырлық қала',
        'Елдің орталығындағы тау массиві',
        'XVIII ғасырдағы батырдың есімі',
      ],
      en: [
        'A river in western Kazakhstan',
        'A medieval city on the Syr Darya',
        'A mountain range in the centre of the country',
        'The name of an eighteenth-century batyr',
      ],
    },
    answer_index: 1,
    explanation: {
      ru: 'Сығанақ - средневековый город на нижней Сырдарье, столица Ак-Орды, а затем один из политических центров Казахского ханства.',
      kk: 'Сығанақ - төменгі Сырдариядағы ортағасырлық қала, Ақ Орданың астанасы, кейін Қазақ хандығының саяси орталықтарының бірі.',
      en: 'Syganak was a medieval city on the lower Syr Darya, capital of the Aq Orda and later one of the political centres of the Kazakh Khanate.',
    },
  },
  {
    order: 10,
    street_slug: 'esil',
    question: {
      ru: 'Почему река Есіл важна для Астаны?',
      kk: 'Есіл өзені Астана үшін неліктен маңызды?',
      en: 'Why does the Esil river matter to Astana?',
    },
    options: {
      ru: [
        'Она делит город на правый и левый берег',
        'Она является границей с Россией',
        'Она впадает в Каспийское море',
        'На ней расположен Коргалжынский заповедник',
      ],
      kk: [
        'Ол қаланы оң және сол жағалауға бөледі',
        'Ол Ресеймен шекара болып табылады',
        'Ол Каспий теңізіне құяды',
        'Онда Қорғалжын қорығы орналасқан',
      ],
      en: [
        'It divides the city into a right and a left bank',
        'It forms the border with Russia',
        'It flows into the Caspian Sea',
        'The Korgalzhyn reserve lies on it',
      ],
    },
    answer_index: 0,
    explanation: {
      ru: 'Есіл (Ишим) делит Астану на правобережье и левобережье. На её берегу в 1830 году было основано укрепление Акмолинск, из которого вырос город.',
      kk: 'Есіл (Ишим) Астананы оң және сол жағалауға бөледі. Оның жағасында 1830 жылы қала өсіп шыққан Ақмола бекінісі салынды.',
      en: 'The Esil (Ishim) divides Astana into its right and left banks. The Akmolinsk fortification, from which the city grew, was founded on its bank in 1830.',
    },
  },
];
