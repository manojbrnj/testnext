'use server'
import { db } from "@/lib/db"

export const clapBlog = async (blogId: string, userId: string) => {
//console.log("BLOGID>>>>",blogId)
  const blog = await db.blog.findUnique({
    where: {
      id: blogId
    }
  })
  if (!blog) return { error: "Blog does not exist!" }

  const user = await db.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) return { error: "User does not exist!" }

  const clap = await db.clap.findUnique({
    where: {
      userId_blogId: {
        userId,
        blogId,
      },
    }
  })

  if (clap) {
    await db.clap.delete({
      where: {
        id: clap.id
      }
    })
    return { success: "Blog unclapped" }
  
  }
  else{
    await db.clap.create({
      data: {
        userId,
        blogId,
      }
    })
    return { success: "Blog clapped" }
  
  }

}