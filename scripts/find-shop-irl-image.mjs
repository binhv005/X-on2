import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const idx = h.indexOf('SHOP US IRL');
console.log('SHOP US IRL context:');
console.log(h.slice(idx - 600, idx + 1000));
