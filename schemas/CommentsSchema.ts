import {z} from 'zod';

export const CommentsSchema = z.object({
  content : z.string().min(4,{message:"content is too short"}).max(500,{message:"content is too long"})
})

export type CommentsSchemaType = z.infer<typeof CommentsSchema>;