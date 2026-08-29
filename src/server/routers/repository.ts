import { z } from "zod";
import { requireUserId } from "../authorization";
import { createRouter } from "../context";

// create a global event emitter (could be replaced by redis, etc)

export const repositoryRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const userId = requireUserId(ctx);

    return next({ ctx: { ...ctx, userId } });
  })
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
            userId: ctx.userId,
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
          owner: ctx.session?.user?.username ?? "",
          user: {
            connect: {
              id: ctx.userId,
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
          userId: ctx.userId,
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
