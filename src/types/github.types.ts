export const THEMES = ["brand", "dark", "light", "bg"] as const;
export type Theme = (typeof THEMES)[number];

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

export interface ContributionCell {
  x: number;
  y: number;
  date: string;
  count: number;
  level: number;
}

export interface StreakStats {
  name: string;
  currentStreak: number;
  currentStreakStart?: string;
  currentStreakEnd?: string;
  longestStreak: number;
  longestStreakStart?: string;
  longestStreakEnd?: string;
  totalContributions: number;
  firstContributionDate?: string;
  theme?: Theme;
}
