import { db } from "./db"
import {v4 as uuidv4} from 'uuid'
import {Resend} from 'resend'

export const getVerificationTokenByEmail=async (email:string)=>{
  try {
    const verificationToken = db.emailVerificationToken.findFirst({
      where:{
        email
      }
      
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
    return null;
  }

}

export const generateEmailVerificationToken=async (email:string)=>{
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if(existingToken){
    await db.emailVerificationToken.delete({
      where:{
        id:existingToken.id
      }
    })
  }

  const verificationToken = await db.emailVerificationToken.create({
    data:{
      email,
      token,
      expires
    }
  })
  return verificationToken;
}

//send email 

export const sendEmailVerificationToken=async(email:string,token:string)=>{
const resend = new Resend();
const emailVerificationLink = `${process.env.BASE_URL}/email-verification?token=${token}`
 console.log(emailVerificationLink)
const res =await resend.emails.send({
  from:"voiceofamuse.com<no-reply@voiceofamuse.com>",
  to:email,
  subject:"Welcome to Voice Of A Muse! Please verify your email 🎉",
  html:`<p>Click 👉 <a href="${emailVerificationLink}">here</a> to verify your email 🎉🎉🎉🎉🎉.</p>`
})
console.log(res.error)
return {error:res.error}
}