import {
  GitHubStats,
  GitHubLanguage,
  ContributionCell,
  StreakStats,
  RepoStats,
} from "@/types/github.types";
import {
  USER_INFO_QUERY,
  TOP_LANGS_QUERY,
  CONTRIBUTIONS_QUERY,
  REPO_INFO_QUERY,
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

function formatStreakDate(dateStr?: string, includeYear = false): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

function formatDateRange(start?: string, end?: string): string {
  if (!start) return "";
  if (!end || start === end) return formatStreakDate(start);
  return `${formatStreakDate(start)} - ${formatStreakDate(end)}`;
}

export async function fetchStreakStats(username: string): Promise<StreakStats> {
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

  const user = data.data.user;
  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  const calendar = user.contributionsCollection?.contributionCalendar;
  const weeks = calendar?.weeks || [];

  const days: { date: string; count: number }[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays || []) {
      days.push({
        date: day.date,
        count: day.contributionCount,
      });
    }
  }

  const totalContributions =
    calendar?.totalContributions ?? days.reduce((acc, d) => acc + d.count, 0);

  let longestStreak = 0;
  let longestStreakStart = "";
  let longestStreakEnd = "";

  let tempStreak = 0;
  let tempStart = "";
  let tempEnd = "";

  for (const day of days) {
    if (day.count > 0) {
      if (tempStreak === 0) {
        tempStart = day.date;
      }
      tempStreak++;
      tempEnd = day.date;

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStreakStart = tempStart;
        longestStreakEnd = tempEnd;
      }
    } else {
      tempStreak = 0;
    }
  }

  let currentStreak = 0;
  let currentStreakStart = "";
  let currentStreakEnd = "";

  if (days.length > 0) {
    const lastIndex = days.length - 1;
    const lastDay = days[lastIndex];

    let startIndex = -1;
    if (lastDay.count > 0) {
      startIndex = lastIndex;
    } else if (lastIndex > 0 && days[lastIndex - 1].count > 0) {
      startIndex = lastIndex - 1;
    }

    if (startIndex >= 0) {
      currentStreakEnd = days[startIndex].date;
      for (let i = startIndex; i >= 0; i--) {
        if (days[i].count > 0) {
          currentStreak++;
          currentStreakStart = days[i].date;
        } else {
          break;
        }
      }
    }
  }

  const firstDate = days[0]?.date ? formatStreakDate(days[0].date, true) : "";
  const totalRange = firstDate ? `${firstDate} - Present` : "";

  return {
    name: user.name || user.login || username,
    totalContributions,
    firstContributionDate: totalRange,
    currentStreak,
    currentStreakStart: formatDateRange(currentStreakStart, currentStreakEnd),
    currentStreakEnd: currentStreakEnd,
    longestStreak,
    longestStreakStart: formatDateRange(longestStreakStart, longestStreakEnd),
    longestStreakEnd: longestStreakEnd,
  };
}

export async function fetchRepoStats(
  owner: string,
  repo: string,
): Promise<RepoStats> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is missing");
  }

  const query = REPO_INFO_QUERY;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { owner, name: repo } }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  const repository = data.data?.repository;
  if (!repository) {
    throw new Error(`Repository ${owner}/${repo} not found`);
  }

  const primaryLang = repository.primaryLanguage;
  const langKey = primaryLang?.name
    ? githubLanguageToTechMapKey[primaryLang.name] || null
    : null;

  const topics = (repository.repositoryTopics?.nodes || []).map(
    (n: any) => n.topic.name,
  );

  return {
    name: repository.name,
    owner: repository.owner?.login || owner,
    description: repository.description || "No description provided.",
    stars: repository.stargazerCount || 0,
    forks: repository.forkCount || 0,
    isFork: repository.isFork || false,
    language: primaryLang
      ? {
          name: primaryLang.name,
          color: primaryLang.color || "#858585",
          techKey: langKey,
        }
      : undefined,
    topics,
  };
}
