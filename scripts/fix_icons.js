const https = require('https');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

// Map of tech key -> list of simple-icons slugs to try in order
const toFix = {
  'xlsx-icon': ['microsoftexcel', 'xlsxjs'],
  'uuid-icon': [],
  'sanitize-html-icon': [],
  'multer-icon': [],
  'dynamodb-icon': ['amazondynamodb', 'amazon', 'amazonaws'],
  'db-icon': [],
  'cursor-icon': ['cursor'],
  'windsurf-icon': ['windsurf'],
  'kiro-icon': [],
  'claude-code-icon': ['anthropic', 'claude'],
  'claude-desktop-icon': ['anthropic', 'claude'],
  'codex-icon': ['openai'],
  'devin-icon': ['cognition'],
  'gemini-icon': ['googlegemini', 'google'],
  'handlebars-icon': ['handlebarsdotjs', 'handlebars'],
  'gemini-cli-icon': ['googlegemini', 'google'],
  'chatgpt-icon': ['openai', 'chatgpt'],
  'ai-studio-icon': ['google', 'googlecolab'],
  'antigravity-icon': [],
  'antigravity-cli-icon': [],
  'sonarqube-icon': ['sonarqube', 'sonar'],
  'sonarlint-icon': ['sonarlint', 'sonar'],
  'windows-icon': ['windows', 'microsoftwindows', 'microsoft'],
  'wsl-icon': ['linux', 'windows'],
  'lefthook-icon': [],
  'sql-icon': ['mysql', 'postgresql', 'sqlite'],
  'xml-icon': [],
  'zsh-icon': ['zsh', 'gnubash'],
  'husky-icon': [],
  'powershell-icon': ['powershell', 'windowsterminal'],
  'json-icon': ['json', 'javascript'],
};

// Also some custom SVGs for ones with no simple-icons equivalent
const customSvgs = {
  'uuid-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M17.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-8h2v6h-2z"/></svg>`,
  'sanitize-html-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5zm-2 9h4v2h-4zm0-7h4v5h-4z"/></svg>`,
  'multer-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM13 9V3.5L18.5 9H13zm-2 8.5l-3.5-3.5 1.41-1.41L11 14.67l4.59-4.58L17 11.5 11 17.5z"/></svg>`,
  'db-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.36 6 2s-2.13 2-6 2-6-1.36-6-2 2.13-2 6-2zm6 12c0 .64-2.13 2-6 2s-6-1.36-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-5c0 .64-2.13 2-6 2s-6-1.36-6-2v-2.23C7.61 10.55 9.72 11 12 11s4.39-.45 6-1.23V12z"/></svg>`,
  'kiro-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
  'antigravity-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2zm0 3.24L16.71 18H12V5.24zM12 18H7.29L12 5.24V18z"/></svg>`,
  'antigravity-cli-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 8l1.5 1.5L6 11l1 1 2.5-2.5L7 7l-1 1zm5 3h6v1.5h-6V11z"/></svg>`,
  'lefthook-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M6.5 10h-2v5h2v-5zm6 0h-2v5h2v-5zm8.5 7H3v2h18v-2zm-2.5-7h-2v5h2v-5zM11.99 1L2 6v2h20V6l-10.01-5z"/></svg>`,
  'sql-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm-3 6h-2v-4h2v4zm4-10H3v2h18V9zm0-4H3v2h18V5z"/></svg>`,
  'xml-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-4.1 1.8l1.9.4 2.2-9.6-1.9-.4-2.2 9.6z"/></svg>`,
  'zsh-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 8v2.5l4 2L6 14.5V17l6-3.3V10L6 8zm6.5 1H19v1.5h-6.5V9zm0 4H19v1.5h-6.5V13z"/></svg>`,
  'husky-icon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"/></svg>`,
};

function downloadFromSimpleIcons(slug) {
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
  for (const [iconKey, slugs] of Object.entries(toFix)) {
    const iconPath = path.join(iconsDir, `${iconKey}.svg`);
    let resolved = false;

    for (const slug of slugs) {
      const svg = await downloadFromSimpleIcons(slug);
      if (svg) {
        fs.writeFileSync(iconPath, svg);
        console.log(`✅ Fixed ${iconKey} using simple-icons/${slug}`);
        resolved = true;
        break;
      }
    }

    if (!resolved && customSvgs[iconKey]) {
      fs.writeFileSync(iconPath, customSvgs[iconKey]);
      console.log(`🎨 Fixed ${iconKey} with custom SVG`);
      resolved = true;
    }

    if (!resolved) {
      console.log(`⚠️  No fix found for ${iconKey}, keeping current`);
    }
  }
  console.log('\nDone! Run pnpm badges:generate to update badges.');
}

main();
