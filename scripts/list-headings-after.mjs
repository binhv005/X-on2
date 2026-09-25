import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const s4Idx = h.indexOf('id="section_456611305"');
const after = h.slice(s4Idx);

const hRegex = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/g;
let m;
while ((m = hRegex.exec(after)) !== null) {
  console.log(`${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
}
