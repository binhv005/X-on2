import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const p1Idx = html.indexOf('product-title woocommerce-loop-product__title');
console.log(html.substring(p1Idx + 200, p1Idx + 500));
