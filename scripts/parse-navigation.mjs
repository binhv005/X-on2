import fs from 'fs';

const content = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');

// Find main-menu
const mainMenuMatch = content.match(/<div[^>]*id=["']main-menu["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
if (mainMenuMatch) {
  console.log('Main menu found length:', mainMenuMatch[0].length);
  // Extract all <a> tags inside main-menu
  const aRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/g;
  let m;
  const links = [];
  while ((m = aRegex.exec(mainMenuMatch[0])) !== null) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      links.push({ href: m[1], text });
    }
  }
  console.log('Main menu links:', links);
}

// Find header top/main/bottom
const headerMatch = content.match(/<header[^>]*>([\s\S]*?)<\/header>/);
if (headerMatch) {
  const headerLinks = [];
  const aRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = aRegex.exec(headerMatch[0])) !== null) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      headerLinks.push({ href: m[1], text });
    }
  }
  console.log('Header links:', headerLinks);
}

// Find footer
const footerMatch = content.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
if (footerMatch) {
  const footerLinks = [];
  const aRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = aRegex.exec(footerMatch[0])) !== null) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      footerLinks.push({ href: m[1], text });
    }
  }
  console.log('Footer links count:', footerLinks.length);
  console.log('Footer links sample:', footerLinks.slice(0, 20));
}
