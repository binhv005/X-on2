import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const s3Idx = h.indexOf('id="section_811979064"');
const s4Idx = h.indexOf('id="section_456611305"');
const between = h.slice(s3Idx, s4Idx);

// Look for h1, h2, h3 in between
const hRegex = /<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/g;
let m;
while ((m = hRegex.exec(between)) !== null) {
  console.log(`${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
}
