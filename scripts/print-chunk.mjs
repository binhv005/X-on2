import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const idx = h.indexOf('category-wrap');
console.log(h.slice(idx, idx + 1000));
