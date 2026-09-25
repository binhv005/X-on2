import fs from 'fs';
import path from 'path';

async function download() {
  const url = 'https://lalafolie.us/wp-content/uploads/2026/07/1-2.png';
  const dest = 'public/images/1-2.png';
  console.log('Downloading 1-2.png...');
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved 1-2.png successfully! Size: ${buf.length} bytes`);
  } else {
    console.error('Failed to download:', res.status);
  }
}

download();
