import http from 'http';

const urls = ['/', '/about', '/blog', '/bundle-and-save', '/gallery-product', '/extra-long-handmade-nail-luxury'];

async function testAll() {
  for (const url of urls) {
    await new Promise((resolve) => {
      http.get('http://localhost:3000' + url, res => {
        console.log(`${url.padEnd(40)} -> ${res.statusCode}`);
        resolve();
      }).on('error', err => {
        console.error(`${url.padEnd(40)} -> ERROR: ${err.message}`);
        resolve();
      });
    });
  }
}

testAll();
