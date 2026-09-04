import { NextRequest } from "next/server";
import { handleTopLangs } from "../route";

export async function GET(request: NextRequest) {
  const format =
    request.nextUrl.searchParams.get("format") ||
    request.nextUrl.searchParams.get("style");
  const treemapType = format === "badge" ? "treemap-badge" : "treemap";
  return handleTopLangs(request, treemapType);
}
