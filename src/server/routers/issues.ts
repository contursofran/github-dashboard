import { z } from "zod";
import {
  requireIssueOwner,
  requireRepositoryOwner,
  requireUserId,
} from "../authorization";
import { createRouter } from "../context";

export const issuesRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const userId = requireUserId(ctx);

    return next({ ctx: { ...ctx, userId } });
  })
  .query("get", {
    input: z.object({
      repositoryId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { repositoryId } = input;

      await requireRepositoryOwner(ctx.prisma, ctx.userId, repositoryId);

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

      await requireRepositoryOwner(ctx.prisma, ctx.userId, repositoryId);

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

      await requireIssueOwner(ctx.prisma, ctx.userId, id);
      await requireRepositoryOwner(ctx.prisma, ctx.userId, repositoryId);

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

      await requireIssueOwner(ctx.prisma, ctx.userId, id);

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

      await requireIssueOwner(ctx.prisma, ctx.userId, id);

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

      await requireIssueOwner(ctx.prisma, ctx.userId, id);

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
