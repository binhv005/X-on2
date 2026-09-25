import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const s3Idx = h.indexOf('id="section_811979064"');
const s4Idx = h.indexOf('id="section_456611305"');
console.log('Snippet between Section 811979064 and Our Reviews:');
console.log(h.slice(s3Idx, s3Idx + 3000));
