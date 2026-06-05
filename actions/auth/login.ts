import { EmailVerificationToken } from './../../node_modules/.prisma/client/index.d';
'use server'
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { LoginSchema, loginSchemaType } from "@/schemas/LoginSchema";
import { signIn } from "@/auth";
import { LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateEmailVerificationToken, sendEmailVerificationToken } from '@/lib/emailVerification';


export const login = async(values:loginSchemaType)=>{
  const validatedFields = LoginSchema.safeParse(values)
  if(!validatedFields.success)
{
  return {error:"Invalid Fields!"}
}
const {email,password} = validatedFields.data;
 const user = await getUserByEmail(email);
 if(!user||!email || !password || !user.password){
  return { error: "Invalid credetials" };
 }
 if(!user.emailVerified){
const emailVerificationToken = await generateEmailVerificationToken(user.email);
const {error} =await sendEmailVerificationToken(emailVerificationToken.email,emailVerificationToken.token);
if(error){
  return {error : "Something went wrong! while sending verification email ! try to login again"}
}
return {
  success: `email verification link send to ${email}`
}


 }

try {
  await signIn("credentials",{
    email,
    password,redirectTo:LOGIN_REDIRECT
  })

} catch (error) {
  
  if(error instanceof AuthError){
    switch(error.type){
      case "CredentialsSignin":
        return {error:"Invalid Credentials!"}
        default:
          return {error:"Unknown Error!"}
    }
  }
}

}