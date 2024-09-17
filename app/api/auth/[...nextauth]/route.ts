import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
