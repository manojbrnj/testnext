import { content } from './../node_modules/rehype-minify-whitespace/content.d';
import {optional, z} from 'zod'

export const BlogSchema = z.object({
  userId :z.string(),
  title : z.string().min(10,{message:"title must be at least 10 characters long"}).max(150,{message:"title must be at most 150 characters long"}),
  content : z.string().min(10,{message:"content must be at least 10 characters long"}),
  coverImage:z.string().optional(),
  isPublished:z.boolean().optional(),
  tags:z.string().array().optional(),
  createdAt:z.date().optional(),
  updatedAt:z.date().optional(),
  slug:z.string().optional(),


})

export type BlogSchemaType = z.infer<typeof BlogSchema>;