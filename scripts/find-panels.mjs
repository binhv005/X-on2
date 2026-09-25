import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/gallery-coming-soon.html', 'utf8');
const p1 = h.indexOf('id="tab_christmas-nail-collection"');
console.log('Panel 1 index:', p1);
if (p1 !== -1) {
  console.log(h.slice(p1, p1 + 500));
} else {
  // Search for tab_
  const allTabs = [];
  const regex = /id=["'](tab_[^"']+)["']/g;
  let m;
  while ((m = regex.exec(h)) !== null) {
    allTabs.push(m[1]);
  }
  console.log('All tab IDs found:', allTabs);
}
