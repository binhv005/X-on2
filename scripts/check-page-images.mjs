import fs from 'fs';
import path from 'path';

const pages = ['about.html', 'blog.html', 'bundle-and-save.html', 'gallery-product.html'];
const allUrls = new Set();

for (const p of pages) {
  const html = fs.readFileSync(`scripts/crawl-cache/${p}`, 'utf-8');
  const matches = [...html.matchAll(/https:\/\/lalafolie\.us\/wp-content\/uploads\/[^\s"'>)]+/g)];
  for (const m of matches) {
    let clean = m[0].split('?')[0];
    allUrls.add(clean);
  }
}

console.log(`Found ${allUrls.size} unique image URLs across the 4 pages.`);

const missing = [];
for (const u of allUrls) {
  const filename = path.basename(new URL(u).pathname);
  const localPath = path.join('public', 'images', filename);
  if (!fs.existsSync(localPath)) {
    missing.push({ url: u, filename, localPath });
  }
}

console.log(`Missing images: ${missing.length}`);
fs.writeFileSync('scripts/missing-page-images.json', JSON.stringify(missing, null, 2));
