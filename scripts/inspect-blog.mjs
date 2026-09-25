import fs from 'fs';

const blogHtml = fs.readFileSync('scripts/crawl-cache/blog.html', 'utf8');

// Find all links to posts or headings in blog
const linkRegex = /<a[^>]+href="(https:\/\/lalafolie\.us\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
let m;
const blogLinks = [];
while ((m = linkRegex.exec(blogHtml)) !== null) {
  const url = m[1];
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  if (url.includes('/202') || (!url.includes('/wp-') && !url.includes('/product') && !url.includes('/shop') && !url.includes('/about') && !url.includes('/contact') && text.length > 5)) {
    blogLinks.push({ url, text });
  }
}
console.log('Blog links:', blogLinks);

// Extract text blocks / paragraphs in blog
const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
const paragraphs = [];
while ((m = pRegex.exec(blogHtml)) !== null) {
  const t = m[1].replace(/<[^>]+>/g, '').trim();
  if (t.length > 30) paragraphs.push(t);
}
console.log('Blog paragraphs sample:', paragraphs.slice(0, 5));
