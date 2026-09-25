import fs from 'fs';

const contentPath = 'C:\\Users\\NGO TRAN VAN DIEM\\.gemini\\antigravity-ide\\brain\\f51f286d-1d47-4b83-9760-0d912a40379e\\.system_generated\\steps\\39\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Find all video sources
const videoSrcRegex = /<source[^>]+src=["']([^"']+)["']/g;
const videos = new Set();
let match;
while ((match = videoSrcRegex.exec(content)) !== null) {
  videos.add(match[1]);
}

// Also check <video src="...">
const directVideoRegex = /<video[^>]+src=["']([^"']+)["']/g;
while ((match = directVideoRegex.exec(content)) !== null) {
  videos.add(match[1]);
}

console.log('Videos found:', Array.from(videos));

// Check background images in styles
const bgRegex = /url\(["']?([^"')]+)["']?\)/g;
const bgImages = new Set();
while ((match = bgRegex.exec(content)) !== null) {
  if (match[1].startsWith('http') || match[1].includes('uploads') || match[1].endsWith('.png') || match[1].endsWith('.jpg') || match[1].endsWith('.webp') || match[1].endsWith('.mp4')) {
    bgImages.add(match[1]);
  }
}
console.log('Background / inline URL count:', bgImages.size);
console.log('Sample background URLs:', Array.from(bgImages).slice(0, 10));
