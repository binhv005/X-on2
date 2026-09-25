import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/sizing-chart.html', 'utf8');

// Find headings, tabs, images
const tabs = [];
const tabRegex = /<li[^>]*class="tab[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let m;
while ((m = tabRegex.exec(h)) !== null) {
  tabs.push(m[1].replace(/<[^>]+>/g, '').trim());
}
console.log('Sizing chart tabs:', tabs);

// Find all images in sizing-chart
const imgRegex = /<img[^>]+src="([^"]+)"/g;
const imgs = [];
while ((m = imgRegex.exec(h)) !== null) {
  if (m[1].includes('uploads')) imgs.push(m[1]);
}
console.log('Sizing chart images count:', imgs.length);
console.log('Sizing chart images:', imgs);

// Find main content block
const contentIdx = h.indexOf('id="content"');
if (contentIdx !== -1) {
  console.log('Content block snippet:');
  console.log(h.slice(contentIdx, contentIdx + 2000));
}
