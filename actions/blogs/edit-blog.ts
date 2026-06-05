'use server'
import { db } from '@/lib/db';
import { BlogSchema, BlogSchemaType } from './../../schemas/BlogSchema';
import { getUserById } from '@/lib/user';
export const editBlog = async (values: BlogSchemaType, blogId: string) => {
  const vFields = BlogSchema.safeParse(values);
  if (!vFields.success) return { error: "Invalid fields!" }
  const { userId, isPublished } = vFields.data;
  //console.log(userId);
  const user = await getUserById(userId);
  if (!user) return { error: "User does not exist!" }
  if (isPublished && !user.emailVerified) {
    return { error: "Not authorized! Verify your email!" }
  }
  const blog = await db.blog.findUnique({
    where: {
      id: blogId
    }
  })
  if (!blog) return { error: "Blog does not exist!" }
  await db.blog.update({
    where: {
      id: blogId
    },
    data: {
      ...vFields.data
    }
  })
  return { success: "Blog updated" }





}