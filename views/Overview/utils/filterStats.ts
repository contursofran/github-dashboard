import { UserStatistics } from "../types/github";

interface Rank {
  contributions: number;
  followers: number;
  issues: number;
  prs: number;
  stargazers: number;
  totalCommits: number;
  totalRepos: number;
}

export const filterStats = (stats: UserStatistics) => {
  const statsArray: number[] = [];

  const totalStars = stats.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount;
  }, 0);
  const totalCommits = stats.contributionsCollection.totalCommitContributions;
  const totalPrs = stats.pullRequests.totalCount;
  const totalIssues = stats.openIssues.totalCount;
  const totalContributions = stats.repositoriesContributedTo.totalCount;

  statsArray.push(
    totalStars,
    totalCommits,
    totalPrs,
    totalIssues,
    totalContributions
  );

  const rank: Rank = {
    contributions: totalContributions,
    followers: stats.followers.totalCount,
    issues: totalIssues,
    prs: totalPrs,
    stargazers: totalStars,
    totalCommits,
    totalRepos: stats.repositories.totalCount,
  };

  return {
    filteredStats: statsArray,
    rank: calculateRank(rank),
  };
};

// https://github.com/anuraghazra/github-readme-stats
export const calculateRank = (props: Rank) => {
  const {
    contributions,
    followers,
    issues,
    prs,
    stargazers,
    totalCommits,
    totalRepos,
  } = props;

  const COMMITS_OFFSET = 1.65;
  const CONTRIBS_OFFSET = 1.65;
  const ISSUES_OFFSET = 1;
  const STARS_OFFSET = 0.75;
  const PRS_OFFSET = 0.5;
  const FOLLOWERS_OFFSET = 0.45;
  const REPO_OFFSET = 1;

  const ALL_OFFSETS =
    CONTRIBS_OFFSET +
    ISSUES_OFFSET +
    STARS_OFFSET +
    PRS_OFFSET +
    FOLLOWERS_OFFSET +
    REPO_OFFSET;

  const RANK_S_VALUE = 1;
  const RANK_DOUBLE_A_VALUE = 25;
  const RANK_A2_VALUE = 45;
  const RANK_A3_VALUE = 60;
  const RANK_B_VALUE = 100;

  const TOTAL_VALUES =
    RANK_S_VALUE + RANK_A2_VALUE + RANK_A3_VALUE + RANK_B_VALUE;

  // prettier-ignore
  const score = (
      totalCommits * COMMITS_OFFSET +
      contributions * CONTRIBS_OFFSET +
      issues * ISSUES_OFFSET +
      stargazers * STARS_OFFSET +
      prs * PRS_OFFSET +
      followers * FOLLOWERS_OFFSET +
      totalRepos * REPO_OFFSET
    ) / 100;

  const normalizedScore = normalcdf(score, TOTAL_VALUES, ALL_OFFSETS) * 100;

  const level = (() => {
    if (normalizedScore < RANK_S_VALUE) return "S+";
    if (normalizedScore < RANK_DOUBLE_A_VALUE) return "S";
    if (normalizedScore < RANK_A2_VALUE) return "A++";
    if (normalizedScore < RANK_A3_VALUE) return "A+";
    return "B+";
  })();

  return { level, score: normalizedScore };
};

const normalcdf = (mean: number, sigma: number, to: number) => {
  const z = (to - mean) / Math.sqrt(2 * sigma * sigma);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  let sign = 1;
  if (z < 0) {
    sign = -1;
  }
  return (1 / 2) * (1 + sign * erf);
};
