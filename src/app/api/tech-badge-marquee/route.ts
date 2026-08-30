import { NextRequest, NextResponse } from "next/server";
import { techMap } from "@/config/techs.config";
import { generateMarqueeSvg } from "@/templates/marquee.template";
import { MARQUEE_CACHE_CONTROL } from "@/config/constants";
import { badgesBrandBundle } from "@/lib/bundles/badges-brand.bundle";

const bundles: Record<string, Record<string, string>> = {
  brand: badgesBrandBundle,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const techsParam = searchParams.get("techs");
    const widthParam = searchParams.get("width");

    let files: { file: string }[] = [];
    if (techsParam) {
      const requestedTechs = techsParam
        .split(",")
        .map((t) => t.trim().toLowerCase());
      files = requestedTechs
        .map((techStr) => {
          let tech = techStr;
          // Ignore theme suffix if provided
          if (techStr.includes(":")) {
            const parts = techStr.split(":");
            tech = parts[0];
          }

          const badgeFile = techMap[tech as keyof typeof techMap]?.badge;
          if (!badgeFile) return null;

          return { file: badgeFile };
        })
        .filter(Boolean) as { file: string }[];
    } else {
      files = Object.values(techMap)
        .map((tech) => tech.badge)
        .filter(Boolean)
        .sort()
        .map((file) => ({ file: file as string }));
    }

    if (files.length === 0) {
      return new NextResponse("No valid techs provided", { status: 400 });
    }

    const badgeHeight = 20;

    const badgeElements = files
      .map((item) => {
        const bundle = bundles.brand;
        const rawContent = bundle[item.file];

        let content = "";
        let width = 100;

        try {
          if (rawContent) {
            const cleanedSvg = rawContent.replace(/<\?xml.*?\?>/g, "").trim();
            const rootTagMatch = cleanedSvg.match(/^<svg[^>]*>/);
            const rootTag = rootTagMatch ? rootTagMatch[0] : "";

            const viewBoxMatch = rootTag.match(/viewBox="([0-9.\s]+)"/);
            const widthMatch = rootTag.match(/width="([0-9.]+)"/);
            const heightMatch = rootTag.match(/height="([0-9.]+)"/);

            let w = 0;
            let h = 0;

            if (widthMatch && heightMatch) {
              w = parseFloat(widthMatch[1]);
              h = parseFloat(heightMatch[1]);
            } else if (viewBoxMatch) {
              const parts = viewBoxMatch[1].trim().split(/\s+/);
              if (parts.length === 4) {
                w = parseFloat(parts[2]);
                h = parseFloat(parts[3]);
              }
            }

            if (h > 0) {
              width = (w / h) * badgeHeight;
            }

            content = cleanedSvg;

            if (rootTagMatch) {
              let modifiedRootTag = rootTag;
              // Remove width and height from the root tag
              modifiedRootTag = modifiedRootTag.replace(
                /\s+width="[^"]*"/g,
                "",
              );
              modifiedRootTag = modifiedRootTag.replace(
                /\s+height="[^"]*"/g,
                "",
              );
              // Add explicit width and height
              modifiedRootTag = modifiedRootTag.replace(
                /<svg/,
                `<svg width="${width}" height="${badgeHeight}"`,
              );
              content = content.replace(rootTag, modifiedRootTag);
            }
          } else {
            console.warn(`Missing SVG for ${item.file} in theme brand`);
            return null;
          }
        } catch (e) {
          console.error("Error processing badge SVG:", e);
          return null;
        }

        return {
          svgContent: content,
          width,
        };
      })
      .filter(Boolean) as { svgContent: string; width: number }[];

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;

    const wrapperSvg = generateMarqueeSvg({
      elements: badgeElements,
      viewBoxWidth,
      gap: 10,
      targetHeight: badgeHeight,
      extraHeightPadding: 4,
    });

    return new NextResponse(wrapperSvg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": MARQUEE_CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("Error generating tech-badge marquee:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
