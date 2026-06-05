'use server'
import { db } from "@/lib/db"

export const bookmarkBlog = async (blogId: string, userId: string) => {
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

  const bookmark = await db.bookmark.findUnique({
    where: {
      userId_blogId: {
        userId,
        blogId,
      },
    }
  })

  if (bookmark) {
    await db.bookmark.delete({
      where: {
        id: bookmark.id
      }
    })
    return { success: "Blog unbookmarked" }
  
  }
  else{
    await db.bookmark.create({
      data: {
        userId,
        blogId,
      }
    })
    return { success: "Blog bookmarked" }
  
  }

}