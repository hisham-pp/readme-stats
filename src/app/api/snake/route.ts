import { NextRequest, NextResponse } from "next/server";
import { fetchUserContributions } from "@/services/github.service";
import { generateSnakeSvg } from "@/templates/snake.template";
import { COMMON_CACHE_CONTROL } from "@/config/constants";
import type { SnakeOptions } from "@/types/snake.types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return new NextResponse("Missing username parameter", { status: 400 });
  }

  let palette =
    searchParams.get("palette") || searchParams.get("theme") || "github-dark";
  if (palette === "dark") palette = "github-dark";
  if (palette === "light") palette = "github-light";

  const colorSnake = searchParams.get("color_snake") || undefined;
  const colorBackground = searchParams.get("color_background") || undefined;

  let colorDots: string[] | undefined = undefined;
  const dotsParam = searchParams.get("color_dots");
  if (dotsParam) {
    const split = dotsParam.split(/[,;]/);
    if (split.length === 5) {
      colorDots = split;
    }
  }

  const speedParam = searchParams.get("speed");
  const speed = speedParam ? parseInt(speedParam, 10) : undefined;

  const options: SnakeOptions = {
    palette,
    color_snake: colorSnake,
    color_dots: colorDots,
    color_background: colorBackground,
    speed,
  };

  try {
    const cells = await fetchUserContributions(username);
    if (!cells || cells.length === 0) {
      return new NextResponse("No contribution data found for user", {
        status: 404,
      });
    }

    const svg = generateSnakeSvg(cells, options);

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
