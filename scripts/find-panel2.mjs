import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/sizing-chart.html', 'utf8');
const p2 = h.indexOf('id="tab_length-details"');
if (p2 !== -1) {
  console.log(h.slice(p2, p2 + 800));
}
