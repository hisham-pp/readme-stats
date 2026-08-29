export interface TechDefault {
  name: string;
  id: string;
  icon?: string;
}

export interface TechBadge {
  color: string;
  textColor?: string;
  iconPosition?: "left" | "right";
  iconTheme?: "light" | "dark" | "brand";
  showText?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  textWidth?: number;
  gradientBg?: string;
  defs?: string;
}

export interface TechIcon {
  iconBgColor?: string;
  iconTheme?: "light" | "dark" | "brand";
}
