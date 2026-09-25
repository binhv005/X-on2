import fs from 'fs';

const page = process.argv[2] || 'about.html';
const html = fs.readFileSync(`scripts/crawl-cache/${page}`, 'utf-8');
const start = html.indexOf('<main id="main"');
const end = html.indexOf('</main>', start);
console.log(html.substring(start, end !== -1 ? end + 7 : start + 3000));
