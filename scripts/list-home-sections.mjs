import fs from 'fs';

const h = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');

// List all sections after section_2029203770
const rest = h.slice(h.indexOf('id="section_2029203770"') + 4000);
const sectionRegex = /<section[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
let m;
while ((m = sectionRegex.exec(rest)) !== null) {
  const sId = m[1];
  const sContent = m[2];
  const h1M = sContent.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/);
  console.log(`Section ${sId}: ${h1M ? h1M[1].replace(/<[^>]+>/g, '').trim() : 'No heading'}`);
}
