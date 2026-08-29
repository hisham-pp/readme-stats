import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubStats } from "@/services/github.service";
import { generateStatsSvg } from "@/templates/stats.template";
import { COMMON_CACHE_CONTROL } from "@/config/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return new NextResponse("Missing username parameter", { status: 400 });
  }

  try {
    const stats = await fetchGitHubStats(username);
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
