'use server'
import { db } from "@/lib/db"

export const clamComment = async (commentId: string, userId: string) => {
//console.log("commentId>>>>",commentId)
  const comment = await db.comment.findUnique({
    where: {
      id: commentId
    }
  })
  if (!comment) return { error: "comment does not exist!" }

  const user = await db.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) return { error: "User does not exist!" }

  const clap = await db.commentClap.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    }
  })

  if (clap) {
    await db.commentClap.delete({
      where: {
        id: clap.id
      }
    })
    return { success: "comment unclapped" }
  
  }
  else{
    await db.commentClap.create({
      data: {
        userId,
        commentId,
      }
    })
    return { success: "comment clapped" }
  
  }

}