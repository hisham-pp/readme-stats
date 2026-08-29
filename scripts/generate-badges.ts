import fs from 'fs';
import path from 'path';
import { generateBadge } from '../src/lib/badgeGenerator';

// Read the tech config
const configPath = path.join(__dirname, '../src/lib/techConfig.json');
const techConfig: Record<string, any> = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const badgesDir = path.join(__dirname, '../public/badges');

console.log('Generating badges from techConfig.json...');

for (const [key, config] of Object.entries(techConfig)) {
  try {
    const { id, icon } = config as any;
    if (!id) {
      console.warn(`Skipping ${key}: No 'id' provided in config.`);
      continue;
    }
    const themes = ['default', 'dark', 'light'];
    
    for (const theme of themes) {
      // Read the raw SVG icon if provided
      let rawIconSvg = '';
      if (icon) {
        const iconsDir = path.join(__dirname, `../public/icons/${theme}`);
        const iconPath = path.join(iconsDir, icon);
        if (fs.existsSync(iconPath)) {
          rawIconSvg = fs.readFileSync(iconPath, 'utf8');
        } else {
          // fallback to default if theme icon not found
          const defaultIconPath = path.join(__dirname, `../public/icons/default/${icon}`);
          if (fs.existsSync(defaultIconPath)) {
            rawIconSvg = fs.readFileSync(defaultIconPath, 'utf8');
          } else {
             console.warn(`Warning: Icon file ${icon} not found for ${key}.`);
          }
        }
      }

      // Generate the full badge SVG
      const badgeSvg = generateBadge({
        ...config,
        icon: rawIconSvg || undefined
      });

      // Write the output file
      const themeBadgesDir = path.join(badgesDir, theme);
      if (!fs.existsSync(themeBadgesDir)) {
        fs.mkdirSync(themeBadgesDir, { recursive: true });
      }
      
      const outputPath = path.join(themeBadgesDir, `${id}.svg`);
      fs.writeFileSync(outputPath, badgeSvg);
      console.log(`\u2705 Successfully generated ${theme}/${id}.svg for ${config.name}`);
    }
  } catch (error) {
    console.error(`\u274C Failed to generate badge for ${key}:`, error);
  }
}

console.log('Badge generation complete.');
