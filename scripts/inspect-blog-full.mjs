import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/blog.html', 'utf-8');
const s = html.indexOf('<div id="content"');
const e = html.indexOf('</main>', s);
console.log(html.substring(s, e !== -1 ? e : s + 8000));
