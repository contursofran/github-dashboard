import { TRPCError } from "@trpc/server";
import { createRouter } from "../context";

export const authRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getToken", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.account.findFirst({
          select: {
            access_token: true,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  });
