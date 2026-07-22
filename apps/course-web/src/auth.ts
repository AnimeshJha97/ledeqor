import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { upsertUserFromAuth } from "@/server/users/user-repository";

const trustHost =
  process.env.AUTH_TRUST_HOST === "true" ||
  process.env.NODE_ENV !== "production" ||
  Boolean(process.env.VERCEL || process.env.CF_PAGES);

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      const appUser = await upsertUserFromAuth({
        email: user.email,
        name: user.name,
        image: user.image
      });

      return Boolean(appUser);
    },
    async jwt({ token, user }) {
      const source = {
        email: user?.email ?? token.email,
        name: user?.name ?? token.name,
        image: user?.image ?? token.picture
      };
      const appUser = await upsertUserFromAuth(source);

      if (appUser) {
        token.appUserId = appUser.id;
        token.role = appUser.role;
        token.name = appUser.name ?? token.name;
        token.picture = appUser.image ?? token.picture;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.appUserId as string;
        session.user.role = token.role as string;
      }

      return session;
    }
  },
  pages: {
    signIn: "/sign-in"
  }
});
