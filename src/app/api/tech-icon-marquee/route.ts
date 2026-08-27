import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { techMap } from '@/lib/techs';

export async function GET(request: NextRequest) {
  try {
    const iconsDir = path.join(process.cwd(), 'public', 'icons');
    
    if (!fs.existsSync(iconsDir)) {
      return new NextResponse('Icons not found', { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const techsParam = searchParams.get('techs');
    const widthParam = searchParams.get('width');
    const hasbg = searchParams.get('hasbg') === 'true';

    // Parse techConfig to get colors
    const configPath = path.join(process.cwd(), 'src', 'lib', 'techConfig.json');
    const techConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};

    let files: { file: string, color: string, defs?: string }[] = [];
    if (techsParam) {
      const requestedTechs = techsParam.split(',').map(t => t.trim().toLowerCase());
      
      files = requestedTechs.map(tech => {
        const item = techMap[tech];
        if (!item || !item.icon) return null;
        
        let color = '#333333';
        let defs = '';
        if (item.badge) {
          const configId = item.badge.replace('.svg', '');
          const conf = Object.values(techConfig).find((c: any) => c.id === configId) as any;
          if (conf) {
            color = conf.color || color;
            defs = conf.defs || '';
          }
        }
        
        return { file: item.icon, color, defs };
      }).filter(Boolean) as { file: string, color: string, defs?: string }[];
    } else {
      files = Object.values(techMap)
        .filter(tech => tech.icon)
        .map(tech => {
          let color = '#333333';
          let defs = '';
          if (tech.badge) {
            const configId = tech.badge.replace('.svg', '');
            const conf = Object.values(techConfig).find((c: any) => c.id === configId) as any;
            if (conf) {
              color = conf.color || color;
              defs = conf.defs || '';
            }
          }
          return { file: tech.icon, color, defs };
        }).sort((a, b) => a.file.localeCompare(b.file));
    }

    if (files.length === 0) {
      return new NextResponse('No valid techs provided', { status: 400 });
    }
    
    let totalWidth = 0;
    const gap = 10;
    
    const targetHeight = 40; // Uniform height for all icons
    
    // First, calculate total width and prepare inner SVG tags
    let allDefs = '';
    const iconElements = files.map(item => {
      const filePath = path.join(iconsDir, item.file);
      const svgContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract width from the SVG tag or viewBox
      let iconWidth = targetHeight; // Default to 1:1 aspect ratio if no dimensions found
      const widthMatch = svgContent.match(/<svg[^>]*width="([0-9.]+)"/);
      const heightMatch = svgContent.match(/<svg[^>]*height="([0-9.]+)"/);
      const viewBoxMatch = svgContent.match(/<svg[^>]*viewBox="([0-9.\s]+)"/);
      
      if (widthMatch && heightMatch) {
        const w = parseFloat(widthMatch[1]);
        const h = parseFloat(heightMatch[1]);
        if (h > 0) iconWidth = (w / h) * targetHeight;
      } else if (viewBoxMatch) {
        const parts = viewBoxMatch[1].trim().split(/\s+/);
        if (parts.length === 4) {
          const w = parseFloat(parts[2]);
          const h = parseFloat(parts[3]);
          if (h > 0) iconWidth = (w / h) * targetHeight;
        }
      }
      
      let cleanedSvgContent = svgContent.replace(/<\?xml.*?\?>/g, '').trim();
      
      // Remove hardcoded width and height from the root <svg> so it scales via CSS or transform
      cleanedSvgContent = cleanedSvgContent.replace(/<svg([^>]*)width="[^"]*"/g, '<svg$1');
      cleanedSvgContent = cleanedSvgContent.replace(/<svg([^>]*)height="[^"]*"/g, '<svg$1');
      
      // Add explicit width and height corresponding to our target height to ensure consistent rendering
      cleanedSvgContent = cleanedSvgContent.replace(/<svg/, `<svg width="${iconWidth}" height="${targetHeight}"`);

      let containerWidth = iconWidth;
      let finalSvgContent = cleanedSvgContent;

      if (hasbg) {
        // We'll wrap the icon inside a rounded rectangle
        // Let's add some padding
        const padding = 12;
        containerWidth = iconWidth + padding * 2;
        const containerHeight = targetHeight + padding * 2;
        
        // Re-scale the inner icon so it's centered in the rect
        const innerIcon = cleanedSvgContent.replace(/<svg/, `<svg x="${padding}" y="${padding}" width="${iconWidth}" height="${targetHeight}"`);
        
        finalSvgContent = `
          <g>
            <rect x="0" y="0" width="${containerWidth}" height="${containerHeight}" rx="12" fill="${item.color}" />
            ${innerIcon}
          </g>
        `;
        if (item.defs) {
          allDefs += item.defs;
        }
      }

      return {
        svgContent: finalSvgContent,
        width: containerWidth
      };
    });

    // Calculate totalWidth of a single set of icons
    iconElements.forEach(icon => {
      totalWidth += icon.width + gap;
    });

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;

    // To prevent empty space on short lists, we must repeat the items enough times.
    // We need the remaining width after the first set scrolls out to be at least viewBoxWidth.
    const repeats = totalWidth > 0 ? Math.max(2, Math.ceil(viewBoxWidth / totalWidth) + 1) : 2;

    let currentX = 0;
    let stitchedSvgInner = '';

    // We render the list of icons multiple times to create a seamless infinite loop
    let allElements: typeof iconElements = [];
    for (let i = 0; i < repeats; i++) {
      allElements = allElements.concat(iconElements);
    }

    allElements.forEach((icon) => {
      // Nested SVG element inherits x and y naturally
      stitchedSvgInner += `
        <g transform="translate(${currentX}, 0)">
          ${icon.svgContent}
        </g>
      `;
      currentX += icon.width + gap;
    });
    
    // Icon marquees need to be taller than badge marquees
    const height = hasbg ? targetHeight + 24 + 10 : targetHeight + 10; // extra padding if hasbg

    const wrapperSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${viewBoxWidth}" height="${height}" viewBox="0 0 ${viewBoxWidth} ${height}">
        <style>
          .marquee-content {
            animation: scroll 30s linear infinite;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }
          /* Pause animation on hover */
          svg:hover .marquee-content {
            animation-play-state: paused;
          }
        </style>
        
        <!-- Gradient masks to create fade out on edges -->
        <defs>
          ${allDefs}
          <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="transparent" />
            <stop offset="5%" stop-color="white" />
            <stop offset="95%" stop-color="white" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
          <mask id="fadeMask">
            <rect x="0" y="0" width="${viewBoxWidth}" height="${height}" fill="url(#fade)" />
          </mask>
        </defs>

        <g mask="url(#fadeMask)">
          <g class="marquee-content">
            ${stitchedSvgInner}
          </g>
        </g>
      </svg>
    `;

    return new NextResponse(wrapperSvg.trim(), {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
      },
    });

  } catch (err) {
    console.error('Error generating tech-stack marquee:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
