import { Octokit } from "@octokit/core";
import { TRPCError } from "@trpc/server";
import {
  ContributionsCollection,
  Repository,
  UserStatistics,
} from "../../views/Overview/types/github";
import { createRouter } from "../context";

interface UserTopLanguages {
  data: {
    user: {
      repositories: {
        nodes: Repository[];
      };
    };
  };
}

interface UserStats {
  data: {
    user: UserStatistics;
  };
}

export const githubRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else {
      const user = ctx.session.user.id;

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const token = await ctx.prisma.user.findUnique({
        where: {
          id: user,
        },
        select: {
          accounts: {
            select: {
              access_token: true,
            },
          },
        },
      });

      return next({
        ctx: {
          ...ctx,
          token: token?.accounts[0].access_token,
        },
      });
    }
  })
  .query("getUserContributions", {
    async resolve({ ctx }) {
      const username = ctx.session?.user.username;
      const token = ctx.token;

      const headers = {
        Authorization: `bearer ${token}`,
      };

      const body = {
        query: `query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    contributionLevel
                    date
                    weekday
                  }
                  firstDay
                }
                months  {
                  name
                    year
                    firstDay
                    totalWeeks  
                }
              }
            }
          }
        }`,
      };

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });

      if (res.ok) {
        const {
          data,
        }: {
          data: { user: { contributionsCollection: ContributionsCollection } };
        } = await res.json();
        return data.user.contributionsCollection.contributionCalendar;
      }
    },
  })
  .query("getUserEvents", {
    async resolve({ ctx }) {
      const username = ctx.session?.user.username;
      const token = ctx.token;

      const octokit = new Octokit({ auth: token });

      if (username) {
        const events = await octokit
          .request("GET /users/{username}/events", {
            username: username,
          })
          .then((res) => res.data)
          .catch((err) => console.log(err));

        return events;
      }
    },
  })
  .query("getUserTopLanguages", {
    async resolve({ ctx }) {
      const username = ctx.session?.user.username;
      const token = ctx.token;

      const headers = {
        Authorization: `bearer ${token}`,
      };

      const body = {
        query: `query {
          user(login: "${username}") {
            # fetch only owner repos & not forks
            repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
              nodes {
                name
                languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                  edges {
                    size
                    node {
                      color
                      name
                    }
                  }
                }
              }
            }
          }
        }`,
      };

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });

      if (res.ok) {
        const data: UserTopLanguages = await res.json();
        return data.data.user.repositories.nodes;
      }
    },
  })
  .query("getUserStats", {
    async resolve({ ctx }) {
      const username = ctx.session?.user.username;
      const token = ctx.token;

      const headers = {
        Authorization: `bearer ${token}`,
      };

      const body = {
        query: `query {
        user(login: "${username}") {
          name
          login
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
          repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests(first: 1) {
            totalCount
          }
          openIssues: issues(states: OPEN) {
            totalCount
          }
          closedIssues: issues(states: CLOSED) {
            totalCount
          }
          followers {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
              name
              stargazers {
                totalCount
              }
            }
          }
      }
    }`,
      };

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });

      if (res.ok) {
        const data: UserStats = await res.json();
        return data.data.user;
      }
    },
  });
