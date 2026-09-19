// Разовый исследовательский скрипт: выгружает реальную геометрию
// именованных улиц Астаны из OpenStreetMap через Overpass API.
import { writeFileSync } from 'node:fs';

const QUERY = `[out:json][timeout:90];
area["name"="Астана"]["admin_level"="4"]->.a;
way["highway"]["name"](area.a);
out tags center;`;

const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'qala-code-research/0.1 (educational project)',
  },
  body: new URLSearchParams({ data: QUERY }),
});

console.log('status', response.status);
const json = await response.json();
console.log('elements', json.elements?.length);
writeFileSync('scripts/osm-astana.json', JSON.stringify(json));
