import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { apiAuthPrefix, authRoutes, LOGIN_REDIRECT, publicRoutes } from "./routes";


export const { auth } = NextAuth(authConfig);
const checkIsPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
};

export default auth((req) => {
  // console.log(req);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = checkIsPublicRoute(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);  
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoutes) {
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT,nextUrl));
    }

    return

  }
if(!isLoggedIn && !isPublicRoute){
  return Response.redirect(new URL('/login',nextUrl));

}
 // console.log("Pathname>>>", nextUrl.pathname, isLoggedIn)
return;
});
// export const config = {
//   matcher: ["/login","/register"],
// }
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',

  ],
}
