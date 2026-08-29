import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { techMap } from '@/config/techs.config';
import { generateMarqueeSvg } from '@/templates/marquee.template';
import { MARQUEE_CACHE_CONTROL } from '@/config/constants';

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
        const item = techMap[tech as keyof typeof techMap];
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
    
    const targetHeight = 24; // Uniform height for all icons
    
    // First, calculate total width and prepare inner SVG tags
    let allDefs = '';
    const iconElements = files.map(item => {
      const filePath = path.join(iconsDir, item.file);
      const svgContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract width from the SVG tag or viewBox
      let iconWidth = targetHeight; // Default to 1:1 aspect ratio if no dimensions found
      const widthMatch = svgContent.match(/<svg[^>]*width="([0-9.]+)"/);
      const heightMatch = svgContent.match(/<svg[^>]*height="([0-9.]+)"/);
      const viewBoxMatch = svgContent.match(/<svg[^>]*viewBox="([0-9.\\s]+)"/);
      
      if (widthMatch && heightMatch) {
        const w = parseFloat(widthMatch[1]);
        const h = parseFloat(heightMatch[1]);
        if (h > 0) iconWidth = (w / h) * targetHeight;
      } else if (viewBoxMatch) {
        const parts = viewBoxMatch[1].trim().split(/\\s+/);
        if (parts.length === 4) {
          const w = parseFloat(parts[2]);
          const h = parseFloat(parts[3]);
          if (h > 0) iconWidth = (w / h) * targetHeight;
        }
      }
      
      let cleanedSvgContent = svgContent.replace(/<\\?xml.*?\\?>/g, '').trim();
      
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
        const padding = 6;
        containerWidth = iconWidth + padding * 2;
        const containerHeight = targetHeight + padding * 2;
        
        // Remove the previously added width/height from cleanedSvgContent to avoid duplicates
        let innerIcon = cleanedSvgContent.replace(/<svg\\s+width="[^"]*"\\s+height="[^"]*"/, '<svg');
        // Now add the new positioned ones
        innerIcon = innerIcon.replace(/<svg/, `<svg x="${padding}" y="${padding}" width="${iconWidth}" height="${targetHeight}"`);
        
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

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;

    const wrapperSvg = generateMarqueeSvg({
      elements: iconElements,
      viewBoxWidth,
      gap: 10,
      targetHeight: targetHeight,
      extraHeightPadding: hasbg ? 34 : 10,
      allDefs: allDefs
    });

    return new NextResponse(wrapperSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': MARQUEE_CACHE_CONTROL,
      },
    });

  } catch (err) {
    console.error('Error generating tech-icon marquee:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

