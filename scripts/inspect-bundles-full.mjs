import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const s = html.indexOf('<div class="shop-container"');
const e = html.indexOf('</main>', s !== -1 ? s : 0);
console.log('BUNDLE AND SAVE HTML:');
console.log(html.substring(s !== -1 ? s : html.indexOf('<main id="main"'), e !== -1 ? e : undefined));
