import fs from 'fs';

const homeHtml = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const templateMatch = homeHtml.match(/<template id="trustindex-google-widget-html">([\s\S]*?)<\/template>/);
if (templateMatch) {
  const tHtml = templateMatch[1];
  const itemRegex = /<div[^>]*class="[^"]*ti-review-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
  let m;
  const reviews = [];
  while ((m = itemRegex.exec(tHtml)) !== null) {
    const block = m[1];
    const nameMatch = block.match(/<div class="ti-name">([\s\S]*?)<\/div>/);
    const textMatch = block.match(/<div class="ti-review-text[^"]*">([\s\S]*?)<\/div>/) ||
                      block.match(/<div class="ti-review-content">([\s\S]*?)<\/div>/);
    const dateMatch = block.match(/<div class="ti-date">([\s\S]*?)<\/div>/);

    const name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, '').trim() : 'Google Reviewer';
    let text = textMatch ? textMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    // clean text
    text = text.replace(/Read more/g, '').trim();

    if (text && text.length > 5) {
      reviews.push({
        author: name,
        text,
        date: dateMatch ? dateMatch[1].replace(/<[^>]+>/g, '').trim() : 'Recently',
        rating: 5
      });
    }
  }
  console.log('Extracted reviews count:', reviews.length);
  console.log('Sample reviews:', reviews.slice(0, 5));

  // Update site-content.json
  const siteData = JSON.parse(fs.readFileSync('src/data/site-content.json', 'utf8'));
  siteData.reviews = reviews;
  fs.writeFileSync('src/data/site-content.json', JSON.stringify(siteData, null, 2), 'utf8');
}
