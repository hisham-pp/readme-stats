const https = require('https');
const fs = require('fs');
https.get('https://quilljs.com/assets/images/favicon.png', (res) => {
  if (res.statusCode !== 200) {
    console.error('Failed to fetch favicon.png, trying favicon.ico...');
    https.get('https://quilljs.com/favicon.ico', (res2) => {
      const data = [];
      res2.on('data', chunk => data.push(chunk));
      res2.on('end', () => {
        const buffer = Buffer.concat(data);
        const base64 = buffer.toString('base64');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><image width="32" height="32" href="data:image/x-icon;base64,${base64}"/></svg>`;
        fs.writeFileSync('public/icons/react-quill-icon.svg', svg);
        console.log('Saved react-quill-icon.svg from favicon.ico');
      });
    });
    return;
  }
  const data = [];
  res.on('data', chunk => data.push(chunk));
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    const base64 = buffer.toString('base64');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><image width="32" height="32" href="data:image/png;base64,${base64}"/></svg>`;
    fs.writeFileSync('public/icons/react-quill-icon.svg', svg);
    console.log('Saved react-quill-icon.svg from favicon.png');
  });
}).on('error', err => {
  console.error(err);
});
