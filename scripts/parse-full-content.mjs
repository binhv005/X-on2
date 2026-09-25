import fs from 'fs';
import path from 'path';

const mediaMap = JSON.parse(fs.readFileSync('src/data/media-map.json', 'utf8'));
const imageMap = mediaMap.imageMap;
const videoMap = mediaMap.videoMap;

function getLocalImg(src) {
  if (!src) return '/images/logolala.webp';
  let cleanSrc = src;
  if (cleanSrc.startsWith('//')) cleanSrc = 'https:' + cleanSrc;
  return imageMap[cleanSrc] || src;
}

function getLocalVideo(src) {
  if (!src) return '';
  let cleanSrc = src;
  if (cleanSrc.startsWith('//')) cleanSrc = 'https:' + cleanSrc;
  return videoMap[cleanSrc] || src;
}

// 1. REVIEWS
const homeHtml = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const reviewRegex = /<div class="testimonial-box[^"]*">([\s\S]*?)<\/div>\s*<\/div>/g;
const reviews = [];
let match;
while ((match = reviewRegex.exec(homeHtml)) !== null) {
  const block = match[1];
  const textMatch = block.match(/<div class="testimonial-text[^"]*">([\s\S]*?)<\/div>/);
  const authorMatch = block.match(/<strong class="testimonial-name[^"]*">([\s\S]*?)<\/strong>/);
  const cityMatch = block.match(/<span class="testimonial-company[^"]*">([\s\S]*?)<\/span>/);
  const imgMatch = block.match(/<img[^>]+src="([^"]+)"/);

  const text = textMatch ? textMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const author = authorMatch ? authorMatch[1].replace(/<[^>]+>/g, '').trim() : 'Verified Customer';
  const city = cityMatch ? cityMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const image = imgMatch ? getLocalImg(imgMatch[1]) : '';

  if (text) {
    reviews.push({ text, author, city, image, rating: 5 });
  }
}

// 2. VIDEO BANNERS ON HOME
// Let's inspect video elements in homeHtml
const videoRegex = /<div[^>]*class="[^"]*banner[^"]*has-video[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
const homeVideos = [];
while ((match = videoRegex.exec(homeHtml)) !== null) {
  const block = match[0];
  const srcMatch = block.match(/src="([^"]+\.mp4[^"]*)"/);
  const linkMatch = block.match(/href="([^"]+)"/);
  const titleMatch = block.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/);
  const textMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/);

  if (srcMatch) {
    homeVideos.push({
      videoSrc: getLocalVideo(srcMatch[1]),
      link: linkMatch ? linkMatch[1].replace('https://lalafolie.us', '') || '/' : '/',
      title: titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '',
      description: textMatch ? textMatch[1].replace(/<[^>]+>/g, '').trim() : ''
    });
  }
}

// 3. ABOUT CONTENT
let aboutContent = {};
if (fs.existsSync('scripts/crawl-cache/about.html')) {
  const aboutHtml = fs.readFileSync('scripts/crawl-cache/about.html', 'utf8');
  const mainMatch = aboutHtml.match(/<div class="page-inner">([\s\S]*?)<\/main>/) ||
                    aboutHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/) ||
                    aboutHtml.match(/<div id="content"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
  
  // Extract images in about
  const aboutImgs = [];
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let im;
  if (mainMatch) {
    while ((im = imgRegex.exec(mainMatch[1])) !== null) {
      aboutImgs.push(getLocalImg(im[1]));
    }
  }

  aboutContent = {
    title: 'About Lalafolie',
    images: aboutImgs
  };
}

// 4. SIZING CHART CONTENT
let sizingChart = {};
if (fs.existsSync('scripts/crawl-cache/sizing-chart.html')) {
  const sizingHtml = fs.readFileSync('scripts/crawl-cache/sizing-chart.html', 'utf8');
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let im;
  const sizingImages = [];
  while ((im = imgRegex.exec(sizingHtml)) !== null) {
    if (im[1].includes('uploads')) {
      sizingImages.push(getLocalImg(im[1]));
    }
  }
  sizingChart = {
    title: 'Nail Sizing Guide & Chart',
    images: sizingImages
  };
}

