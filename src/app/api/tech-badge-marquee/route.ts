import { NextRequest, NextResponse } from 'next/server';
import { techMap } from '@/config/techs.config';
import { svgBundle } from '@/lib/svgBundle';
import { generateMarqueeSvg } from '@/templates/marquee.template';
import { MARQUEE_CACHE_CONTROL } from '@/config/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const techsParam = searchParams.get('techs');
    const widthParam = searchParams.get('width');

    let files: string[] = [];
    if (techsParam) {
      const requestedTechs = techsParam.split(',').map(t => t.trim().toLowerCase());
      files = requestedTechs
        .map(tech => techMap[tech as keyof typeof techMap]?.badge)
        .filter(Boolean) as string[];
    } else {
      files = Object.values(techMap).map(tech => tech.badge).filter(Boolean).sort();
    }

    if (files.length === 0) {
      return new NextResponse('No valid techs provided', { status: 400 });
    }
    
    // Use bundled SVGs from memory
    const badgeElements = files.map(file => {
      const bundled = svgBundle[file as keyof typeof svgBundle] as any;
      
      return {
        svgContent: bundled ? bundled.content : '',
        width: bundled ? bundled.width : 100
      };
    });

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;
    const height = 24; // standard flat-square badge height is usually 20, we give it a bit of padding

    const wrapperSvg = generateMarqueeSvg({
      elements: badgeElements,
      viewBoxWidth,
      gap: 10,
      targetHeight: height
    });

    return new NextResponse(wrapperSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': MARQUEE_CACHE_CONTROL,
      },
    });

  } catch (err) {
    console.error('Error generating tech-badge marquee:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
