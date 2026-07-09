'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import toast from "react-hot-toast"

export const deleteComment = async(commentId:string)=>{
  const session = await auth();
  const userId = session?.user.id;
  const comment = await db.comment.findUnique({
    where:{
      id:commentId
    }
  })

  if(!comment){
    return {error:"comment not found"}
   }

  if(comment.userId !== userId){
    return toast.error("you are not authorized to delete this comment")
  }

  await db.comment.delete({
    where:{
      id:commentId
    }
  })
revalidatePath(`/blogs/details/${comment.blogId}`);
   return {success:"Comment deleted Successfully"}
}