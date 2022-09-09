import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

export const tasksRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  // same as featuresRouter
  .query("get", {
    input: z.object({
      repositoryId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { repositoryId } = input;

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
      description: z.string(),
      tag: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      index: z.number(),
      repositoryId: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { description, index, repositoryId, tag, title, type } = input;

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
      description: z.string(),
      tag: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      index: z.number(),
      repositoryId: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { description, id, index, repositoryId, tag, title, type } = input;

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

      const task = await ctx.prisma.tasks.delete({
        where: {
          id,
        },
      });

      return task;
    },
  });
