import { Rect, TreemapNode } from "@/types/treemap.types";

export function squarifiedTreemap(
  data: any[],
  valueAccessor: (d: any) => number,
  x: number,
  y: number,
  w: number,
  h: number,
): TreemapNode[] {
  const totalValue = data.reduce((sum, d) => sum + valueAccessor(d), 0);
  if (totalValue === 0) return [];

  const areas = data
    .map((d) => ({
      data: d,
      area: (valueAccessor(d) / totalValue) * (w * h),
    }))
    .sort((a, b) => b.area - a.area);

  const result: TreemapNode[] = [];
  const currentRect = { x, y, w, h };
  let row: typeof areas = [];

  const worstAspectRatio = (row: typeof areas, side: number) => {
    if (row.length === 0) return Infinity;
    const s = row.reduce((sum, item) => sum + item.area, 0);
    const maxArea = row[0].area;
    const minArea = row[row.length - 1].area;
    return Math.max(
      (side * side * maxArea) / (s * s),
      (s * s) / (side * side * minArea),
    );
  };

  const layoutRow = (row: typeof areas, rect: Rect) => {
    const s = row.reduce((sum, item) => sum + item.area, 0);
    const isHorizontal = rect.w >= rect.h;
    const side = isHorizontal ? rect.h : rect.w;
    const length = s / side;

    let currentPos = isHorizontal ? rect.y : rect.x;

    row.forEach((item) => {
      const breadth = item.area / length;
      if (isHorizontal) {
        result.push({
          x: rect.x,
          y: currentPos,
          w: length,
          h: breadth,
          data: item.data,
        });
        currentPos += breadth;
      } else {
        result.push({
          x: currentPos,
          y: rect.y,
          w: breadth,
          h: length,
          data: item.data,
        });
        currentPos += breadth;
      }
    });

    if (isHorizontal) {
      rect.x += length;
      rect.w -= length;
    } else {
      rect.y += length;
      rect.h -= length;
    }
  };

  for (let i = 0; i < areas.length; i++) {
    const item = areas[i];
    const isHorizontal = currentRect.w >= currentRect.h;
    const side = isHorizontal ? currentRect.h : currentRect.w;

    if (row.length === 0) {
      row.push(item);
      continue;
    }

    const worstBefore = worstAspectRatio(row, side);
    const worstAfter = worstAspectRatio([...row, item], side);

    if (worstAfter <= worstBefore) {
      row.push(item);
    } else {
      layoutRow(row, currentRect);
      row = [item];
    }
  }

  if (row.length > 0) {
    layoutRow(row, currentRect);
  }

  return result;
}
