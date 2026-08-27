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

    let files: string[] = [];
    if (techsParam) {
      const requestedTechs = techsParam.split(',').map(t => t.trim().toLowerCase());
      files = requestedTechs
        .map(tech => techMap[tech]?.icon)
        .filter(Boolean) as string[];
    } else {
      files = Object.values(techMap).map(tech => tech.icon).filter(Boolean).sort();
    }

    if (files.length === 0) {
      return new NextResponse('No valid techs provided', { status: 400 });
    }
    
    let totalWidth = 0;
    const gap = 10;
    
    const targetHeight = 40; // Uniform height for all icons
    
    // First, calculate total width and prepare inner SVG tags
    const iconElements = files.map(file => {
      const filePath = path.join(iconsDir, file);
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

      return {
        svgContent: cleanedSvgContent,
        width: iconWidth
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
    const height = targetHeight + 10;

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
