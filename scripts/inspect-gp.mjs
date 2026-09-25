import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf-8');
const s = html.indexOf('<div id="content"');
const e = html.indexOf('</main>', s);
console.log('Gallery Product length:', e - s);
// Let's see the structure inside
const content = html.substring(s, e !== -1 ? e : s + 20000);
console.log(content.substring(0, 3000));
