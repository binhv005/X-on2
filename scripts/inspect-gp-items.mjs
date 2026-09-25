import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf-8');
const relayIdx = html.indexOf('ux-relay-1325482574');
console.log(html.substring(relayIdx, relayIdx + 3000));
