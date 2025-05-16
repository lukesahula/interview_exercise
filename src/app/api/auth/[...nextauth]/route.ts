import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": `${process.env.NEXT_PUBLIC_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          },
        );
        const responseJSON = await response.json();
        const user = {
          id: credentials?.username || "",
          name: credentials?.username || "",
          accessToken: responseJSON.access_token,
        };
        if (response.ok && user.accessToken) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
