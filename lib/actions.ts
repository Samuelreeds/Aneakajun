"use server"

import { db } from "@/db"
import { users, waitlist, returnPlans } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase();
  const password = formData.get("password") as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email) || !password || password.length < 6) {
    return { error: "Invalid email or password too short." };
  }

  try {
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));
    if (existingUser) return { error: "Email already in use." };
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, password: hashedPassword });
    return { success: "Account created! You can now log in." };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Something went wrong creating your account." };
  }
}

export async function subscribeToWaitlist(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email || !email.includes("@")) return { error: "Please enter a valid email address." };

  try {
    await db.insert(waitlist).values({ email });
    return { success: "You've been added to the waitlist!" };
  } catch (error: any) {
    if (error.code === '23505' || (error.message && error.message.includes('unique'))) {
      return { error: "You are already on the waitlist!" };
    }
    console.error("Waitlist Error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

// Action: Submit "Plan your return" questionnaire
export async function submitReturnPlan(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim()?.toLowerCase();
  const currentLocation = (formData.get("currentLocation") as string)?.trim();
  const cambodiaConnection = formData.get("cambodiaConnection") as string;
  
  // New Field Extraction
  const plannedArrivalDate = (formData.get("plannedArrivalDate") as string)?.trim();
  
  const durationMonths = (formData.get("durationMonths") as string)?.trim();
  const plansDescription = formData.get("plansDescription") as string;
  const interests = formData.getAll("interests") as string[];
  const biggestConcern = (formData.get("biggestConcern") as string)?.trim();

  if (!name || !email || !currentLocation || !cambodiaConnection || !plansDescription) {
    return { error: "Please fill in all required fields marked with *." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await db.insert(returnPlans).values({
      name,
      email,
      currentLocation,
      cambodiaConnection,
      plannedArrivalDate: plannedArrivalDate || null, // NEW FIELD INSERTION
      durationMonths: durationMonths || null,
      plansDescription,
      interests: interests.length > 0 ? JSON.stringify(interests) : null,
      biggestConcern: biggestConcern || null,
    });

    return { success: "Your return plan has been submitted successfully! Our team will follow up with you." };
  } catch (error) {
    console.error("Return Plan Submission Error:", error);
    return { error: "Something went wrong submitting your plan. Please try again." };
  }
}