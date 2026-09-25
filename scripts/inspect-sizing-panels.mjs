import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/sizing-chart.html', 'utf8');

// Find all panels in sizing-chart
const panelRegex = /class="panel[^"]*"[\s\S]*?(?=<div class="panel|<\/section|<\/main)/g;
let m;
let i = 1;
while ((m = panelRegex.exec(h)) !== null) {
  console.log(`--- Panel ${i} ---`);
  console.log(m[0].slice(0, 1000));
  i++;
}
