import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('scripts/crawl-cache/home.html', 'utf8');

// Find headings, sections, sliders, banners
const sectionRegex = /<section[^>]*id=["']([^"']*)["'][^>]*>|<div[^>]*class=["']([^"']*(?:section|banner|slider|row)[^"']*)["']/g;
const sections = [];
let match;
let count = 0;
while ((match = sectionRegex.exec(content)) !== null && count < 30) {
  sections.push(match[1] || match[2]);
  count++;
}

console.log('Homepage main sections/divs:', sections);

// Let's extract nav links in header
const navRegex = /<ul[^>]*id=["']site-navigation["'][^>]*>([\s\S]*?)<\/ul>/;
const navMatch = navRegex.exec(content);
if (navMatch) {
  console.log('Site navigation HTML snippet:', navMatch[0].slice(0, 1000));
} else {
  // Try another menu selector
  const menuMatch = content.match(/<ul[^>]*class=["'][^"']*header-nav[^"']*["'][^>]*>([\s\S]*?)<\/ul>/);
  if (menuMatch) {
    console.log('Header nav:', menuMatch[0].slice(0, 1000));
  }
}

// Let's extract announcements/top bar
const topBarMatch = content.match(/<div[^>]*id=["']top-bar["'][^>]*>([\s\S]*?)<\/div>/);
if (topBarMatch) {
  console.log('Top bar:', topBarMatch[0]);
}
