import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/gallery-coming-soon.html', 'utf8');
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

const results = {};

tabIds.forEach(id => {
  const startTag = `id="tab_${id}"`;
  const startIdx = h.indexOf(startTag);
  if (startIdx === -1) {
    results[id] = [];
    return;
  }
  // Find next tab or end of tab-panels
  let endIdx = h.length;
  tabIds.forEach(otherId => {
    if (otherId !== id) {
      const oIdx = h.indexOf(`id="tab_${otherId}"`, startIdx + startTag.length);
      if (oIdx !== -1 && oIdx < endIdx) {
        endIdx = oIdx;
      }
    }
  });

  const chunk = h.slice(startIdx, endIdx);
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let im;
  const imgs = [];
  while ((im = imgRegex.exec(chunk)) !== null) {
    if (im[1].includes('uploads')) {
      const local = getLocal(im[1]);
      if (local && !imgs.includes(local)) {
        imgs.push(local);
      }
    }
  }
  results[id] = imgs;
  console.log(`Tab ${id} has ${imgs.length} images`);
});

fs.writeFileSync('src/data/gcs-tabs.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved src/data/gcs-tabs.json');
