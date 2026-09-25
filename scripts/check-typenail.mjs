import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const idx = h.indexOf('class="typenail"');
console.log(h.slice(idx, idx + 1000));
