import fs from 'fs';
import path from 'path';

const gcsTabs = JSON.parse(fs.readFileSync('src/data/gcs-tabs.json', 'utf8'));
const publicImgDir = path.resolve('public/images');

const allUrls = [];
for (const tabKey of Object.keys(gcsTabs)) {
  for (const img of gcsTabs[tabKey]) {
    if (img.startsWith('http')) {
      allUrls.push(img);
    }
  }
}

console.log(`Found ${allUrls.length} remote images in gcs-tabs`);

async function downloadFile(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function run() {
  const urlMap = {};
  for (const url of allUrls) {
    try {
      const u = new URL(url);
      const filename = path.basename(u.pathname).replace(/[^a-zA-Z0-9._-]/g, '_');
      const localPath = `/images/${filename}`;
      urlMap[url] = localPath;
      await downloadFile(url, path.join(publicImgDir, filename));
    } catch (e) {}
  }

  // Update gcsTabs
  for (const tabKey of Object.keys(gcsTabs)) {
    gcsTabs[tabKey] = gcsTabs[tabKey].map(img => urlMap[img] || img);
  }

  fs.writeFileSync('src/data/gcs-tabs.json', JSON.stringify(gcsTabs, null, 2), 'utf8');
  console.log('Updated gcs-tabs.json to 100% local paths!');
}

run();
