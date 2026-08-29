import { GitHubLanguage } from '@/types/github.types';
import { squarifiedTreemap } from '@/utils/treemap';

export function generateTopLangsSvg(langs: GitHubLanguage[], type: string = 'default') {
  if (type.startsWith('treemap')) {
    const isBadge = type.includes('badge');
    const svgWidth = 800;
    const svgHeight = 400;
    
    // Treemap blocks
    const nodes = squarifiedTreemap(
      langs,
      (lang) => parseFloat(lang.percent),
      25, 60, // x, y offset
      svgWidth - 50, svgHeight - 85 // w, h available
    );
    
    const blocks = nodes.map(node => {
      const lang = node.data;
      const x = node.x;
      const y = node.y;
      const w = node.w;
      const h = node.h;
      
      let content = '';
      if (lang.embeddedSvg) {
        // We want to scale the icon to fit inside the block, but keep some padding.
        // Let padding be 10% of min(w, h).
        const padding = Math.min(w, h) * 0.15;
        let iconW = w - padding * 2;
        let iconH = h - padding * 2;
        
        let iconX = padding;
        let iconY = padding;
        
        if (isBadge) {
          // Badges are wider than they are tall, typically 2.5:1 ratio.
          // Adjust dimensions to keep them centered and proportional if possible.
          // Since we removed width/height, it will stretch. We should give it a decent aspect ratio if we can,
          // but without knowing the exact width of the text, it's hard. Let's just constrain height more.
          iconH = Math.min(iconH, 30); // Cap badge height so it doesn't look ridiculously tall
          iconY = (h - iconH) / 2; // Center vertically
        } else {
          // Icons are usually square.
          const size = Math.min(iconW, iconH);
          iconW = size;
          iconH = size;
          iconX = (w - size) / 2;
          iconY = (h - size) / 2;
        }
        
        const scaledSvg = lang.embeddedSvg.replace(/<svg/, `<svg x="${iconX}" y="${iconY}" width="${iconW}" height="${iconH}"`);
        content = scaledSvg;
      } else {
        // Fallback text
        content = `
          <text x="${w/2}" y="${h/2 - 5}" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="${Math.min(w/4, 16)}" font-weight="600" text-anchor="middle" fill="#fff">${lang.name}</text>
        `;
      }
      
      return `
        <g transform="translate(${x}, ${y})">
          <rect width="${w}" height="${h}" rx="4" fill="#161B22" stroke="${lang.color}" stroke-width="2" />
          ${content}
          <!-- Percentage at bottom right if big enough -->
          ${w > 50 && h > 40 ? `<text x="${w - 8}" y="${h - 8}" font-family="'Segoe UI', Ubuntu, Sans-Serif" text-anchor="end" font-size="12" fill="${lang.color}">${lang.percent}%</text>` : ''}
        </g>
      `;
    }).join('');
    
    return `
      <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          .header { font: 600 22px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58A6FF; }
        </style>
        <rect width="${svgWidth}" height="${svgHeight}" rx="8" fill="#0D1117" stroke="#30363D" />
        <text x="25" y="40" class="header">Most Used Languages</text>
        ${blocks}
      </svg>
    `;
  }

  let currentX = 0;
  const bars = langs.map((lang) => {
    const bar = `
      <rect x="${currentX}%" y="0" width="${lang.percent}%" height="8" fill="${lang.color}" />
    `;
    currentX += parseFloat(lang.percent);
    return bar;
  }).join('');
  
  const legend = langs.map((lang, index) => {
    if (type === 'badge') {
      const x = (index % 2 === 0) ? 25 : 220; // Badges are wider
      const y = 75 + Math.floor(index / 2) * 35;
      
      if (lang.embeddedSvg) {
        const scaledSvg = lang.embeddedSvg.replace(/<svg/, `<svg height="24"`);
        return `
          <g transform="translate(${x}, ${y})">
            ${scaledSvg}
            <text x="140" y="16" class="stat">${lang.percent}%</text>
          </g>
        `;
      }
      
      // Fallback
      return `
        <g transform="translate(${x}, ${y})">
          <circle cx="5" cy="5" r="5" fill="${lang.color}" />
          <text x="15" y="9" class="stat" font-weight="600">${lang.name}</text>
          <text x="100" y="9" class="stat">${lang.percent}%</text>
        </g>
      `;
    } else if (type === 'icon') {
      const x = (index % 2 === 0) ? 25 : 180;
      const y = 80 + Math.floor(index / 2) * 28;
      
      if (lang.embeddedSvg) {
        const scaledSvg = lang.embeddedSvg.replace(/<svg/, `<svg y="-4" width="16" height="16"`);
        return `
          <g transform="translate(${x}, ${y})">
            ${scaledSvg}
            <text x="24" y="9" class="stat" font-weight="600">${lang.name}</text>
            <text x="105" y="9" class="stat">${lang.percent}%</text>
          </g>
        `;
      }
      
      // Fallback
      return `
        <g transform="translate(${x}, ${y})">
          <circle cx="5" cy="5" r="5" fill="${lang.color}" />
          <text x="15" y="9" class="stat" font-weight="600">${lang.name}</text>
          <text x="100" y="9" class="stat">${lang.percent}%</text>
        </g>
      `;
    } else {
      // Default
      const x = (index % 2 === 0) ? 25 : 180;
      const y = 80 + Math.floor(index / 2) * 25;
      return `
        <g transform="translate(${x}, ${y})">
          <circle cx="5" cy="5" r="5" fill="${lang.color}" />
          <text x="15" y="9" class="stat" font-weight="600">${lang.name}</text>
          <text x="100" y="9" class="stat">${lang.percent}%</text>
        </g>
      `;
    }
  }).join('');

  let svgWidth = 300;
  let svgHeight = 165;
  
  if (type === 'badge') {
    svgWidth = 420;
    svgHeight = 85 + Math.ceil(langs.length / 2) * 35;
  } else if (type === 'icon') {
    svgHeight = 85 + Math.ceil(langs.length / 2) * 28;
  } else {
    svgHeight = 85 + Math.ceil(langs.length / 2) * 25;
  }

  return `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58A6FF; }
        .stat { font: 400 12px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #C9D1D9; }
      </style>
      <rect width="${svgWidth}" height="${svgHeight}" rx="4.5" fill="#0D1117" stroke="#0D1117" />
      <text x="25" y="30" class="header">Most Used Languages</text>
      
      <!-- Progress Bar -->
      <svg x="25" y="45" width="${svgWidth - 50}" height="8" rx="4">
        ${bars}
      </svg>
      
      <!-- Legend -->
      ${legend}
    </svg>
  `;
}
