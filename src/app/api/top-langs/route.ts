import { NextRequest } from "next/server";
import { fetchTopLanguages } from "@/utils/github";
import { generateTopLangsSvg } from "@/utils/svg";
import { techMap } from "@/lib/techs";
import { svgBundle } from "@/lib/svgBundle";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const type = searchParams.get("type") || "default";

  if (!username) {
    return new Response("Missing username parameter", { status: 400 });
  }

  try {
    const langs: any[] = await fetchTopLanguages(username);
    
    // Inject custom SVG assets if type includes 'icon' or 'badge'
    if (type.includes('icon') || type.includes('badge')) {
      for (const lang of langs) {
        if (lang.techKey && techMap[lang.techKey]) {
          const techItem = techMap[lang.techKey];
          let svgFile = '';
          
          if (type.includes('icon') && techItem.icon) {
            svgFile = techItem.icon;
          } else if (type.includes('badge') && techItem.badge) {
            svgFile = techItem.badge;
          }
          
          if (svgFile && svgBundle[svgFile]) {
            lang.embeddedSvg = svgBundle[svgFile].contentNoDimensions;
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
