'use server'
import { getUserById } from "@/lib/user";
import { CommentsSchema, CommentsSchemaType } from "@/schemas/CommentsSchema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addComment = async ({ values, userId, blogId, parentId, repliedToUserId }: { values: CommentsSchemaType, userId: string, blogId: string, parentId?: string, repliedToUserId?: string }) => {
  //valid our values

  const vFields = CommentsSchema.safeParse(values);
  if (!vFields.success) {
    return { error: "invalid fields" }
  }
  const { content } = vFields.data;

  const user = await getUserById(userId);
  if (!user) return { error: "user not found" }

const blog = await db.blog.findUnique({
    where:{
      id:blogId
    }
  })

  if(!blog){
    return {error:"blog not found"}
   }

  if (parentId) {
    const parentComment = await db.comment.findUnique({
      where: {
        id: parentId
      }
    })
    if (!parentComment) {
      return { error: "parent comment not found" }
    }
  }

  if (repliedToUserId) {
    const repliedToUser = await getUserById(repliedToUserId);
    if (!repliedToUser) {
      return { error: "replied to user not found" }

    }
  }

  await db.comment.create({
    data: {
      userId,
      blogId,
      parentId,
      repliedToUserId,
      content,
    }

  });

  revalidatePath(`/blogs/${blogId}`);

  return { success: "comment added successfully" }
}       