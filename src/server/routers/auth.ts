import { createRouter } from "../context";

export const authRouter = createRouter().query("getToken", {
  async resolve({ ctx }) {
    const user = ctx.session?.user?.id;

    try {
      return await ctx.prisma.user.findUnique({
        where: {
          id: user,
        },
        select: {
          accounts: {
            select: {
              access_token: true,
            },
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  },
});
