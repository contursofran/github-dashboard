import { Octokit } from "@octokit/core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ContributionsCollection, Query } from "../../types/github";
import { createRouter } from "../context";

export const githubRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else {
      const user = ctx.session?.user?.id;

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
  .query("getUsername", {
    async resolve({ ctx }) {
      const token = ctx.token;

      const headers = {
        Authorization: `bearer ${token}`,
      };

      const body = {
        query: `query {
          viewer {
            login
          }
        }`,
      };

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });

      if (res.ok) {
        const { data }: { data: Query } = await res.json();
        return data.viewer.login;
      }
    },
  })
  .query("getUserContributions", {
    input: z.object({
      username: z.string().nullable().optional(),
    }),

    async resolve({ ctx, input }) {
      const { username } = input;
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
    input: z.object({
      username: z.string().nullable().optional(),
    }),

    async resolve({ ctx, input }) {
      const { username } = input;
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
  });
