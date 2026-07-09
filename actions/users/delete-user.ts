'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { backendClient } from "@/lib/edgestore-server";
import { getUserById } from "@/lib/user"

export const deleteUser =async (userId:string)=>{
const user = await getUserById(userId);
if(!user){
 return {error:"user not found"}
}
 const session = await auth();
 if(session?.user.id !== userId){
  return {error:"unauthorized"}
 }
const blogs = await db.blog.findMany({
  where:{
    userId
  }
})

if(!!blogs.length){
  await Promise.all(blogs.map(async(blog)=>{
   if(blog.coverImage){
    try {
      await backendClient.publicFiles.deleteFile({url:blog.coverImage});
    } catch (error) {
      console.error(`failed to delete cover image ${blog.coverImage} from edge store`,error)
    }
   }

  }))
}

try {
  await db.user.delete({
    where:{
      id:userId
    }
  })
  
} catch (error) {
  return {error:"something went wrong while deleting user"}
}
return {success:"user deleted successfully"}

}