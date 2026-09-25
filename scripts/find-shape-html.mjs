import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const idx = h.indexOf('class="shape-category-wrap"');
console.log('HTML shape-category-wrap index:', idx);
if (idx !== -1) {
  console.log(h.slice(idx, idx + 1500));
}
