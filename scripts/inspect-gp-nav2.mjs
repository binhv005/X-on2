import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf-8');
const s = html.indexOf('pagination');
console.log('first pagination occurrence:', s);
const s2 = html.indexOf('pagination', s + 20);
console.log('second pagination occurrence:', s2);
if (s2 !== -1) {
  console.log(html.substring(s2 - 50, s2 + 800));
}
