import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const sbIdx = h.indexOf('class="shop-sidebar');
console.log('shop-sidebar index:', sbIdx);
if (sbIdx !== -1) {
  console.log(h.slice(sbIdx, sbIdx + 2000));
} else {
  // Check any sidebar
  const anySb = h.indexOf('id="secondary"');
  if (anySb !== -1) console.log(h.slice(anySb, anySb + 2000));
}
