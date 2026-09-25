import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const s2Idx = h.indexOf('id="section_2029203770"');
console.log('Section 2:');
console.log(h.slice(s2Idx, s2Idx + 4000));
