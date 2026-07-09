'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
//import { revalidatePath } from "next/cache"
import toast from "react-hot-toast"

export const deleteBlog = async(blogId:string)=>{

  const session = await auth();
  const userId = session?.user.id;

  const blog = await db.blog.findUnique({
    where:{
      id:blogId
    }
  })

  if(!blog){
    return {error:"blog not found"}
   }

  if(blog.userId !== userId){
    return toast.error("you are not authorized to delete this blog")
  }

  await db.blog.delete({
    where:{
      id:blogId
    }
  })
//revalidatePath(`/blogs/details/${blog.id}`);
   return {success:"blog deleted Successfully"}
}