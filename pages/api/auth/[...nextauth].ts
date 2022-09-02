import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { DefaultUser } from "next-auth";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "../../../server/db/client";

// extend the default user type
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          // I wish to request additional permission scopes.
          scope: "repo user",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: user,
      };
    },
  },
};

export default NextAuth(authOptions);
