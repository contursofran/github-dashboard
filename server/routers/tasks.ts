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
  .query("get", {
    input: z.object({
      repository: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { repository } = input;

      try {
        const tasks = await ctx.prisma.tasks.findMany({
          where: {
            repositoryName: repository,
            userId: ctx.session?.user?.id,
          },
        });
        return tasks;
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
      index: z.number(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      tag: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { index, repositoryName, tag, text, title, type } = input;

      try {
        const task = await ctx.prisma.tasks.create({
          data: {
            title,
            text,
            type,
            tag,
            index,
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
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      repositoryName: z.string(),
      title: z.string(),
      text: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
      tag: z.string(),
      index: z.number(),
    }),
    async resolve({ ctx, input }) {
      const { id, index, repositoryName, tag, text, title, type } = input;

      try {
        const task = await ctx.prisma.tasks.update({
          where: {
            id,
          },
          data: {
            title,
            index,
            text,
            type,
            tag,
            repositoryName,
          },
        });
        return task;
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
