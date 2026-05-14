'use server'

import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema"

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";


export const signUp = async(values:RegisterSchemaType)=>{
  const validatedFields = RegisterSchema.safeParse(values)
  if(!validatedFields.success)
{
  return {error:"Invalid Fields!"}
}
const {name,email,password} = validatedFields.data;
 const user = await getUserByEmail(email);
 if(user){
  return {error:"User already exists!"}
 }
const hashedPassword = await bcrypt.hash(password,10);

await db.user.create({
  data:{
    name,
    email,
    password:hashedPassword
  }
});
return {
  success: "User created successfully!"
}
}