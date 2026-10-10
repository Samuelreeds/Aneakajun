"use server"

import { db } from "@/db"
import { users, waitlist } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  // Normalize to lowercase
  const email = (formData.get("email") as string)?.toLowerCase();
  const password = formData.get("password") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email) || !password || password.length < 6) {
    return { error: "Invalid email or password too short." };
  }

  try {
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));
    if (existingUser) {
      return { error: "Email already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.insert(users).values({
      email,
      password: hashedPassword,
    });

    return { success: "Account created! You can now log in." };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Something went wrong creating your account." };
  }
}

// Action: Subscribe an email to the waitlist
export async function subscribeToWaitlist(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  try {
    // Insert the email into the Neon database
    await db.insert(waitlist).values({ email });
    
    return { success: "You've been added to the waitlist!" };
  } catch (error: any) {
    // Handle Postgres Unique Constraint Violation (Error code 23505)
    if (error.code === '23505' || (error.message && error.message.includes('unique'))) {
      return { error: "You are already on the waitlist!" };
    }
    console.error("Waitlist Error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}