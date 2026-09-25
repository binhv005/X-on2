import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf-8');
const regex = /<div class="product-small col[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;

const items = [];
let match;
while ((match = regex.exec(html)) !== null) {
  const block = match[1];
  const imgMatch = block.match(/src="([^"]+)"/);
  const linkMatch = block.match(/<a href="([^"]+)"/);
  const altMatch = block.match(/alt="([^"]*)"/);
  const sizes = [...block.matchAll(/class="size-(?:in|out)-stock">([^<]+)<\/span>/g)].map(m => m[1]);

  if (imgMatch) {
    const rawUrl = imgMatch[1];
    const filename = path.basename(new URL(rawUrl).pathname);
    items.push({
      image: `/images/${filename}`,
      title: altMatch ? altMatch[1] : filename,
      link: linkMatch ? linkMatch[1] : '/shop',
      sizes: sizes.length ? sizes : ['S', 'M', 'L'],
    });
  }
}

console.log(`Parsed ${items.length} items from gallery-product.html`);
console.log('Sample item:', items[0]);
fs.writeFileSync('src/data/gallery-product.json', JSON.stringify(items, null, 2));
