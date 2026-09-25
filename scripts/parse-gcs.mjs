import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/gallery-coming-soon.html', 'utf8');
const mediaMap = JSON.parse(fs.readFileSync('src/data/media-map.json', 'utf8'));
const imageMap = mediaMap.imageMap;

function getLocal(src) {
  if (!src) return '';
  let clean = src;
  if (clean.startsWith('//')) clean = 'https:' + clean;
  return imageMap[clean] || clean;
}

const tabIds = [
  'christmas-nail-collection',
  'fall-nail-collection',
  'halloween-nail-collection',
  'new-favourite-collection'
];

const tabData = {};

tabIds.forEach(id => {
  const panelRegex = new RegExp(`id="tab_${id}"[\\s\\S]*?<div class="panel entry-content[^"]*">([\\s\\S]*?)<\\/div>\\s*<\\/div>`);
  const match = html.match(panelRegex);
  const images = [];
  if (match) {
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    let im;
    while ((im = imgRegex.exec(match[1])) !== null) {
      if (im[1].includes('uploads')) {
        const local = getLocal(im[1]);
        if (local && !images.includes(local)) {
          images.push(local);
        }
      }
    }
  }
  tabData[id] = images;
  console.log(`Tab ${id}: ${images.length} images`);
});

fs.writeFileSync('src/data/gcs-tabs.json', JSON.stringify(tabData, null, 2), 'utf8');
console.log('Saved src/data/gcs-tabs.json');
