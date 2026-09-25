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

const posts = [
  { slug: 'extra-long-handmade-nail-luxury' },
  { slug: 'salon-quality-handmade-nails-reimagined-for-home' },
  { slug: 'apply-gripx-nails' },
  { slug: 'post-1' }
];

const parsedPosts = [];

posts.forEach(p => {
  const filePath = `scripts/crawl-cache/${p.slug}.html`;
  if (!fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleM = html.match(/<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/) ||
                 html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : p.slug;

  // Date
  const dateM = html.match(/<time[^>]*>([\s\S]*?)<\/time>/) ||
                html.match(/class="badge-date[^"]*">([\s\S]*?)<\/div>/);
  const date = dateM ? dateM[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'July 2026';

  // Image
  const imgM = html.match(/class="entry-image[^"]*"[\s\S]*?<img[^>]+src="([^"]+)"/) ||
               html.match(/<article[\s\S]*?<img[^>]+src="([^"]+)"/);
  const image = imgM ? getLocalImg(imgM[1]) : '/images/logolala.webp';

  // Article text content
  const articleM = html.match(/<div class="entry-content[^"]*">([\s\S]*?)<\/div>\s*<\/article>/) ||
                   html.match(/<div class="entry-content[^"]*">([\s\S]*?)<\/div>/);
  let paragraphs = [];
  if (articleM) {
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    let pm;
    while ((pm = pRegex.exec(articleM[1])) !== null) {
      const text = pm[1].replace(/<[^>]+>/g, '').trim();
      if (text.length > 20) paragraphs.push(text);
    }
  }

  parsedPosts.push({
    slug: p.slug,
    title,
    date,
    image,
    paragraphs,
    excerpt: paragraphs[0] || 'Discover the luxury and convenience of handmade salon-quality nails by Lalafolie.'
  });
});

console.log('Parsed posts:', parsedPosts.map(p => ({ title: p.title, pCount: p.paragraphs.length })));

const siteData = JSON.parse(fs.readFileSync('src/data/site-content.json', 'utf8'));
siteData.blogPosts = parsedPosts;
fs.writeFileSync('src/data/site-content.json', JSON.stringify(siteData, null, 2), 'utf8');
console.log('Updated site-content.json with full blog posts!');
