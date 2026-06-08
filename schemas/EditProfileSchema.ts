import {z} from 'zod';  //z schema data sahi hai ? aur validation constraints rules

export const EditProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name cannot exceed 50 characters" }).optional(),
  bio: z.string().max(160, { message: "Bio cannot exceed 160 characters" }).optional(),
  tags:z.array(z.string()),
 // profilePicture: z.string().url({ message: "Must be a valid URL" }).optional(),
  // You can add other relevant profile fields here
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;
