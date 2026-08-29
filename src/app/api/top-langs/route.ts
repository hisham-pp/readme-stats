import { NextRequest, NextResponse } from "next/server";
import { fetchTopLanguages } from "@/services/github.service";
import { generateTopLangsSvg } from "@/templates/top-langs.template";
import { techMap } from "@/config/techs.config";
import { COMMON_CACHE_CONTROL } from "@/config/constants";
import { THEMES } from "@/types/github.types";

import { iconsBrandBundle } from "@/lib/bundles/icons-brand.bundle";
import { iconsDarkBundle } from "@/lib/bundles/icons-dark.bundle";
import { iconsLightBundle } from "@/lib/bundles/icons-light.bundle";
import { iconsBgBundle } from "@/lib/bundles/icons-bg.bundle";
import { badgesBrandBundle } from "@/lib/bundles/badges-brand.bundle";

const iconBundles: Record<string, Record<string, string>> = {
  brand: iconsBrandBundle,
  dark: iconsDarkBundle,
  light: iconsLightBundle,
  bg: iconsBgBundle,
};

const badgeBundles: Record<string, Record<string, string>> = {
  brand: badgesBrandBundle,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const type = searchParams.get("type") || "default";

  const globalThemeQuery = searchParams.get("theme") as any;
  const theme = THEMES.includes(globalThemeQuery) ? globalThemeQuery : "brand";

  if (!username) {
    return new NextResponse("Missing username parameter", { status: 400 });
  }

  try {
    const langs = await fetchTopLanguages(username);

    // Inject SVGs for badges or icons
    const langsWithSvg = langs.map((lang) => {
      let embeddedSvg = undefined;

      if (lang.techKey && techMap[lang.techKey]) {
        if (type === "badge" || type === "treemap_badge") {
          const badgeKey = techMap[lang.techKey].badge;
          if (badgeKey) {
            const bundle = badgeBundles[theme] || badgeBundles.brand;
            const rawContent = bundle[badgeKey];
            try {
              if (rawContent) {
                const content = rawContent.replace(/<\?xml.*?\?>/g, "").trim();
                let noDims = content.replace(
                  /<svg([^>]*)width="[^"]*"/,
                  "<svg$1",
                );
                noDims = noDims.replace(/<svg([^>]*)height="[^"]*"/, "<svg$1");
                embeddedSvg = noDims;
              }
            } catch {}
          }
        } else if (type === "icon" || type === "treemap_icon") {
          const iconKey = techMap[lang.techKey].icon;
          if (iconKey) {
            const bundle = iconBundles[theme] || iconBundles.brand;
            const rawContent = bundle[iconKey];
            try {
              if (rawContent) {
                const content = rawContent.replace(/<\?xml.*?\?>/g, "").trim();
                let noDims = content.replace(
                  /<svg([^>]*)width="[^"]*"/,
                  "<svg$1",
                );
                noDims = noDims.replace(/<svg([^>]*)height="[^"]*"/, "<svg$1");
                embeddedSvg = noDims;
              }
            } catch {}
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
