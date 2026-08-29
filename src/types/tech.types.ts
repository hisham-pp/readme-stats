export interface TechItem {
  id: string;
  name: string;
  badge: string;
  icon: string;
  category: string;
  tags: string[];
}

export interface SvgBundleItem {
  content: string;
  contentNoDimensions: string;
  width: number;
}
