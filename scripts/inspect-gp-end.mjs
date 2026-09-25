import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf-8');
const s = html.indexOf('</section>', html.indexOf('ux-relay-1325482574'));
console.log(html.substring(s - 2000, s));
