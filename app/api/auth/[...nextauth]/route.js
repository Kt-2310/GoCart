import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [], // add later (Google, Credentials, etc.)
});

export { handler as GET, handler as POST };