export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TreemapNode extends Rect {
  data: any;
}

export function squarifiedTreemap(
  data: any[],
  valueAccessor: (d: any) => number,
  x: number,
  y: number,
  w: number,
  h: number
): TreemapNode[] {
  let totalValue = data.reduce((sum, d) => sum + valueAccessor(d), 0);
  if (totalValue === 0) return [];
  
  let areas = data.map(d => ({
    data: d,
    area: (valueAccessor(d) / totalValue) * (w * h)
  })).sort((a, b) => b.area - a.area);

  const result: TreemapNode[] = [];
  let currentRect = { x, y, w, h };
  let row: typeof areas = [];
  
  const worstAspectRatio = (row: typeof areas, side: number) => {
    if (row.length === 0) return Infinity;
    let s = row.reduce((sum, item) => sum + item.area, 0);
    let maxArea = row[0].area;
    let minArea = row[row.length - 1].area;
    return Math.max(
      (side * side * maxArea) / (s * s),
      (s * s) / (side * side * minArea)
    );
  };

  const layoutRow = (row: typeof areas, rect: Rect) => {
    let s = row.reduce((sum, item) => sum + item.area, 0);
    let isHorizontal = rect.w >= rect.h;
    let side = isHorizontal ? rect.h : rect.w;
    let length = s / side;
    
    let currentPos = isHorizontal ? rect.y : rect.x;
    
    row.forEach(item => {
      let breadth = item.area / length;
      if (isHorizontal) {
        result.push({
          x: rect.x,
          y: currentPos,
          w: length,
          h: breadth,
          data: item.data
        });
        currentPos += breadth;
      } else {
        result.push({
          x: currentPos,
          y: rect.y,
          w: breadth,
          h: length,
          data: item.data
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
    let isHorizontal = currentRect.w >= currentRect.h;
    let side = isHorizontal ? currentRect.h : currentRect.w;
    
    if (row.length === 0) {
      row.push(item);
      continue;
    }
    
    let worstBefore = worstAspectRatio(row, side);
    let worstAfter = worstAspectRatio([...row, item], side);
    
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