// 5. BLOG POSTS
let blogPosts = [];
if (fs.existsSync('scripts/crawl-cache/blog.html')) {
  const blogHtml = fs.readFileSync('scripts/crawl-cache/blog.html', 'utf8');
  const postRegex = /<article[^>]*>([\s\S]*?)<\/article>/g;
  let pm;
  while ((pm = postRegex.exec(blogHtml)) !== null) {
    const b = pm[1];
    const titleM = b.match(/<h2 class="[^"]*entry-title[^"]*">\s*<a[^>]*>([\s\S]*?)<\/a>/) ||
                   b.match(/<h[1-3][^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/);
    const linkM = b.match(/href="(https:\/\/lalafolie\.us\/[^"]+)"/);
    const dateM = b.match(/class="badge-date[^"]*">([\s\S]*?)<\/div>/) || b.match(/<time[^>]*>([\s\S]*?)<\/time>/);
    const excerptM = b.match(/<div class="entry-summary[^"]*">([\s\S]*?)<\/div>/) || b.match(/<p>([\s\S]*?)<\/p>/);
    const imgM = b.match(/<img[^>]+src="([^"]+)"/);

    if (titleM) {
      blogPosts.push({
        title: titleM[1].replace(/<[^>]+>/g, '').trim(),
        url: linkM ? linkM[1].replace('https://lalafolie.us', '') : '#',
        date: dateM ? dateM[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'Recent',
        excerpt: excerptM ? excerptM[1].replace(/<[^>]+>/g, '').trim() : '',
        image: imgM ? getLocalImg(imgM[1]) : '/images/logolala.webp'
      });
    }
  }
}

// 6. GALLERY PRODUCTS
let galleryItems = [];
if (fs.existsSync('scripts/crawl-cache/gallery-product.html')) {
  const galleryHtml = fs.readFileSync('scripts/crawl-cache/gallery-product.html', 'utf8');
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let im;
  while ((im = imgRegex.exec(galleryHtml)) !== null) {
    if (im[1].includes('uploads')) {
      const local = getLocalImg(im[1]);
      if (!galleryItems.includes(local)) {
        galleryItems.push(local);
      }
    }
  }
}

const siteData = {
  reviews,
  homeVideos,
  aboutContent,
  sizingChart,
  blogPosts,
  galleryItems,
  categories: [
    {
      id: 'handmade-grip-x-nails',
      name: 'Handmade Grip-X Nails',
      slug: 'handmade-grip-x-nails',
      url: '/product-category/product-type/handmade-grip-x-nails',
      description: 'Exclusive handmade press-on nails with patented Grip-X technology for natural feel and durability.'
    },
    {
      id: 'cold-gel-glue',
      name: 'Cold Gel Glue',
      slug: 'cold-gel-glue',
      url: '/product-category/product-type/cold-gel-glue',
      description: 'Next generation cold gel nail glue. Strong hold, non-damaging, easy application.'
    },
    {
      id: 'cold-gel-remover',
      name: 'Cold Gel Remover',
      slug: 'cold-gel-remover',
      url: '/product-category/product-type/cold-gel-remover',
      description: 'Gentle, fast-acting remover formula for safe nail removal without soaking in harsh acetone.'
    },
    {
      id: 'best-seller',
      name: 'Best Seller',
      slug: 'best-seller',
      url: '/product-category/product-type/best-seller',
      description: 'Our top-rated and trending styles loved by thousands of nail enthusiasts.'
    },
    {
      id: '3d',
      name: '3D Theme',
      slug: '3d',
      url: '/product-category/design-theme/3d',
      description: 'Intricate 3D sculpted nail art, pearls, gemstones and luxury textures.'
    },
    {
      id: 'flower',
      name: 'Flower Theme',
      slug: 'flower',
      url: '/product-category/design-theme/flower',
      description: 'Delicate floral patterns, hand-painted blossoms and botanical accents.'
    },
    {
      id: 'y2k',
      name: 'Y2K Theme',
      slug: 'y2k',
      url: '/product-category/design-theme/y2k',
      description: 'Vibrant cyberpunk, chrome, futuristic aesthetic inspired by 2000s fashion.'
    },
    {
      id: 'bundle-and-save',
      name: 'Bundle & Save',
      slug: 'bundle-and-save',
      url: '/bundle-and-save',
      description: 'Exclusive combo packs and bundle discounts for the ultimate nail collection.'
    }
  ]
};

fs.writeFileSync('src/data/site-content.json', JSON.stringify(siteData, null, 2), 'utf8');
console.log('Site content saved. Reviews:', reviews.length, 'Videos:', homeVideos.length, 'Blog posts:', blogPosts.length, 'Gallery items:', galleryItems.length);
