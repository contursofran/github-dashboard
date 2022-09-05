import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

export const featuresRouter = createRouter()
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
        const features = await ctx.prisma.features.findMany({
          where: {
            repositoryName: repository,
            userId: ctx.session?.user?.id,
          },
        });
        return features;
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
    }),
    async resolve({ ctx, input }) {
      const { repositoryName, tag, text, title, type } = input;

      try {
        const feature = await ctx.prisma.features.create({
          data: {
            title,
            text,
            type,
            tag,
            repositoryName,
            userId: ctx.session?.user?.id ? ctx.session?.user?.id : "",
          },
        });
        return feature;
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
    }),
    async resolve({ ctx, input }) {
      const { id, tag, text, title, type } = input;

      try {
        const feature = await ctx.prisma.features.update({
          where: {
            id,
          },
          data: {
            title,
            text,
            type,
            tag,
          },
        });
        return feature;
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
