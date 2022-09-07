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
      text: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      tag: z.string(),
      index: z.number(),
    }),
    async resolve({ ctx, input }) {
      const { index, repositoryName, tag, text, title, type } = input;

      try {
        const issue = await ctx.prisma.issues.create({
          data: {
            title,
            text,
            index,
            type,
            tag,
            repositoryName,
            userId: ctx.session?.user?.id ? ctx.session?.user?.id : "",
          },
        });
        return issue;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      text: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      tag: z.string(),
      index: z.number(),
    }),
    async resolve({ ctx, input }) {
      const { id, index, tag, text, title, type } = input;

      try {
        const issue = await ctx.prisma.issues.update({
          where: {
            id,
          },
          data: {
            title,
            index,
            text,
            type,
            tag,
          },
        });
        return issue;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;

      try {
        const feature = await ctx.prisma.features.delete({
          where: {
            id,
          },
        });
        return feature;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  });
