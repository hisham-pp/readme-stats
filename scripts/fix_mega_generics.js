const https = require('https');
const fs = require('fs');
const path = require('path');
const iconsDir = path.join(__dirname, '../public/icons');

// Correct slugs for ones that got generic SVG
const fixes = [
  ['markdown-icon.svg', 'markdown'],
  ['java-icon.svg', 'java'],
  ['c-icon.svg', 'c'],
  ['csharp-icon.svg', 'csharp'],
  ['capacitor-icon.svg', 'capacitorjs'],
  ['nuxtjs-icon.svg', 'nuxtdotjs'],
  ['azure-icon.svg', 'azure'],
  ['heroku-icon.svg', 'heroku'],
  ['mssql-icon.svg', 'microsoftsqlserver'],
  ['s3-icon.svg', 'amazons3'],
  ['kafka-icon.svg', 'apachekafka'],
  ['rabbitmq-icon.svg', 'rabbitmq'],
  ['mqtt-icon.svg', 'mqtt'],
  ['cypress-icon.svg', 'cypress'],
  ['playwright-icon.svg', 'playwright'],
  ['selenium-icon.svg', 'selenium'],
  ['mocha-icon.svg', 'mocha'],
  ['puppeteer-icon.svg', 'puppeteer'],
  ['k6-icon.svg', 'k6'],
  ['storybook-icon.svg', 'storybook'],
  ['openai-sdk-icon.svg', 'openai'],
  ['hugging-face-icon.svg', 'huggingface'],
  ['pandas-icon.svg', 'pandas'],
];

// Alt slugs to try if first doesn't work
const altSlugs = {
  'markdown-icon.svg': ['markdown'],
  'java-icon.svg': ['java', 'openjdk'],
  'c-icon.svg': ['c'],
  'csharp-icon.svg': ['csharp', 'dotnet'],
  'capacitor-icon.svg': ['capacitorjs', 'capacitor', 'ionic'],
  'nuxtjs-icon.svg': ['nuxtdotjs', 'nuxt'],
  'azure-icon.svg': ['azure', 'microsoftazure'],
  'heroku-icon.svg': ['heroku', 'salesforce'],
  'mssql-icon.svg': ['microsoftsqlserver', 'mssql'],
  's3-icon.svg': ['amazons3', 'amazons3'],
  'kafka-icon.svg': ['apachekafka', 'kafka'],
  'rabbitmq-icon.svg': ['rabbitmq'],
  'mqtt-icon.svg': ['mqtt', 'eclipsemosquitto'],
  'cypress-icon.svg': ['cypress'],
  'playwright-icon.svg': ['playwright'],
  'selenium-icon.svg': ['selenium'],
  'mocha-icon.svg': ['mocha'],
  'puppeteer-icon.svg': ['puppeteer'],
  'k6-icon.svg': ['k6'],
  'storybook-icon.svg': ['storybook'],
  'openai-sdk-icon.svg': ['openai'],
  'hugging-face-icon.svg': ['huggingface', 'huggingfacehub'],
  'pandas-icon.svg': ['pandas'],
};

function downloadIcon(slug) {
  return new Promise((resolve) => {
    const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve(data));
      } else resolve(null);
    }).on('error', () => resolve(null));
  });
}

async function main() {
  for (const [iconFile, _] of fixes) {
    const slugs = altSlugs[iconFile] || [];
    let resolved = false;
    for (const slug of slugs) {
      const svg = await downloadIcon(slug);
      if (svg) {
        fs.writeFileSync(path.join(iconsDir, iconFile), svg);
        console.log(`✅ Fixed ${iconFile} via ${slug}`);
        resolved = true;
        break;
      }
    }
    if (!resolved) console.log(`⚠️  Still no icon for ${iconFile}`);
  }
  console.log('\nDone!');
}
main();
