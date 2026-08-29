export interface GitHubStats {
  name: string;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  rank: string;
}

export interface GitHubLanguage {
  name: string;
  color: string;
  size: number;
  techKey?: string | null;
  percent: string;
  embeddedSvg?: string;
}
