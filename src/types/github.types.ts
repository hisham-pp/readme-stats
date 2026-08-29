export const THEMES = ['dark', 'light', 'default'] as const;
export type Theme = typeof THEMES[number];

export interface GitHubStats {
  name: string;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  rank: string;
  theme?: Theme;
}

export interface GitHubLanguage {
  name: string;
  color: string;
  size: number;
  techKey?: string | null;
  percent: string;
  embeddedSvg?: string;
}
