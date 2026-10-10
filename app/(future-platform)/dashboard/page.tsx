import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Retrieve the wrapped session response
  const sessionResponse = await auth.getSession({
    fetchOptions: {
      headers: await headers() 
    }
  });

  // Extract the actual session data
  const sessionData = sessionResponse?.data;

  // Redirect unauthenticated users back to your login page
  if (!sessionData) {
    redirect("/auth");
  }

  return (
    <div>
      <h1>Welcome back, {sessionData.user.name}</h1>
      {/* The rest of your dashboard UI */}
    </div>
  );
}