import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const idx = h.indexOf('SHOP US IRL');
console.log(h.slice(idx - 400, idx + 800));
