import fs from 'fs';

const shopHtml = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const mediaMap = JSON.parse(fs.readFileSync('src/data/media-map.json', 'utf8'));
const imageMap = mediaMap.imageMap;

// Find shapes
const shapeRegex = /<a[^>]+href="[^"]*nail-shape=([^"&]+)"[^>]*>([\s\S]*?)<\/a>/g;
let m;
const shapes = [];
while ((m = shapeRegex.exec(shopHtml)) !== null) {
  const name = m[1];
  const imgM = m[2].match(/src="([^"]+)"/);
  const titleM = m[2].match(/<span[^>]*>([\s\S]*?)<\/span>/) || m[2].match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/);
  shapes.push({
    shape: name,
    img: imgM ? (imageMap[imgM[1]] || imgM[1]) : '',
    title: titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : name
  });
}
console.log('Shapes found in shop:', shapes);

// Let's also check category boxes at top of shop
const catBoxRegex = /<div class="[^"]*category-box[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let cm;
const catBoxes = [];
while ((cm = catBoxRegex.exec(shopHtml)) !== null) {
  catBoxes.push(cm[0].slice(0, 300));
}
console.log('Category boxes count:', catBoxes.length);
if (catBoxes.length > 0) console.log(catBoxes[0]);
