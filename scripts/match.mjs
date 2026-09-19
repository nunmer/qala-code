import { readFileSync } from 'node:fs';

const osm = JSON.parse(readFileSync('scripts/osm-astana.json', 'utf8'));

// Собираем сегменты одной улицы вместе: у магистрали десятки way-ов.
const byName = new Map();
for (const el of osm.elements) {
  const t = el.tags ?? {};
  const names = [t.name, t['name:ru'], t['name:kk'], t['name:en']].filter(Boolean);
  if (!el.center) continue;
  for (const n of names) {
    if (!byName.has(n)) byName.set(n, []);
    byName.get(n).push({ lat: el.center.lat, lon: el.center.lon, tags: t });
  }
}

const needles = process.argv.slice(2);
for (const needle of needles) {
  const hits = [...byName.keys()].filter((n) => n.toLowerCase().includes(needle.toLowerCase()));
  console.log(`\n### ${needle}`);
  for (const h of hits.slice(0, 6)) {
    const segs = byName.get(h);
    const lat = segs.reduce((s, x) => s + x.lat, 0) / segs.length;
    const lon = segs.reduce((s, x) => s + x.lon, 0) / segs.length;
    const t = segs[0].tags;
    console.log(`  "${h}" segs=${segs.length} center=${lat.toFixed(6)},${lon.toFixed(6)} kk=${t['name:kk'] ?? '-'} ru=${t['name:ru'] ?? '-'}`);
  }
  if (hits.length === 0) console.log('  — не найдено');
}
