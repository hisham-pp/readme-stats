import { NextRequest, NextResponse } from "next/server";
import { fetchTopLanguages } from "@/services/github.service";
import { generateTopLangsSvg } from "@/templates/top-langs.template";
import { techMap } from "@/config/techs.config";
import { COMMON_CACHE_CONTROL } from "@/config/constants";
import { THEMES } from "@/types/github.types";

import { iconsDefaultBundle } from '@/lib/bundles/icons-default.bundle';
import { iconsDarkBundle } from '@/lib/bundles/icons-dark.bundle';
import { iconsLightBundle } from '@/lib/bundles/icons-light.bundle';
import { badgesDefaultBundle } from '@/lib/bundles/badges-default.bundle';
import { badgesDarkBundle } from '@/lib/bundles/badges-dark.bundle';
import { badgesLightBundle } from '@/lib/bundles/badges-light.bundle';

const iconBundles: Record<string, Record<string, string>> = {
  default: iconsDefaultBundle,
  dark: iconsDarkBundle,
  light: iconsLightBundle,
};

const badgeBundles: Record<string, Record<string, string>> = {
  default: badgesDefaultBundle,
  dark: badgesDarkBundle,
  light: badgesLightBundle,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const type = searchParams.get("type") || "default";
  
  const globalThemeQuery = searchParams.get("theme") as any;
  const theme = THEMES.includes(globalThemeQuery) ? globalThemeQuery : 'default';

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
          if (badgeKey) {
            const bundle = badgeBundles[theme] || badgeBundles.default;
            let rawContent = bundle[badgeKey];
            try {
              if (rawContent) {
                let content = rawContent.replace(/<\?xml.*?\?>/g, '').trim();
                let noDims = content.replace(/<svg([^>]*)width="[^"]*"/, '<svg$1');
                noDims = noDims.replace(/<svg([^>]*)height="[^"]*"/, '<svg$1');
                embeddedSvg = noDims;
              }
            } catch(e) {}
          }
        } else if (type === 'icon' || type === 'treemap_icon') {
          const iconKey = techMap[lang.techKey].icon;
          if (iconKey) {
            const bundle = iconBundles[theme] || iconBundles.default;
            let rawContent = bundle[iconKey];
            try {
              if (rawContent) {
                let content = rawContent.replace(/<\?xml.*?\?>/g, '').trim();
                let noDims = content.replace(/<svg([^>]*)width="[^"]*"/, '<svg$1');
                noDims = noDims.replace(/<svg([^>]*)height="[^"]*"/, '<svg$1');
                embeddedSvg = noDims;
              }
            } catch(e) {}
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
