import { NextRequest, NextResponse } from "next/server";
import { fetchTopLanguages } from "@/services/github.service";
import { generateTopLangsSvg } from "@/templates/top-langs.template";
import { svgBundle } from "@/lib/svgBundle";
import { techMap } from "@/config/techs.config";
import { COMMON_CACHE_CONTROL } from "@/config/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const type = searchParams.get("type") || "default";

  if (!username) {
    return new NextResponse("Missing username parameter", { status: 400 });
  }

  try {
    const langs = await fetchTopLanguages(username);
    
    // Inject SVGs for badges or icons
    const langsWithSvg = langs.map(lang => {
      let embeddedSvg = undefined;
      
      if (lang.techKey && techMap[lang.techKey]) {
        if (type === 'badge' || type === 'treemap_badge') {
          const badgeKey = techMap[lang.techKey].badge;
          if (badgeKey && svgBundle[badgeKey as keyof typeof svgBundle]) {
            embeddedSvg = (svgBundle[badgeKey as keyof typeof svgBundle] as any).contentNoDimensions;
          }
        } else if (type === 'icon' || type === 'treemap_icon') {
          const iconKey = techMap[lang.techKey].icon;
          if (iconKey && svgBundle[iconKey as keyof typeof svgBundle]) {
            embeddedSvg = (svgBundle[iconKey as keyof typeof svgBundle] as any).contentNoDimensions;
          }
        }
      }
      
      return { ...lang, embeddedSvg };
    });

    const svg = generateTopLangsSvg(langsWithSvg, type);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": COMMON_CACHE_CONTROL,
      },
    });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
