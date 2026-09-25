import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const pIdx = h.indexOf('Filter by price');
console.log('Filter by price index:', pIdx);
if (pIdx !== -1) {
  console.log(h.slice(pIdx - 100, pIdx + 1500));
} else {
  const cIdx = h.indexOf('Baby Blue');
  console.log('Baby Blue index:', cIdx);
  if (cIdx !== -1) console.log(h.slice(cIdx - 100, cIdx + 1500));
}
