import { NextRequest, NextResponse } from "next/server";
import { getSingleIconSvg } from "@/services/tech.service";
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
      "Missing 'name' (or 'tech', 'id') parameter. Example: /api/icon?name=react",
      { status: 400 },
    );
  }

  const theme = searchParams.get("theme") || undefined;
  const sizeParam = searchParams.get("size") || searchParams.get("width");
  const size = sizeParam ? parseInt(sizeParam, 10) : undefined;

  const result = getSingleIconSvg(query, { theme, size });

  if (!result) {
    return new NextResponse(
      `Icon for tech '${query}' not found. See valid technologies at /tech-list.txt`,
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
