import bcryptjs from 'bcryptjs';
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas/LoginSchema";
import { getUserByEmail } from "./lib/user";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials(
      {
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);
            if (!user || !user.password) {
              return null
            }
            const isCorrectPassword = await bcryptjs.compare(password, user.password);
            if (isCorrectPassword) {
              return user;
            }

          }
          return null;
        }
      }
    )
  ],
}