import {z} from 'zod';
import { _email } from 'zod/v4/core';
export const RegisterSchema = z.object({
  name:z.string().min(3,{message:"name must be at least 3 characters long"}),
  email:z.string().email(),
  password:z.string().min(6,{message:"password must be at least 6 characters long"}),
  confirmPassword:z.string().min(6,{message:"password must be at least 6 characters long"})
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;