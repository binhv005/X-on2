import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');

// Find first section after header
const mainIdx = h.indexOf('<main id="main"');
console.log('Main snippet:');
console.log(h.slice(mainIdx, mainIdx + 3000));
