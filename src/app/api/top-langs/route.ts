import { NextRequest } from "next/server";
import { fetchTopLanguages } from "@/utils/github";
import { generateTopLangsSvg } from "@/utils/svg";
import { techMap } from "@/lib/techs";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const type = searchParams.get("type") || "default";

  if (!username) {
    return new Response("Missing username parameter", { status: 400 });
  }

  try {
    const langs: any[] = await fetchTopLanguages(username);
    
    // Inject custom SVG assets if type is 'icon' or 'badge'
    if (type === 'icon' || type === 'badge') {
      const publicDir = path.join(process.cwd(), 'public');
      
      for (const lang of langs) {
        if (lang.techKey && techMap[lang.techKey]) {
          const techItem = techMap[lang.techKey];
          let svgFile = '';
          
          if (type === 'icon' && techItem.icon) {
            svgFile = path.join(publicDir, 'icons', techItem.icon);
          } else if (type === 'badge' && techItem.badge) {
            svgFile = path.join(publicDir, 'badges', techItem.badge);
          }
          
          if (svgFile && fs.existsSync(svgFile)) {
            let svgContent = fs.readFileSync(svgFile, 'utf8');
            svgContent = svgContent.replace(/<\?xml.*?\?>/g, '').trim();
            // Remove hardcoded dimensions to let us scale them
            svgContent = svgContent.replace(/<svg([^>]*)width="[^"]*"/g, '<svg$1');
            svgContent = svgContent.replace(/<svg([^>]*)height="[^"]*"/g, '<svg$1');
            lang.embeddedSvg = svgContent;
          }
        }
      }
    }

    const svg = generateTopLangsSvg(langs, type);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=7200, s-maxage=7200, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
