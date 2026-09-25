import http from 'http';

http.get('http://localhost:3000/about', res => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Body length:', data.length, 'Body preview:', data.substring(0, 300)));
}).on('error', e => console.error(e));
