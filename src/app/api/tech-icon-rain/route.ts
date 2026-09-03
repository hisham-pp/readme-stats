import { NextRequest, NextResponse } from "next/server";
import { techMap } from "@/config/techs.config";
import { generateRainSvg, RainIcon } from "@/templates/rain.template";
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
    const heightParam = searchParams.get("height");
    const name = searchParams.get("name") || "";
    const colorParam = searchParams.get("color");
    const color =
      colorParam && /^#?[0-9a-fA-F]{3,8}$/.test(colorParam)
        ? colorParam.startsWith("#")
          ? colorParam
          : `#${colorParam}`
        : "#FFFFFF";
    const bgcolorParam = searchParams.get("bgcolor");
    const bgcolor =
      bgcolorParam === "transparent"
        ? "transparent"
        : bgcolorParam && /^#?[0-9a-fA-F]{3,8}$/.test(bgcolorParam)
          ? bgcolorParam.startsWith("#")
            ? bgcolorParam
            : `#${bgcolorParam}`
          : undefined;
    const fontSizeParam = searchParams.get("fontSize");
    const fontSize = fontSizeParam ? parseInt(fontSizeParam, 10) || undefined : undefined;

    // Determine global theme from URL query, fallback to brand
    const globalThemeQuery = searchParams.get("theme") as any;
    const globalTheme = THEMES.includes(globalThemeQuery)
      ? globalThemeQuery
      : "brand";

    let files: { file: string; theme: string }[] = [];

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
        .map((tech) => ({ file: tech.icon as string, theme: globalTheme }))
        .sort((a, b) => a.file.localeCompare(b.file));
    }

    if (files.length === 0) {
      return new NextResponse("No valid techs provided", { status: 400 });
    }

    const targetHeight = 24;

    // Resolve each icon file into an SVG element with normalised dimensions
    const iconElements: RainIcon[] = files
      .map((item) => {
        const bundle = bundles[item.theme] || bundles.brand;
        const svgContent = bundle[item.file];

        if (!svgContent) {
          console.warn(`Missing SVG for ${item.file} in theme ${item.theme}`);
          return null;
        }

        const cleanedSvg = svgContent.replace(/<\?xml.*?\?>/g, "").trim();
        const rootTagMatch = cleanedSvg.match(/^<svg[^>]*>/);
        const rootTag = rootTagMatch ? rootTagMatch[0] : "";

        let iconWidth = targetHeight;
        const widthMatch = rootTag.match(/width="([0-9.]+)"/);
        const heightMatch = rootTag.match(/height="([0-9.]+)"/);
        const viewBoxMatch = rootTag.match(/viewBox="([0-9.\s]+)"/);

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

        let cleanedSvgContent = cleanedSvg;
        if (rootTagMatch) {
          let modifiedRootTag = rootTag;
          modifiedRootTag = modifiedRootTag.replace(/\s+width="[^"]*"/g, "");
          modifiedRootTag = modifiedRootTag.replace(/\s+height="[^"]*"/g, "");
          modifiedRootTag = modifiedRootTag.replace(
            /<svg/,
            `<svg width="${iconWidth}" height="${targetHeight}"`,
          );
          cleanedSvgContent = cleanedSvgContent.replace(
            rootTag,
            modifiedRootTag,
          );
        }

        return {
          svgContent: cleanedSvgContent,
          width: iconWidth,
          height: targetHeight,
        };
      })
      .filter(Boolean) as RainIcon[];

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;
    const viewBoxHeight = heightParam ? parseInt(heightParam, 10) || 300 : 300;

    const svg = generateRainSvg({
      icons: iconElements,
      name,
      width: viewBoxWidth,
      height: viewBoxHeight,
      theme: globalTheme,
      color,
      bgcolor,
      fontSize,
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": MARQUEE_CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("Error generating tech-icon rain:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
