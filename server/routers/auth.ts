import { createRouter } from "../context";

export const authRouter = createRouter().query("getToken", {
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
