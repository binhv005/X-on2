import fs from 'fs';
import path from 'path';

const cacheDir = path.resolve('scripts/crawl-cache');
const publicDir = path.resolve('public');
const imgDir = path.resolve('public/images');
const videoDir = path.resolve('public/videos');
const dataDir = path.resolve('src/data');

[publicDir, imgDir, videoDir, dataDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const htmlFiles = fs.readdirSync(cacheDir).filter(f => f.endsWith('.html'));

const allImages = new Set();
const allVideos = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(cacheDir, file), 'utf8');

  // img tags
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    let src = match[1];
    if (src.startsWith('//')) src = 'https:' + src;
    if (src.startsWith('http')) allImages.add(src);
  }

  // srcset
  const srcsetRegex = /srcset=["']([^"']+)["']/g;
  while ((match = srcsetRegex.exec(content)) !== null) {
    const parts = match[1].split(',');
    for (const part of parts) {
      let src = part.trim().split(' ')[0];
      if (src.startsWith('//')) src = 'https:' + src;
      if (src.startsWith('http')) allImages.add(src);
    }
  }

  // background urls
  const bgRegex = /url\(["']?([^"')]+)["']?\)/g;
  while ((match = bgRegex.exec(content)) !== null) {
    let src = match[1];
    if (src.startsWith('//')) src = 'https:' + src;
    if (src.startsWith('http') && (src.includes('uploads') || src.endsWith('.webp') || src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg'))) {
      allImages.add(src);
    }
  }

  // video source tags
  const videoSrcRegex = /<source[^>]+src=["']([^"']+)["']/g;
  while ((match = videoSrcRegex.exec(content)) !== null) {
    let src = match[1];
    if (src.startsWith('//')) src = 'https:' + src;
    if (src.startsWith('http')) allVideos.add(src);
  }

  // direct video tags
  const directVideoRegex = /<video[^>]+src=["']([^"']+)["']/g;
  while ((match = directVideoRegex.exec(content)) !== null) {
    let src = match[1];
    if (src.startsWith('//')) src = 'https:' + src;
    if (src.startsWith('http')) allVideos.add(src);
  }
});

console.log(`Found ${allImages.size} unique images`);
console.log(`Found ${allVideos.size} unique videos:`, Array.from(allVideos));

// Filter out 1x1 tracking gifs or unrelated external ads
const validImages = Array.from(allImages).filter(url => {
  return url.includes('lalafolie.us') && !url.includes('s.w.org');
});

console.log(`Valid site images to download: ${validImages.length}`);

// Generate a mapping from URL -> filename
const imageMap = {};
validImages.forEach(url => {
  try {
    const u = new URL(url);
    const basename = path.basename(u.pathname);
    // sanitize
    const cleanName = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
    imageMap[url] = `/images/${cleanName}`;
  } catch (e) {}
});

const videoMap = {};
Array.from(allVideos).forEach(url => {
  try {
    const u = new URL(url);
    const basename = path.basename(u.pathname);
    const cleanName = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
    videoMap[url] = `/videos/${cleanName}`;
  } catch (e) {}
});

fs.writeFileSync(path.join(dataDir, 'media-map.json'), JSON.stringify({ imageMap, videoMap }, null, 2), 'utf8');

// Function to download with concurrency
async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    if (stats.size > 0) return; // already downloaded
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`[FAIL ${res.status}] ${url}`);
      return;
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    console.log(`[SAVED] ${path.basename(destPath)} (${arrayBuffer.byteLength} B)`);
  } catch (err) {
    console.warn(`[ERROR] ${url}: ${err.message}`);
  }
}

async function runDownloads() {
  console.log('Downloading videos...');
  for (const vUrl of allVideos) {
    const local = videoMap[vUrl];
    if (local) {
      await downloadFile(vUrl, path.join(publicDir, local.replace(/^\//, '')));
    }
  }

  console.log(`Downloading ${validImages.length} images...`);
  const concurrency = 8;
  const queue = [...validImages];
  
  async function worker() {
    while (queue.length > 0) {
      const imgUrl = queue.shift();
      if (!imgUrl) break;
      const local = imageMap[imgUrl];
      if (local) {
        await downloadFile(imgUrl, path.join(publicDir, local.replace(/^\//, '')));
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }).map(() => worker()));
  console.log('Downloads finished!');
}

runDownloads();
