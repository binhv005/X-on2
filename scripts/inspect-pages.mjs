import fs from 'fs';

function extractMain(file) {
  const html = fs.readFileSync(`scripts/crawl-cache/${file}`, 'utf-8');
  console.log(`\n=================== ${file} ===================`);
  
  // Find <title>
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');

  // Find <main id="main" ...> ... </main>
  const mainStart = html.indexOf('<main id="main"');
  if (mainStart === -1) {
    console.log('No <main id="main"> found');
    return;
  }
  const mainEnd = html.indexOf('</main>', mainStart);
  const mainContent = html.substring(mainStart, mainEnd !== -1 ? mainEnd : mainStart + 10000);
  
  // find sections, headers, images, classes
  console.log('Length of main:', mainContent.length);
  
  // Look for sections or divs inside
  const sections = mainContent.match(/<section[^>]*>|<div id="content"[^>]*>|<div class="container[^"]*"[^>]*>/gi);
  console.log('Sections/Containers found:', sections ? sections.slice(0, 10) : 'none');

  // Look for headings
  const headings = [...mainContent.matchAll(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Headings:', headings.slice(0, 15));

  // Look for image sources
  const imgs = [...mainContent.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log(`Images count: ${imgs.length}, sample:`, imgs.slice(0, 5));
}

extractMain('gallery-product.html');
extractMain('blog.html');
extractMain('bundle-and-save.html');
extractMain('about.html');
