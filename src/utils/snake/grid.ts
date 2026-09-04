export type Point = { x: number; y: number };
export type Color = 1 | 2 | 3 | 4;
export type Empty = 0;

export interface Grid {
  width: number;
  height: number;
  data: Uint8Array;
}

export const createEmptyGrid = (width: number, height: number): Grid => ({
  width,
  height,
  data: new Uint8Array(width * height),
});

export const getIndex = (grid: Grid, x: number, y: number) =>
  x * grid.height + y;

export const around4 = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
] as const;

export const pointEquals = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export const isInside = (grid: Grid, x: number, y: number) =>
  x >= 0 && x < grid.width && y >= 0 && y < grid.height;

export const isInsideLarge = (grid: Grid, m: number, x: number, y: number) =>
  x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;

export const getColor = (grid: Grid, x: number, y: number): Color | Empty =>
  (isInside(grid, x, y) ? grid.data[getIndex(grid, x, y)] : 0) as Color | Empty;

export const isEmpty = (color: Color | Empty): color is Empty => color === 0;

export const setColor = (grid: Grid, x: number, y: number, color: Color) => {
  grid.data[getIndex(grid, x, y)] = color;
};

export const setColorEmpty = (grid: Grid, x: number, y: number) => {
  grid.data[getIndex(grid, x, y)] = 0;
};

export const copyGrid = (grid: Grid): Grid => ({
  width: grid.width,
  height: grid.height,
  data: new Uint8Array(grid.data),
});

export const cellsToGrid = (
  cells: { x: number; y: number; level: number }[],
): Grid => {
  const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
  const height = Math.max(0, ...cells.map((c) => c.y)) + 1;

  const grid = createEmptyGrid(width, height);
  for (const c of cells) {
    if (c.level > 0) setColor(grid, c.x, c.y, c.level as Color);
    else setColorEmpty(grid, c.x, c.y);
  }

  return grid;
};
