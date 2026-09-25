import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/home.html', 'utf-8');
const idx = html.indexOf('id="main-menu"');
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1500));
} else {
  console.log('not found');
}
