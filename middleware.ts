import NextAuth from "next-auth"
import authConfig from "./auth.config"

 
export const { auth } = NextAuth(authConfig)

export default auth ((req:any)=>{
 // console.log(req);
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;
  console.log("Pathname>>>",nextUrl.pathname,isLoggedIn)

})
export const config = {
  matcher: ["/login","/register"],
}

