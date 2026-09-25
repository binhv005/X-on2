import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf-8');
const navIdx = html.indexOf('class="nav-pagination');
console.log(html.substring(navIdx, navIdx + 1500));
