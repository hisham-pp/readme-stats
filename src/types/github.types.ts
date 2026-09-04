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

export interface RepoStats {
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  language?: {
    name: string;
    color: string;
    techKey?: string | null;
  };
  topics?: string[];
  isFork?: boolean;
  theme?: Theme;
  showOwner?: boolean;
}

export interface ActivityGraphPoint {
  date: string;
  count: number;
  dayOfWeek: number;
}

export interface ActivityGraphStats {
  name: string;
  username: string;
  totalContributions: number;
  weeklyAverage: number;
  maxDayCount: number;
  peakDate: string;
  points: ActivityGraphPoint[];
  months: { label: string; xPercent: number }[];
  theme?: string;
  lineColor?: string;
  areaColor?: string;
  hideTitle?: boolean;
  hideMetrics?: boolean;
}
