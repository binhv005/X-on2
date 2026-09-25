import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const s = html.indexOf('id="section_1675240544"');
console.log(html.substring(s - 50, s + 4000));
