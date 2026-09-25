import fs from 'fs';
import path from 'path';

const postUrls = [
  { url: 'https://lalafolie.us/extra-long-handmade-nail-luxury/', slug: 'extra-long-handmade-nail-luxury' },
  { url: 'https://lalafolie.us/salon-quality-handmade-nails-reimagined-for-home/', slug: 'salon-quality-handmade-nails-reimagined-for-home' },
  { url: 'https://lalafolie.us/apply-gripx-nails/', slug: 'apply-gripx-nails' },
  { url: 'https://lalafolie.us/post-1/', slug: 'post-1' },
  { url: 'https://lalafolie.us/wholesale-signup/', slug: 'wholesale-signup' }
];

async function fetchPosts() {
  for (const p of postUrls) {
    const outFile = `scripts/crawl-cache/${p.slug}.html`;
    if (fs.existsSync(outFile)) continue;
    try {
      console.log('Fetching', p.url);
      const res = await fetch(p.url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (res.ok) {
        const text = await res.text();
        fs.writeFileSync(outFile, text);
        console.log('Saved', p.slug);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

fetchPosts();
