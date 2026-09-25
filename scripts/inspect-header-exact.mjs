import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const headerIdx = h.indexOf('<header id="header"');
const headerEnd = h.indexOf('</header>');
console.log('Exact Header HTML:');
console.log(h.slice(headerIdx, headerEnd + 9));
