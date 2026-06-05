import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserByEmail } from "./lib/user"
 
 declare module "next-auth" {
interface Session{
  user:{
    role:"USER" | "ADMIN";
    userId:string;
  }& DefaultSession["user"];
} 

}
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  events:{
    async linkAccount({user}){
          await db.user.update({
            where:{
              id:user.id
            }
          ,
          data:{
            emailVerified: new Date()
          }});
    }
  }
  
  ,
  
 callbacks: {
  async  jwt({ token}) {
      if (token) { // User is available during sign-in
        const user = await getUserByEmail(token.email as string);
        if (!user) return token;
        token.id = user.id
        token.role = user.role as ("USER" | "ADMIN");
      }
     // console.log("token>>>>",token)
      return token
    },
  async  session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },





  
//   callbacks:{
//     async jwt ({token}){
//       if(!token.email) return token
//       const user = await getUserByEmail(token.email);

//       if(!user )return token;
//       token.role = user.role;
//       token.userId = user.id;
//       console.log("jwt token >>>",token);
//       return token;
//     }
  
//   },
//   async session({session,token}){
// if(token.role){
//   session.user.role = token.role as "USER" | "ADMIN";
  
// }

// if(token.userId){
//   session.user.userId = token.userId as string;
// }


// return session;
//   },
  pages:{
    signIn:"/login"
  },


})