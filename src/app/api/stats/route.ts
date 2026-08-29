import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubStats } from "@/services/github.service";
import { generateStatsSvg } from "@/templates/stats.template";
import { COMMON_CACHE_CONTROL } from "@/config/constants";
import { THEMES } from "@/types/github.types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  
  const globalThemeQuery = searchParams.get("theme") as any;
  const theme = THEMES.includes(globalThemeQuery) ? globalThemeQuery : 'default';

  if (!username) {
    return new NextResponse("Missing username parameter", { status: 400 });
  }

  try {
    const stats = await fetchGitHubStats(username);
    stats.theme = theme;
    const svg = generateStatsSvg(stats);

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
