import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/home.html', 'utf-8');
const s = html.indexOf('id="main-menu"');
console.log(html.substring(s, s + 2000));
