import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const s = html.indexOf('<div class="product-small col');
console.log(html.substring(s, s + 1500));
