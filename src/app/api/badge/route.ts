import { NextRequest, NextResponse } from "next/server";
import { getSingleBadgeSvg } from "@/services/tech.service";
import { ASSET_CACHE_CONTROL } from "@/config/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query =
    searchParams.get("name") ||
    searchParams.get("tech") ||
    searchParams.get("id") ||
    searchParams.get("q");

  if (!query) {
    return new NextResponse(
      "Missing 'name' (or 'tech', 'id') parameter. Example: /api/badge?name=typescript",
      { status: 400 },
    );
  }

  const heightParam = searchParams.get("height");
  const widthParam = searchParams.get("width");

  const height = heightParam ? parseInt(heightParam, 10) : undefined;
  const width = widthParam ? parseInt(widthParam, 10) : undefined;

  const result = getSingleBadgeSvg(query, { height, width });

  if (!result) {
    return new NextResponse(
      `Badge for tech '${query}' not found. See valid technologies at /tech-list.txt`,
      { status: 404 },
    );
  }

  return new NextResponse(result.svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": ASSET_CACHE_CONTROL,
    },
  });
}
