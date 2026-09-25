import fs from 'fs';
import path from 'path';

const mediaMap = JSON.parse(fs.readFileSync('src/data/media-map.json', 'utf8'));
const imageMap = mediaMap.imageMap;

function getLocalImg(src) {
  if (!src) return '/images/logolala.webp';
  let cleanSrc = src;
  if (cleanSrc.startsWith('//')) cleanSrc = 'https:' + cleanSrc;
  return imageMap[cleanSrc] || src;
}

// Parse products from shop.html or any html
function extractProductsFromHtml(html) {
  const products = [];
  // Flatsome product item pattern
  // <div class="col-inner"> ... <a href="https://lalafolie.us/product/..." ...
  const prodRegex = /<div class="[^"]*product-small[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
  let match;
  while ((match = prodRegex.exec(html)) !== null) {
    const block = match[1];
    const linkMatch = block.match(/href="(https:\/\/lalafolie\.us\/product\/[^"]+)"/);
    if (!linkMatch) continue;
    const url = linkMatch[1];
    const slug = url.replace('https://lalafolie.us/product/', '').replace(/\/$/, '');

    // Title
    const titleMatch = block.match(/class="woocommerce-loop-product__title[^"]*">\s*<a[^>]*>([\s\S]*?)<\/a>/) ||
                       block.match(/class="name product-title[^"]*">\s*<a[^>]*>([\s\S]*?)<\/a>/);
    const title = titleMatch ? titleMatch[1].trim() : slug;

    // Image
    const imgMatch = block.match(/<img[^>]+src="([^"]+)"/);
    const rawImg = imgMatch ? imgMatch[1] : '';
    const img = getLocalImg(rawImg);

    // Price
    const priceMatch = block.match(/<span class="price">([\s\S]*?)<\/span>/);
    let price = '';
    let originalPrice = '';
    if (priceMatch) {
      const pText = priceMatch[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      const amounts = pText.match(/\$[\d,.]+/g);
      if (amounts && amounts.length >= 2) {
        originalPrice = amounts[0];
        price = amounts[1];
      } else if (amounts && amounts.length === 1) {
        price = amounts[0];
      } else {
        price = pText;
      }
    }

    // Category / tag if available
    const catMatch = block.match(/class="category[^"]*">([\s\S]*?)<\/a>/);
    const category = catMatch ? catMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    // Check duplicate
    if (!products.some(p => p.slug === slug)) {
      products.push({
        id: slug,
        slug,
        title,
        price: price || '$19.99',
        originalPrice: originalPrice || undefined,
        image: img,
        rawImage: rawImg,
        category: category || 'Press-on Nails',
        url: `/product/${slug}`
      });
    }
  }
  return products;
}

const shopHtml = fs.readFileSync('scripts/crawl-cache/shop.html', 'utf8');
const homeHtml = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const catGripHtml = fs.readFileSync('scripts/crawl-cache/category-handmade-grip-x-nails.html', 'utf8');
const catBestHtml = fs.readFileSync('scripts/crawl-cache/category-best-seller.html', 'utf8');

const allProds = [
  ...extractProductsFromHtml(shopHtml),
  ...extractProductsFromHtml(homeHtml),
  ...extractProductsFromHtml(catGripHtml),
  ...extractProductsFromHtml(catBestHtml)
];

const uniqueProducts = [];
const seenSlugs = new Set();
for (const p of allProds) {
  if (!seenSlugs.has(p.slug)) {
    seenSlugs.add(p.slug);
    uniqueProducts.push(p);
  }
}

// Add the essential staple products if missing:
const stapleProducts = [
  {
    id: 'cold-gel-glue',
    slug: 'cold-gel-glue',
    title: 'Cold Gel Glue for Press-on Nails',
    price: '$12.99',
    originalPrice: '$15.99',
    image: '/images/logolala.webp',
    category: 'Cold Gel Glue',
    url: '/product/cold-gel-glue',
    description: 'Special formulation for long-lasting, damage-free press-on nail adhesion with cold gel technology.'
  },
  {
    id: 'remover',
    slug: 'remover',
    title: 'Cold Gel Remover Solution',
    price: '$9.99',
    originalPrice: '$12.99',
    image: '/images/logolala.webp',
    category: 'Cold Gel Remover',
    url: '/product/remover',
    description: 'Gentle and fast-acting remover solution designed specifically for cold gel adhesive.'
  }
];

stapleProducts.forEach(sp => {
  const existing = uniqueProducts.find(p => p.slug === sp.slug);
  if (!existing) {
    uniqueProducts.push(sp);
  } else {
    existing.description = sp.description;
  }
});

console.log(`Total extracted unique products: ${uniqueProducts.length}`);

// Fix image paths: if image starts with http and exists in local /images, ensure it points to local
uniqueProducts.forEach(p => {
  if (p.rawImage && imageMap[p.rawImage]) {
    p.image = imageMap[p.rawImage];
  }
});

fs.writeFileSync('src/data/products.json', JSON.stringify(uniqueProducts, null, 2), 'utf8');
console.log('Saved src/data/products.json');
