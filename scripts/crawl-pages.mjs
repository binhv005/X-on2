import fs from 'fs';
import path from 'path';

const pagesToFetch = [
  { url: 'https://lalafolie.us/', slug: 'home' },
  { url: 'https://lalafolie.us/shop/', slug: 'shop' },
  { url: 'https://lalafolie.us/about/', slug: 'about' },
  { url: 'https://lalafolie.us/contact-us/', slug: 'contact-us' },
  { url: 'https://lalafolie.us/sizing-chart/', slug: 'sizing-chart' },
  { url: 'https://lalafolie.us/blog/', slug: 'blog' },
  { url: 'https://lalafolie.us/bundle-and-save/', slug: 'bundle-and-save' },
  { url: 'https://lalafolie.us/gallery-product/', slug: 'gallery-product' },
  { url: 'https://lalafolie.us/product/cold-gel-glue/', slug: 'product-cold-gel-glue' },
  { url: 'https://lalafolie.us/product/remover/', slug: 'product-remover' },
  { url: 'https://lalafolie.us/product/cf-35-0961/', slug: 'product-cf-35-0961' },
  { url: 'https://lalafolie.us/product-category/product-type/handmade-grip-x-nails/', slug: 'category-handmade-grip-x-nails' },
  { url: 'https://lalafolie.us/product-category/product-type/best-seller/', slug: 'category-best-seller' },
  { url: 'https://lalafolie.us/privacy-policy/', slug: 'privacy-policy' },
  { url: 'https://lalafolie.us/terms/', slug: 'terms' }
];

const cacheDir = path.resolve('scripts/crawl-cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

async function fetchAll() {
  for (const p of pagesToFetch) {
    const outFile = path.join(cacheDir, `${p.slug}.html`);
    if (fs.existsSync(outFile)) {
      console.log(`Already cached: ${p.slug}`);
      continue;
    }
    console.log(`Fetching ${p.url}...`);
    try {
      const res = await fetch(p.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.warn(`Failed ${p.url}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(outFile, html, 'utf8');
      console.log(`Saved ${p.slug} (${html.length} bytes)`);
    } catch (err) {
      console.error(`Error fetching ${p.url}:`, err.message);
    }
  }
}

fetchAll();
