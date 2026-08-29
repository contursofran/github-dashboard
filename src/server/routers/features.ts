import { z } from "zod";
import {
  requireFeatureOwner,
  requireRepositoryOwner,
  requireUserId,
} from "../authorization";
import { createRouter } from "../context";

export const featuresRouter = createRouter()
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

      const data = await ctx.prisma.features.findMany({
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

      const feature = await ctx.prisma.features.create({
        data: {
          title,
          description,
          tag,
          type,
          index,
          repositoryId,
        },
      });

      return feature;
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      tag: z.string().optional(),
      type: z.enum(["Todo", "InProgress", "Done"]),
    }),

    async resolve({ ctx, input }) {
      const { description, id, tag, title, type } = input;

      await requireFeatureOwner(ctx.prisma, ctx.userId, id);

      const feature = await ctx.prisma.features.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          tag,
          type,
        },
      });

      return feature;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { id } = input;

      await requireFeatureOwner(ctx.prisma, ctx.userId, id);

      const feature = await ctx.prisma.features.delete({
        where: {
          id,
        },
      });

      return feature;
    },
  })
  .mutation("updateType", {
    input: z.object({
      id: z.string(),
      type: z.enum(["Todo", "InProgress", "Done"]),
    }),

    async resolve({ ctx, input }) {
      const { id, type } = input;

      await requireFeatureOwner(ctx.prisma, ctx.userId, id);

      const feature = await ctx.prisma.features.update({
        where: {
          id,
        },

        data: {
          type,
        },
      });

      return feature;
    },
  })
  .mutation("updateIndex", {
    input: z.object({
      id: z.string(),
      index: z.number(),
    }),

    async resolve({ ctx, input }) {
      const { id, index } = input;

      await requireFeatureOwner(ctx.prisma, ctx.userId, id);

      const feature = await ctx.prisma.features.update({
        where: {
          id,
        },
        data: {
          index,
        },
      });

      return feature;
    },
  });
