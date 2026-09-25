import fs from 'fs';

const html = fs.readFileSync('scripts/crawl-cache/bundle-and-save.html', 'utf-8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/g)];
console.log(`Found ${sections.length} sections in bundle-and-save.html`);
sections.forEach((s, i) => {
  console.log(`Section ${i}:`, s[0].substring(0, 300));
});

// Check if there is anything else in #content
const contentIdx = html.indexOf('<div id="content"');
const footerIdx = html.indexOf('<footer', contentIdx);
console.log('Content area without sections:', html.substring(contentIdx, footerIdx).replace(/<section[\s\S]*?<\/section>/g, '[SECTION]').trim());
