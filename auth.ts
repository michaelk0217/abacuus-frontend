import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/dashboard/auth/signin",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account && account?.provider === "google") {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("IN SESSION");
      if (token?.idToken && !token.backendAuthenticated) {
        // console.log("BACKEND NOT AUTHENTICATED");
        session.idToken = token.idToken as string;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/auth-web/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_token: token.idToken }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to authenticate with the backend.");
        }

        const data = await response.json();

        // Attach backend tokens and user data to the session
        session.accessToken = data.access_token;
        // console.log(session.accessToken);
        session.refreshToken = data.refresh_token;
        // console.log(session.refreshToken);
        session.user.id = data.user_id;
        session.user.email = data.email;
        token.backendAuthenticated = true;

        // Save accessToken and refreshToken in the token object
        token.accessToken = data.access_token;
        token.refreshToken = data.refresh_token;

        // console.log("Session1: ", session);
      } else if (token.backendAuthenticated) {
        // console.log("BACKEND ALREADY AUTHENTICATED");

        // Retrieve accessToken and refreshToken from the token object
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;

        // console.log("Session2: ", session);
      }
      // console.log("Final session:", session);
      return session;
    },
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage =
        nextUrl.pathname.startsWith("/public") || nextUrl.pathname === "/";

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
  },
});
