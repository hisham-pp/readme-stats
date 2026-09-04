import {
  GitHubStats,
  GitHubLanguage,
  ContributionCell,
} from "@/types/github.types";
import {
  USER_INFO_QUERY,
  TOP_LANGS_QUERY,
  CONTRIBUTIONS_QUERY,
} from "./github.queries";

import { githubLanguageToTechMapKey } from "@/config/github.config";

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is missing");
  }

  const query = USER_INFO_QUERY;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  const user = data.data.user;

  const totalStars = user.repositories.nodes.reduce(
    (acc: number, repo: any) => acc + repo.stargazers.totalCount,
    0,
  );

  return {
    name: user.name || user.login,
    totalCommits: user.contributionsCollection.totalCommitContributions,
    totalPRs: user.pullRequests.totalCount,
    totalIssues: user.issues.totalCount,
    totalStars: totalStars,
    rank: "A+", // Simplified rank logic for now
  };
}

export async function fetchTopLanguages(
  username: string,
): Promise<GitHubLanguage[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is missing");
  }

  const query = TOP_LANGS_QUERY;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  const repos = data.data.user.repositories.nodes;
  const langMap: Record<
    string,
    { name: string; color: string; size: number; techKey?: string | null }
  > = {};

  repos.forEach((repo: any) => {
    repo.languages.edges.forEach((edge: any) => {
      const { size, node } = edge;
      if (!langMap[node.name]) {
        langMap[node.name] = {
          name: node.name,
          color: node.color,
          size: 0,
          techKey: githubLanguageToTechMapKey[node.name] || null,
        };
      }
      langMap[node.name].size += size;
    });
  });

  const totalSize = Object.values(langMap).reduce(
    (acc, curr) => acc + curr.size,
    0,
  );

  const topLangs = Object.values(langMap)
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .map((lang) => ({
      ...lang,
      percent: ((lang.size / totalSize) * 100).toFixed(2),
    }));

  return topLangs;
}

export async function fetchUserContributions(
  username: string,
): Promise<ContributionCell[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is missing");
  }

  const query = CONTRIBUTIONS_QUERY;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  const weeks =
    data.data.user.contributionsCollection.contributionCalendar.weeks;

  return weeks.flatMap(({ contributionDays }: any, x: number) =>
    contributionDays.map((d: any) => ({
      x,
      y: d.weekday,
      date: d.date,
      count: d.contributionCount,
      level:
        (d.contributionLevel === "FOURTH_QUARTILE" && 4) ||
        (d.contributionLevel === "THIRD_QUARTILE" && 3) ||
        (d.contributionLevel === "SECOND_QUARTILE" && 2) ||
        (d.contributionLevel === "FIRST_QUARTILE" && 1) ||
        0,
    })),
  );
}
