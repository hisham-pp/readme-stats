import { NextRequest, NextResponse } from 'next/server';
import { techMap } from '@/lib/techs';
import { svgBundle } from '@/lib/svgBundle';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const techsParam = searchParams.get('techs');
    const widthParam = searchParams.get('width');

    let files: string[] = [];
    if (techsParam) {
      const requestedTechs = techsParam.split(',').map(t => t.trim().toLowerCase());
      files = requestedTechs
        .map(tech => techMap[tech]?.badge)
        .filter(Boolean) as string[];
    } else {
      files = Object.values(techMap).map(tech => tech.badge).filter(Boolean).sort();
    }

    if (files.length === 0) {
      return new NextResponse('No valid techs provided', { status: 400 });
    }
    
    let totalWidth = 0;
    const gap = 10;
    
    // Use bundled SVGs from memory
    const badgeElements = files.map(file => {
      const bundled = svgBundle[file];
      
      return {
        svgContent: bundled ? bundled.content : '',
        width: bundled ? bundled.width : 100
      };
    });

    // Calculate totalWidth of a single set of badges
    badgeElements.forEach(badge => {
      totalWidth += badge.width + gap;
    });

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;

    // To prevent empty space on short lists, we must repeat the items enough times.
    // We need the remaining width after the first set scrolls out to be at least viewBoxWidth.
    const repeats = totalWidth > 0 ? Math.max(2, Math.ceil(viewBoxWidth / totalWidth) + 1) : 2;

    let currentX = 0;
    let stitchedSvgInner = '';

    // We render the list of badges multiple times to create a seamless infinite loop
    let allElements: typeof badgeElements = [];
    for (let i = 0; i < repeats; i++) {
      allElements = allElements.concat(badgeElements);
    }

    allElements.forEach((badge) => {
      // Nested SVG element inherits x and y naturally
      stitchedSvgInner += `
        <g transform="translate(${currentX}, 0)">
          ${badge.svgContent}
        </g>
      `;
      currentX += badge.width + gap;
    });
    const height = 24; // standard flat-square badge height is usually 20, we give it a bit of padding

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
