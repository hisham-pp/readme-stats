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

    const badgeElements = files
      .map((item) => {
        const bundle = bundles.brand;
        const rawContent = bundle[item.file];

        let content = "";
        let width = 100;

        try {
          if (rawContent) {
            content = rawContent.replace(/<\?xml.*?\?>/g, "").trim();
            const widthMatch = content.match(/<svg[^>]*width="([0-9.]+)"/);
            if (widthMatch) {
              width = parseFloat(widthMatch[1]);
            }
            let noDims = content.replace(/<svg([^>]*)width="[^"]*"/, "<svg$1");
            noDims = noDims.replace(/<svg([^>]*)height="[^"]*"/, "<svg$1");
            content = noDims;
          } else {
            console.warn(`Missing SVG for ${item.file} in theme brand`);
            return null;
          }
        } catch {
          // ignore
        }

        return {
          svgContent: content,
          width,
        };
      })
      .filter(Boolean) as { svgContent: string; width: number }[];

    const viewBoxWidth = widthParam ? parseInt(widthParam, 10) || 850 : 850;
    const height = 24; // standard flat-square badge height is usually 20, we give it a bit of padding

    const wrapperSvg = generateMarqueeSvg({
      elements: badgeElements,
      viewBoxWidth,
      gap: 10,
      targetHeight: height,
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
