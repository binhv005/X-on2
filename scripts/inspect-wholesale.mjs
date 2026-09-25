import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/wholesale-signup.html', 'utf8');
const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
let m;
const ps = [];
while ((m = pRegex.exec(html)) !== null) {
  const t = m[1].replace(/<[^>]+>/g, '').trim();
  if (t.length > 20) ps.push(t);
}
console.log('Wholesale signup text:', ps);
