'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { EditProfileSchema, EditProfileSchemaType } from "@/schemas/EditProfileSchema"



export const editUser =async(values:EditProfileSchemaType,userId:string)=>{
 const vFields = EditProfileSchema.safeParse(values);
 if(!vFields.success){
  return {error:"invalid fields"}
 }

 const session = await auth();
 if(session?.user.id !== userId){
  return {error:"unauthorized"}
 }

 const user = await getUserById(userId);
 if(!user){
  return {error:"user not found"}
 }

 await db.user.update({
  where:{
    id:userId
  },
  data:{
   ...vFields.data
  }
 })

return {success:'user updated successfully'}

}