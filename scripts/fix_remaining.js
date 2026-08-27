const https = require('https');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

// These 5 couldn't be found in first pass - try alternative slugs
const tries = [
  ['xlsx-icon', 'microsoftexcel'],
  ['dynamodb-icon', 'amazondynamodb'],
  ['codex-icon', 'openai'],
  ['devin-icon', 'cognition'],
  ['chatgpt-icon', 'openai'],
  ['windows-icon', 'windows11'],
  ['powershell-icon', 'gnupowershell'],
];

// Custom fallbacks for those that truly have no simple-icons entry
const customs = {
  'xlsx-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M14.7 12l3.3-5H16l-2.25 3.75L11.5 7H9.5l3.3 5-3.3 5H11.5l2.25-3.75L16 17h2zm-8.7 7V5H13V3H4v18h9v-2z"/></svg>`,
  'dynamodb-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 10c-4.42 0-8-1.79-8-4v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4zm0 5c-4.42 0-8-1.79-8-4v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4z"/></svg>`,
  'windows-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z"/></svg>`,
  'powershell-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 9.41L10.59 14 6 18.41 7.41 19.82 13.41 14 7.41 8.59 6 9.41zM14 17h4v2h-4z"/></svg>`,
  'devin-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>`,
};

function downloadIcon(slug) {
  return new Promise((resolve) => {
    const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      } else {
        resolve(null);
      }
    }).on('error', () => resolve(null));
  });
}

async function main() {
  for (const [iconKey, slug] of tries) {
    const svg = await downloadIcon(slug);
    if (svg) {
      fs.writeFileSync(path.join(iconsDir, `${iconKey}.svg`), svg);
      console.log(`Fixed ${iconKey} using simple-icons/${slug}`);
    } else if (customs[iconKey]) {
      fs.writeFileSync(path.join(iconsDir, `${iconKey}.svg`), customs[iconKey]);
      console.log(`Fixed ${iconKey} with custom SVG`);
    } else {
      console.log(`No fix for ${iconKey}`);
    }
  }
  console.log('Done!');
}

main();
