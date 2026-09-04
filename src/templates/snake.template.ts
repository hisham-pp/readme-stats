import { ContributionCell, SnakeOptions } from "@/types/snake.types";
import { cellsToGrid } from "@/utils/snake/grid";
import { defaultSnake } from "@/utils/snake/snake";
import { getBestRoute } from "@/utils/snake/solver/getBestRoute";
import { getPathToPose } from "@/utils/snake/solver/getPathToPose";
import { createSvg } from "@/utils/snake/svg";
import { palettes } from "@/utils/snake/palettes";

export function generateSnakeSvg(
  cells: ContributionCell[],
  options: SnakeOptions = {},
): string {
  const grid = cellsToGrid(cells);
  const snake = defaultSnake;

  const chain = getBestRoute(grid, snake)!;
  chain.push(...getPathToPose(chain.slice(-1)[0], snake)!);

  const paletteKey = (options.palette ||
    options.theme ||
    "github-dark") as keyof typeof palettes;
  const palette = palettes[paletteKey] || palettes["github-dark"];

  const drawOptions: any = {
    sizeDotBorderRadius: 2,
    sizeCell: options.size_cell || 16,
    sizeDot: options.size_dot || 12,
    ...palette,
  };

  if (options.color_snake) {
    drawOptions.colorSnake = options.color_snake;
  }
  if (options.color_dots && options.color_dots.length === 5) {
    drawOptions.colorDots = options.color_dots;
    drawOptions.colorEmpty = options.color_dots[0];
  }
  if (options.color_background) {
    drawOptions.colorBackground = options.color_background;
  }

  const animationOptions = {
    stepDurationMs: options.speed || 100,
  };

  const pointCells = cells.map((c) => ({ x: c.x, y: c.y }));
  return createSvg(grid, pointCells, chain, drawOptions, animationOptions);
}
