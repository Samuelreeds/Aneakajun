import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#0a1230",
      color: "#fff",
      fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
      padding: "24px"
    }}>
      <div style={{
        background: "rgba(10, 14, 32, 0.5)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "48px 32px",
        maxWidth: "480px",
        textAlign: "center",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "16px" }}>
          Thank You!
        </h1>
        
        <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "24px", lineHeight: "1.6" }}>
          Your account has been successfully secured as <strong>{session.user?.email}</strong>.
        </p>
        
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.1)", marginBottom: "24px" }}></div>

        <p style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.65)", lineHeight: "1.7" }}>
          We are working hard behind the scenes to finalize the platform. Please hold tight and wait for our official launch notification. We can't wait to share what we've been building!
        </p>
      </div>
    </div>
  );
}