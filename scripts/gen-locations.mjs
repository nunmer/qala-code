import { readFileSync, writeFileSync } from 'node:fs';

const osm = JSON.parse(readFileSync('scripts/osm-astana.json', 'utf8'));

// slug -> точное имя улицы в OpenStreetMap
const TARGETS = {
  abay: 'Абай даңғылы',
  'kabanbay-batyr': 'Қабанбай Батыр даңғылы',
  kenesary: 'Кенесары көшесі',
  'baurzhan-momyshuly': 'Бауыржан Момышұлы даңғылы',
  'bogenbay-batyr': 'Бөгенбай Батыр даңғылы',
  'abylai-khan': 'Абылай Хан даңғылы',
  seyfullin: 'Сәкен Сейфуллин көшесі',
  auezov: 'Мұхтар Әуезов көшесі',
  zhambyl: 'Жамбыл Жабаев көшесі',
  altynsarin: 'Ыбырай Алтынсарин көшесі',
  ualikhanov: 'Шоқан Уәлиханов көшесі',
  satpayev: 'Қаныш Сәтбаев көшесі',
  konayev: 'Қонаев көшесі',
  imanov: 'Амангелді Иманов көшесі',
  koshkarbayev: 'Рақымжан Қошқарбаев даңғылы',
  pushkin: 'Пушкин көшесі',
  'kerey-zhanibek': 'Керей Және Жәнібек Хандар көшесі',
  'tole-bi': 'Төле Би көшесі',
  saryarka: 'Сарыарқа даңғылы',
  turan: 'Тұран даңғылы',
  'uly-dala': 'Ұлы Дала даңғылы',
  syganak: 'Сығанақ көшесі',
  sarayshyk: 'Сарайшық көшесі',
  ulytau: 'Ұлытау көшесі',
  akmeshit: 'Ақмешіт көшесі',
  orynbor: 'Орынбор көшесі',
  tauelsizdik: 'Тәуелсіздік даңғылы',
  'mangilik-el': 'Мәңгілік Ел даңғылы',
  zhenis: 'Жеңіс даңғылы',
  respublika: 'Республика даңғылы',
  beybitshilik: 'Бейбітшілік көшесі',
  dostyk: 'Достық көшесі',
  'kyz-zhibek': 'Қыз Жібек көшесі',
  'koblandy-batyr': 'Қобыланды Батыр көшесі',
  kurmangazy: 'Құрманғазы көшесі',
  korgalzhyn: 'Қорғалжын тас жолы',
  esil: 'Есіл көшесі',
  koktal: 'Көктал көшесі',
};

const segments = new Map();
for (const el of osm.elements) {
  const name = el.tags?.name;
  if (!name || !el.center) continue;
  if (!segments.has(name)) segments.set(name, []);
  segments.get(name).push(el);
}

const rows = [];
for (const [slug, osmName] of Object.entries(TARGETS)) {
  const found = segments.get(osmName);
  if (!found) {
    console.error(`НЕ НАЙДЕНО: ${slug} -> ${osmName}`);
    continue;
  }
  const lat = found.reduce((s, e) => s + e.center.lat, 0) / found.length;
  const lon = found.reduce((s, e) => s + e.center.lon, 0) / found.length;
  const tags = found[0].tags;
  rows.push({
    slug,
    osmName,
    nameRu: tags['name:ru'] ?? null,
    nameKk: tags['name:kk'] ?? osmName,
    segments: found.length,
    lat: Number(lat.toFixed(6)),
    lon: Number(lon.toFixed(6)),
  });
}

console.log(`разрешено ${rows.length} из ${Object.keys(TARGETS).length}`);
writeFileSync('scripts/locations.json', JSON.stringify(rows, null, 2));
for (const r of rows) console.log(`${r.slug.padEnd(20)} ${r.lat},${r.lon}  segs=${String(r.segments).padStart(3)}  ru=${r.nameRu ?? '—'}`);
