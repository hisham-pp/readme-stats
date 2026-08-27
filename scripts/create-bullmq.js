const fs = require('fs');
const imageAsBase64 = fs.readFileSync('bullmq-logo-cropped.png', 'base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 256" width="100%" height="100%">
  <image href="data:image/png;base64,${imageAsBase64}" x="0" y="0" width="330" height="256" preserveAspectRatio="xMidYMid meet" filter="brightness(0) invert(1)" />
</svg>`;
fs.writeFileSync('public/icons/bullmq-icon.svg', svg);
console.log('Saved SVG to public/icons/bullmq-icon.svg');
