import { Features, Issues, Tasks } from "@prisma/client";

export interface GuestData {
  repositories: {
    description: string;
    features: {
      cards: Features[];
    };
    issues: {
      cards: Issues[];
    };
    language: string;
    name: string;
    pushed_at: string;
    tasks: {
      cards: Tasks[];
    };
    visibility: string;
  }[];
  stats: {
    contributions: {
      weekData: {
        contributionDays: {
          contributionCount: number;
          contributionLevel: string;
          date: string;
          weekday: number;
        }[];
      };
    };
    githubStats: {
      contributions: number;
      followers: number;
      issues: number;
      prs: number;
      stargazers: number;
      totalCommits: number;
      totalRepos: number;
    };
    timeline: {
      created_at: string;
      id: string;
      payload: {
        commits: {
          message: string;
        }[];
        size: number;
      };
      repo: {
        name: string;
        url: string;
      };

      type: string;
    }[];
    topLanguages: {
      name: string;
      value: number;
    }[];
  };

  user: {
    avatar_url: string;
    email: string;
    name: string;
  };
}

const guestUser: GuestData =
  // generate fake data
  {
    user: {
      name: "Guest user",
      email: "guestuser@email.com",
      avatar_url: "",
    },
    repositories: [
      {
        name: "Example Public Repository",
        description: "This is a repository for guest users",
        language: "JavaScript",
        pushed_at: "2022-08-01T00:00:00Z",
        visibility: "public",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "2",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
      },
      {
        name: "Example Public Repository 3",
        description: "This is a repository for guest users",
        language: "CSS",
        pushed_at: "2022-08-01T00:00:00Z",
        visibility: "public",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "Done",
              tag: "LOW",
              id: "2",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              repositoryId: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "Done",
              tag: "LOW",
              id: "1",
              repositoryId: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "Done",
              tag: "MEDIUM",
              id: "0",
              repositoryId: "1",
              index: 0,
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              repositoryId: "1",
              index: 0,
            },
          ],
        },
      },
      {
        name: "Example Public Repository 2",
        description: "This is a repository for guest users",
        language: "TypeScript",
        pushed_at: "2021-06-04T00:00:00Z",
        visibility: "public",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "Done",
              tag: "LOW",
              id: "2",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Done",
              tag: "MEDIUM",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
      },
      {
        name: "Example Private Repository",
        description: "This is a repository for guest users",
        language: "TypeScript",
        pushed_at: "2021-08-01T00:00:00Z",
        visibility: "private",
        features: {
          cards: [
            {
              title: "Feature 1",
              description: "Example card",
              type: "Todo",
              tag: "HIGH",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Feature 2",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "2",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        tasks: {
          cards: [
            {
              title: "Task 1",
              description: "Example card",
              type: "Todo",
              tag: "LOW",
              id: "0",
              repositoryId: "1",
              index: 0,
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "LOW",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
            {
              title: "Task 1",
              description: "Example card",
              type: "InProgress",
              tag: "MEDIUM",
              id: "0",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
        issues: {
          cards: [
            {
              title: "Task 2",
              description: "Example card",
              type: "Todo",
              tag: "MEDIUM",
              id: "1",
              index: 0,
              repositoryId: "1",
            },
          ],
        },
      },
    ],
    stats: {
      topLanguages: [
        {
          name: "TypeScript",
          value: 30,
        },
        {
          name: "CSS",
          value: 15,
        },
        {
          name: "JavaScript",
          value: 20,
        },
        {
          name: "C++",
          value: 10,
        },
        {
          name: "Python",
          value: 5,
        },
      ],
      githubStats: {
        contributions: 12,
        issues: 15,
        prs: 23,
        followers: 20,
        stargazers: 30,
        totalCommits: 400,
        totalRepos: 10,
      },
      contributions: {
        weekData: {
          contributionDays: [
            {
              contributionCount: 0,
              contributionLevel: "NONE",
              date: "2021-10-17",
              weekday: 0,
            },
            {
              contributionCount: 0,
              contributionLevel: "NONE",
              date: "2021-10-18",
              weekday: 1,
            },
            {
              contributionCount: 0,
              contributionLevel: "NONE",
              date: "2021-10-19",
              weekday: 2,
            },
            {
              contributionCount: 0,
              contributionLevel: "FIRST_QUARTILE",
              date: "2021-10-20",
              weekday: 3,
            },
            {
              contributionCount: 0,
              contributionLevel: "NONE",
              date: "2021-10-21",
              weekday: 4,
            },
            {
              contributionCount: 0,
              contributionLevel: "NONE",
              date: "2021-10-22",
              weekday: 5,
            },
            {
              contributionCount: 0,
              contributionLevel: "NONE",
              date: "2021-10-23",
              weekday: 6,
            },
          ],
        },
      },

      timeline: [
        {
          type: "PushEvent",
          created_at: "2022-10-17T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Update README.md",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
        {
          type: "IssuesEvent",
          created_at: "2022-10-16T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Update README.md",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
        {
          type: "PushEvent",
          created_at: "2022-10-15T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Refactor database",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
        {
          type: "PushEvent",
          created_at: "2022-10-12T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Fix header",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
        {
          type: "PushEvent",
          created_at: "2022-10-10T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Implement new feature",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
        {
          type: "PushEvent",
          created_at: "2022-10-07T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Add tests",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
        {
          type: "PushEvent",
          created_at: "2022-10-05T01:09:41Z",
          payload: {
            commits: [
              {
                message: "Remove unused code",
              },
            ],
            size: 1,
          },
          id: "1",
          repo: {
            name: "fconturso/Example Public Repository 1",
            url: "https://api.github.com/repos/fconturso/github-dashboard",
          },
        },
      ],
    },
  };

export { guestUser };
