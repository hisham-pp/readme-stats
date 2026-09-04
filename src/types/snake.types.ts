import { ContributionCell } from "./github.types";

export type { ContributionCell };

export interface SnakeOptions {
  palette?: string;
  theme?: string;
  color_snake?: string;
  color_dots?: string[];
  color_background?: string;
  size_cell?: number;
  size_dot?: number;
  speed?: number;
}
