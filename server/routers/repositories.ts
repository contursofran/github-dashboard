import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

export const repositoriesRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getFeatures", {
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
  });
