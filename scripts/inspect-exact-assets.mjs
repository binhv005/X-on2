import fs from 'fs';

const homeHtml = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');

// Find storefront banner image
const bannerMatch = homeHtml.match(/<div class="banner-bg fill"[^>]*>([\s\S]*?)<\/div>/g);
console.log('Home banner-bg matches:', bannerMatch?.slice(0, 5));

// Find 3 feature cards
const colMatch = homeHtml.match(/COLD GEL GLUE[\s\S]{1,500}HOW TO REMOVE/);
if (colMatch) {
  console.log('3-Cards snippet:', colMatch[0].slice(0, 1000));
}

// Find shop shape icons in shop.html
const shopHtml = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const shapeMatch = shopHtml.match(/Almond[\s\S]{1,1000}Stiletto/);
if (shapeMatch) {
  console.log('Shop shapes snippet:', shapeMatch[0].slice(0, 800));
}

// Find gallery coming soon tabs & images
const gcsHtml = fs.readFileSync('scripts/crawl-cache/gallery-coming-soon.html', 'utf8');
const tabMatches = gcsHtml.match(/<li[^>]*class="tab[^"]*"[^>]*>([\s\S]*?)<\/li>/g);
console.log('Gallery coming soon tabs:', tabMatches);

// Extract all images in gallery-coming-soon
const gcsImgs = [];
const imgRegex = /<img[^>]+src="([^"]+)"/g;
let m;
while ((m = imgRegex.exec(gcsHtml)) !== null) {
  if (m[1].includes('uploads')) gcsImgs.push(m[1]);
}
console.log('Gallery coming soon images count:', gcsImgs.length);
console.log('Sample GCS images:', gcsImgs.slice(0, 5));
