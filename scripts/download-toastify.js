const https = require('https');
const fs = require('fs');

https.get('https://fkhadra.github.io/react-toastify/img/favicon.ico', (res) => {
  if (res.statusCode !== 200) {
    console.error('Failed to fetch favicon.ico', res.statusCode);
    return;
  }
  const data = [];
  res.on('data', chunk => data.push(chunk));
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    const base64 = buffer.toString('base64');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><image width="32" height="32" href="data:image/x-icon;base64,${base64}"/></svg>`;
    fs.writeFileSync('public/icons/react-toastify-icon.svg', svg);
    console.log('Saved react-toastify-icon.svg');
  });
}).on('error', err => {
  console.error(err);
});
