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
      repositoryId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { repositoryId } = input;

      const data = await ctx.prisma.issues.findMany({
        where: {
          repositoryId,
        },
      });

      return data;
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string().optional(),
      tag: z.string().optional(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      index: z.number(),
      repositoryId: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { description, index, repositoryId, tag, title, type } = input;

      const issue = await ctx.prisma.issues.create({
        data: {
          title,
          description,
          tag,
          type,
          index,
          repositoryId,
        },
      });

      return issue;
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      tag: z.string().optional(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      index: z.number(),
      repositoryId: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { description, id, index, repositoryId, tag, title, type } = input;

      const issue = await ctx.prisma.issues.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          tag,
          type,
          index,
          repositoryId,
        },
      });

      return issue;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { id } = input;

      const issue = await ctx.prisma.issues.delete({
        where: {
          id,
        },
      });

      return issue;
    },
  })
  .mutation("updateType", {
    input: z.object({
      id: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
    }),

    async resolve({ ctx, input }) {
      const { id, type } = input;

      const issues = await ctx.prisma.issues.update({
        where: {
          id,
        },

        data: {
          type,
        },
      });

      return issues;
    },
  })
  .mutation("updateIndex", {
    input: z.object({
      id: z.string(),
      index: z.number(),
    }),

    async resolve({ ctx, input }) {
      const { id, index } = input;

      const issues = await ctx.prisma.issues.update({
        where: {
          id,
        },
        data: {
          index,
        },
      });

      return issues;
    },
  });
