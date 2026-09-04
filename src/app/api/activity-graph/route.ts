import { NextRequest, NextResponse } from "next/server";
import { fetchActivityGraphStats } from "@/services/github.service";
import { generateActivityGraphSvg } from "@/templates/activity-graph.template";
import { COMMON_CACHE_CONTROL } from "@/config/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const username =
    searchParams.get("username") ||
    searchParams.get("user") ||
    searchParams.get("login");

  if (!username) {
    return new NextResponse("Missing 'username' parameter", { status: 400 });
  }

  const theme = searchParams.get("theme") || "brand";
  const daysParam = searchParams.get("days");
  const days = daysParam ? parseInt(daysParam, 10) : 365;

  const lineColor = searchParams.get("line_color") || undefined;
  const areaColor = searchParams.get("area_color") || undefined;
  const hideTitle = searchParams.get("hide_title") === "true";
  const hideMetrics = searchParams.get("hide_metrics") === "true";

  try {
    const stats = await fetchActivityGraphStats(username, days);
    stats.theme = theme;
    stats.lineColor = lineColor;
    stats.areaColor = areaColor;
    stats.hideTitle = hideTitle;
    stats.hideMetrics = hideMetrics;

    const svg = generateActivityGraphSvg(stats);

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
