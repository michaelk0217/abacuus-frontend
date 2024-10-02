export { auth as middleware } from "./auth";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  // matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)'],

  //this is to prevent the middleware from being applied to the landing page
  matcher: ["/((?!api|_next/static|_next/image|.*.png$|landing).*)"],
};
