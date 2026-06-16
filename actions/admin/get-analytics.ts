'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getAnalytics =async ()=>{
 const session = await auth();
 const isAdmin = (session?.user.role) === "ADMIN";

 if(!isAdmin){
  return {error:"unauthorised access"}
 }

  const userCount = await db.user.count() || 0 ;
  const blogCount = await db.blog.count() || 0;




  return{success:{
    userCount,blogCount
  }}
}