import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const mediaMap = JSON.parse(fs.readFileSync('src/data/media-map.json', 'utf8')).imageMap;
const idx = h.indexOf('category-wrap');
const chunk = h.slice(idx, idx + 3500);

const regex = /<a class="shape-item"[^>]*href="([^"]+)">\s*<img src="([^"]+)" alt="([^"]*)">\s*<span>([^<]+)<\/span>\s*<\/a>/g;
let m;
const list = [];
while ((m = regex.exec(chunk)) !== null) {
  let imgSrc = m[2];
  if (imgSrc.startsWith('//')) imgSrc = 'https:' + imgSrc;
  list.push({
    url: m[1].replace('https://lalafolie.us', ''),
    img: mediaMap[imgSrc] || imgSrc,
    name: m[4].trim()
  });
}

console.log('Shapes list:', list);
fs.writeFileSync('src/data/shop-shapes.json', JSON.stringify(list, null, 2), 'utf8');
