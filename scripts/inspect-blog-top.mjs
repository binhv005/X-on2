import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/blog.html', 'utf-8');
const s = html.indexOf('<div id="content"');
const s2 = html.indexOf('<section class="section"', s);
console.log(html.substring(s, s2));
