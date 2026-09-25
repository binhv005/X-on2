import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/sizing-chart.html', 'utf8');
const regex = /id=["'](tab_[^"']+)["']/g;
let m;
while ((m = regex.exec(h)) !== null) {
  console.log(m[1]);
}

// Also print the panels
const panels = h.match(/<div id="tab_[^"]*"[\s\S]*?(?=<div id="tab_|<\/div>\s*<\/div>\s*<\/div>\s*<\/section)/g);
if (panels) {
  panels.forEach((p, idx) => {
    console.log(`=== Panel ${idx} ===`);
    console.log(p.slice(0, 500));
  });
}
