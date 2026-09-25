import fs from 'fs';

const homeHtml = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');
const reviewIdx = homeHtml.indexOf('Our Reviews');
if (reviewIdx !== -1) {
  console.log('Context around Our Reviews:');
  console.log(homeHtml.slice(reviewIdx - 200, reviewIdx + 1500));
}

const blogHtml = fs.readFileSync('scripts/crawl-cache/blog.html', 'utf8');
console.log('Blog HTML snippet:');
console.log(blogHtml.slice(blogHtml.indexOf('<main'), blogHtml.indexOf('<main') + 1500));
