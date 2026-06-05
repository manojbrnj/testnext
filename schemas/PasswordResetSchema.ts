import {z} from 'zod';

export const PasswordResetSchema = z.object({
  password:z.string().min(6,{message:"password must be at least 6 characters long"}),
  confirmPassword:z.string().min(6,{message:"password must be at least 6 characters long"})
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});



export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;