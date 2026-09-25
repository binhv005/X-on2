import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/home.html', 'utf-8');
const s = html.indexOf('id="main-menu"');
console.log(html.substring(s + 1500, s + 3500));
