import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const s = html.indexOf('<div class="section-content');
console.log(html.substring(s, s + 2000));
