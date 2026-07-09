'use server'
import { db } from "@/lib/db";
import {auth} from "@/auth";

export const uploadAvatar = async (url: string) => {
  const session = await auth();
console.log("SESSION IN UPLOAD AVATAR>>>>",session);
  if (!url) return { error: 'No file selected' };
  if (!session) return { error: 'Unauthorized' };

  try {
   const image =  await db.user.update({
      where: { id: session.user.id },
      data: { image: url },
    });
    console.log("IMAGE UPDATED>>>>",image);
    return { success: 'Avatar uploaded successfully' };
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return { error: 'An unexpected error occurred while uploading the avatar' };
  }
};