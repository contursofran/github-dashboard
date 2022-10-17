import { Subscription, TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

// create a global event emitter (could be replaced by redis, etc)

export const repositoryRouter = createRouter()
  .query("get", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { name } = input;

      try {
        const repository = await ctx.prisma.repository.findFirst({
          where: {
            name: name,
            userId: ctx.session?.user?.id,
          },
        });

        return {
          repository,
        };
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { name } = input;

      const repository = await ctx.prisma.repository.create({
        data: {
          name,
          owner: ctx.session?.user?.name ? ctx.session?.user?.name : "",
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },

        select: {
          id: true,
          name: true,
        },
      });

      return repository;
    },
  })
  .query("getThreeWithMostTasks", {
    async resolve({ ctx }) {
      const repositories = await ctx.prisma.repository.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
        include: {
          tasks: true,
          features: true,
          issues: true,
        },
        orderBy: {
          features: {
            _count: "desc",
          },
        },
        take: 3,
      });

      return repositories;
    },
  });
