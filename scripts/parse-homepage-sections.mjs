import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');

// Find all banner elements
const bannerMatches = [];
const bRegex = /<div[^>]*class="[^"]*banner[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
while ((m = bRegex.exec(html)) !== null) {
  bannerMatches.push(m[0].slice(0, 500));
}
console.log('Banners found:', bannerMatches.length);

// Find video banners
const videoBanners = [];
const vbRegex = /<div[^>]*class="[^"]*banner[^"]*has-video[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
while ((m = vbRegex.exec(html)) !== null) {
  videoBanners.push(m[0]);
}
console.log('Video banners found:', videoBanners.length);

// Extract headings h1, h2, h3, h4
const hRegex = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/g;
const headings = [];
while ((m = hRegex.exec(html)) !== null) {
  headings.push({ tag: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
}
console.log('Headings:', headings);

// Extract row sliders or product carousels on homepage
const sliderRegex = /<div[^>]*class="[^"]*slider[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
const sliders = [];
while ((m = sliderRegex.exec(html)) !== null) {
  sliders.push(m[0].slice(0, 300));
}
console.log('Sliders found:', sliders.length);
