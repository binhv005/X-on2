import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const s = html.indexOf('<section class="section"');
const e = html.indexOf('</section>', s);
console.log(html.substring(s, e + 10));
