import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { returnPlans } from "@/db/schema";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminTable from "./AdminTable"; 
import AdminLogin from "./AdminLogin"; // Import the new login component

export default async function AdminDashboardPage() {
  // 1. Authenticate the session
  const sessionResponse = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const sessionData = sessionResponse?.data;

  // 2. Protect route: render the custom Admin Login box if not authenticated
  if (!sessionData) {
    return <AdminLogin />;
  }

  // 3. ADMIN LOCK: If they ARE logged in, but not an admin, kick them to the homepage
  const ALLOWED_ADMINS = ["admin@gmail.com", "jackstyle4@gmail.com"]; 
  
  if (!ALLOWED_ADMINS.includes(sessionData.user.email)) {
    redirect("/"); 
  }

  // 4. Fetch data from Neon for authorized admins
  const submissions = await db
    .select()
    .from(returnPlans)
    .orderBy(desc(returnPlans.createdAt));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0c1e19", color: "#e5f2ed", padding: "60px 4vw", fontFamily: "Inter, sans-serif" }}>
      <AdminTable submissions={submissions} adminEmail={sessionData.user.email} />
    </div>
  );
}