import { z } from "zod";
import {
  requireRepositoryOwner,
  requireTaskOwner,
  requireUserId,
} from "../authorization";
import { createRouter } from "../context";

export const tasksRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const userId = requireUserId(ctx);

    return next({ ctx: { ...ctx, userId } });
  })
  // same as featuresRouter
  .query("get", {
    input: z.object({
      repositoryId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { repositoryId } = input;

      await requireRepositoryOwner(ctx.prisma, ctx.userId, repositoryId);

      const data = await ctx.prisma.tasks.findMany({
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

      const task = await ctx.prisma.tasks.create({
        data: {
          title,
          description,
          tag,
          type,
          index,
          repositoryId,
        },
      });

      return task;
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

      await requireTaskOwner(ctx.prisma, ctx.userId, id);
      await requireRepositoryOwner(ctx.prisma, ctx.userId, repositoryId);

      const task = await ctx.prisma.tasks.update({
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

      return task;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { id } = input;

      await requireTaskOwner(ctx.prisma, ctx.userId, id);

      const task = await ctx.prisma.tasks.delete({
        where: {
          id,
        },
      });

      return task;
    },
  })
  .mutation("updateType", {
    input: z.object({
      id: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
    }),

    async resolve({ ctx, input }) {
      const { id, type } = input;

      await requireTaskOwner(ctx.prisma, ctx.userId, id);

      const tasks = await ctx.prisma.tasks.update({
        where: {
          id,
        },

        data: {
          type,
        },
      });

      return tasks;
    },
  })
  .mutation("updateIndex", {
    input: z.object({
      id: z.string(),
      index: z.number(),
    }),

    async resolve({ ctx, input }) {
      const { id, index } = input;

      await requireTaskOwner(ctx.prisma, ctx.userId, id);

      const tasks = await ctx.prisma.tasks.update({
        where: {
          id,
        },
        data: {
          index,
        },
      });

      return tasks;
    },
  });
