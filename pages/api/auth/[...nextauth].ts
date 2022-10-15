import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { DefaultSession } from "next-auth";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "../../../server/db/client";

// extend the default user type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          name: profile.name,
        };
      },
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        id: user.id,
        username: user.username,
      };
    },
  },
};

export default NextAuth(authOptions);
