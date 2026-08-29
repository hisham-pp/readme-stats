import { NextRequest, NextResponse } from "next/server";
import { techMap } from "@/config/techs.config";
import { generateMarqueeSvg } from "@/templates/marquee.template";
import { MARQUEE_CACHE_CONTROL } from "@/config/constants";
import { THEMES } from "@/types/github.types";

import { iconsBrandBundle } from "@/lib/bundles/icons-brand.bundle";
import { iconsDarkBundle } from "@/lib/bundles/icons-dark.bundle";
import { iconsLightBundle } from "@/lib/bundles/icons-light.bundle";
import { iconsBgBundle } from "@/lib/bundles/icons-bg.bundle";

const bundles: Record<string, Record<string, string>> = {
  brand: iconsBrandBundle,
  dark: iconsDarkBundle,
  light: iconsLightBundle,
  bg: iconsBgBundle,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const techsParam = searchParams.get("techs");
    const widthParam = searchParams.get("width");

    let files: { file: string; theme: string }[] = [];

    // Determine global theme from URL query, fallback to brand
    const globalThemeQuery = searchParams.get("theme") as any;
    const globalTheme = THEMES.includes(globalThemeQuery)
      ? globalThemeQuery
      : "brand";

    if (techsParam) {
      const requestedTechs = techsParam
        .split(",")
        .map((t) => t.trim().toLowerCase());

      files = requestedTechs
        .map((techStr) => {
          let tech = techStr;
          let themeSuffix = "";
          if (techStr.includes(":")) {
            const parts = techStr.split(":");
            tech = parts[0];
            themeSuffix = parts[1];
          }

          const item = techMap[tech as keyof typeof techMap];
          if (!item || !item.icon) return null;

          let theme = globalTheme;
          if (themeSuffix && THEMES.includes(themeSuffix as any)) {
            theme = themeSuffix;
          }

          return { file: item.icon, theme };
        })
        .filter(Boolean) as { file: string; theme: string }[];
    } else {
      files = Object.values(techMap)
        .filter((tech) => tech.icon)
        .map((tech) => {
          return { file: tech.icon as string, theme: globalTheme };
        })
        .sort((a, b) => a.file.localeCompare(b.file));
    }

    if (files.length === 0) {
      return new NextResponse("No valid techs provided", { status: 400 });
    }

    const targetHeight = 24; // Uniform height for all icons

    // First, calculate total width and prepare inner SVG tags
    let allDefs = "";
    const iconElements = files
      .map((item) => {
        const bundle = bundles[item.theme] || bundles.brand;
        const svgContent = bundle[item.file];

        if (!svgContent) {
          console.warn(`Missing SVG for ${item.file} in theme ${item.theme}`);
          return null;
        }

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

        let cleanedSvgContent = svgContent.replace(/<\?xml.*?\?>/g, "").trim();

        // Remove hardcoded width and height from the root <svg> so it scales via CSS or transform
        cleanedSvgContent = cleanedSvgContent.replace(
          /<svg([^>]*)width="[^"]*"/g,
          "<svg$1",
        );
        cleanedSvgContent = cleanedSvgContent.replace(
          /<svg([^>]*)height="[^"]*"/g,
          "<svg$1",
        );

        // Add explicit width and height corresponding to our target height to ensure consistent rendering
        cleanedSvgContent = cleanedSvgContent.replace(
          /<svg/,
          `<svg width="${iconWidth}" height="${targetHeight}"`,
        );

        // Also extract defs if any
        const defsMatch = cleanedSvgContent.match(/<defs>([\s\S]*?)<\/defs>/);
        if (defsMatch) {
          allDefs += defsMatch[1];
        }

        return {
          svgContent: cleanedSvgContent,
          width: iconWidth,
        };
      })
      .filter(Boolean) as { svgContent: string; width: number }[];

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;

    const wrapperSvg = generateMarqueeSvg({
      elements: iconElements,
      viewBoxWidth,
      gap: 10,
      targetHeight: targetHeight,
      extraHeightPadding: 10,
      allDefs: allDefs,
    });

    return new NextResponse(wrapperSvg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": MARQUEE_CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("Error generating tech-icon marquee:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
