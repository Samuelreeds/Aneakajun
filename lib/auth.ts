import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" }, 
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Normalize email to lowercase
        const email = (credentials.email as string).toLowerCase();

        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (passwordsMatch) return user; 
        
        return null; 
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Append the database user ID to the JWT on initial login
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the ID from the JWT to the client session object
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
})