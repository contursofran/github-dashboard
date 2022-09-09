import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

export const repositoryRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
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
  });
