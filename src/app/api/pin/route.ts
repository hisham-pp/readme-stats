import { NextRequest, NextResponse } from "next/server";
import { fetchRepoStats } from "@/services/github.service";
import { generatePinSvg } from "@/templates/pin.template";
import { COMMON_CACHE_CONTROL } from "@/config/constants";
import { THEMES } from "@/types/github.types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const defaultOwner =
    searchParams.get("owner") || searchParams.get("username") || "";

  // Extract repo names from repos or repo params (comma-separated or multiple params)
  const repoQueries = searchParams.getAll("repo");
  const reposParam = searchParams.get("repos");

  const repoEntries: string[] = [];
  if (reposParam) {
    repoEntries.push(
      ...reposParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
  } else if (repoQueries.length > 0) {
    for (const q of repoQueries) {
      repoEntries.push(
        ...q
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    }
  }

  if (repoEntries.length === 0) {
    return new NextResponse("Missing 'repo' or 'repos' parameter", {
      status: 400,
    });
  }

  const targets = repoEntries.map((entry) => {
    if (entry.includes("/")) {
      const parts = entry.split("/");
      return { owner: parts[0].trim(), name: parts[1].trim() };
    }
    return { owner: defaultOwner, name: entry };
  });

  if (targets.some((t) => !t.owner)) {
    return new NextResponse(
      "Missing 'username' (or 'owner') parameter for repository",
      {
        status: 400,
      },
    );
  }

  const globalThemeQuery = searchParams.get("theme") as any;
  const theme = THEMES.includes(globalThemeQuery) ? globalThemeQuery : "brand";

  const showOwnerParam = searchParams.get("show_owner");
  const hasDistinctOwners = new Set(targets.map((t) => t.owner)).size > 1;
  const showOwner =
    showOwnerParam === "true" ||
    (showOwnerParam !== "false" && hasDistinctOwners);

  const customDescription = searchParams.get("description");

  const colsParam = searchParams.get("cols");
  const cols = colsParam ? parseInt(colsParam, 10) : undefined;

  try {
    const statsList = await Promise.all(
      targets.map(async (target, idx) => {
        const stats = await fetchRepoStats(target.owner, target.name);
        stats.theme = theme;
        stats.showOwner = showOwner;
        if (customDescription && targets.length === 1 && idx === 0) {
          stats.description = customDescription;
        }
        return stats;
      }),
    );

    const svg = generatePinSvg(statsList, { cols, theme });

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
