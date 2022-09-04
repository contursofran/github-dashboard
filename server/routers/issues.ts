import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

export const issuesRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("get", {
    input: z.object({
      repository: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { repository } = input;

      try {
        const issues = await ctx.prisma.issues.findMany({
          where: {
            repositoryName: repository,
            userId: ctx.session?.user?.id,
          },
        });
        return issues;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  })
  .mutation("create", {
    input: z.object({
      repositoryName: z.string(),
      title: z.string(),
      text: z.string().optional(),
      type: z.string(),
      tag: z.string().nullable(),
    }),
    async resolve({ ctx, input }) {
      const { repositoryName, tag, text, title, type } = input;

      try {
        const task = await ctx.prisma.issues.create({
          data: {
            title,
            text,
            type,
            tag,
            repositoryName,
            userId: ctx.session?.user?.id ? ctx.session?.user?.id : "",
          },
        });
        return task;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  });
