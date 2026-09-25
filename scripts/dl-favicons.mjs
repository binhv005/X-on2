import fs from 'fs';
import https from 'https';
import path from 'path';

const missing = JSON.parse(fs.readFileSync('scripts/missing-page-images.json', 'utf-8'));

for (const item of missing) {
  const file = fs.createWriteStream(item.localPath);
  https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded:', item.filename);
    });
  }).on('error', (err) => {
    fs.unlink(item.localPath, () => {});
    console.error('Error downloading:', item.filename, err.message);
  });
}
