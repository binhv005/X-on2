import fs from 'fs';
import path from 'path';

const contentPath = 'C:\\Users\\NGO TRAN VAN DIEM\\.gemini\\antigravity-ide\\brain\\f51f286d-1d47-4b83-9760-0d912a40379e\\.system_generated\\steps\\39\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Extract all hrefs
const hrefRegex = /href=["']([^"']+)["']/g;
const links = new Set();
let match;
while ((match = hrefRegex.exec(content)) !== null) {
  const url = match[1];
  if (url.includes('lalafolie.us') || url.startsWith('/')) {
    links.add(url);
  }
}

// Extract all images
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
const images = new Set();
while ((match = imgRegex.exec(content)) !== null) {
  images.add(match[1]);
}

// Extract srcset
const srcsetRegex = /srcset=["']([^"']+)["']/g;
while ((match = srcsetRegex.exec(content)) !== null) {
  const parts = match[1].split(',');
  for (const part of parts) {
    const src = part.trim().split(' ')[0];
    if (src) images.add(src);
  }
}

// Extract videos
const videoRegex = /<video[^>]*>([\s\S]*?)<\/video>/g;
const videoSrcRegex = /src=["']([^"']+)["']/g;
const videos = new Set();
while ((match = videoRegex.exec(content)) !== null) {
  let vMatch;
  while ((vMatch = videoSrcRegex.exec(match[1])) !== null) {
    videos.add(vMatch[1]);
  }
}

console.log('Internal links found:', Array.from(links));
console.log('Images found count:', images.size);
console.log('Videos found count:', videos.size);
