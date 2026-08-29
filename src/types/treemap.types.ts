export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TreemapNode extends Rect {
  data: any;
}
