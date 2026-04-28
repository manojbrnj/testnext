import {z} from 'zod';
import { _email } from 'zod/v4/core';
export const LoginSchema = z.object({
  email:z.string().email(),
  password:z.string().min(6,{message:"password must be at least 6 characters long"})


})

export type loginSchemaType = z.infer<typeof LoginSchema>;