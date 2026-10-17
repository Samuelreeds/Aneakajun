"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Import your existing authClient from your lib folder instead of the npm package
import { authClient } from "@/lib/auth/client"; 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the imported authClient
      const res = await authClient.signIn.email({
        email,
        password,
      });
      
      if (res.error) {
        setError(res.error.message || "Invalid credentials. Please try again.");
      } else {
        // Refresh the server component to instantly show the dashboard
        router.refresh(); 
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0c1e19", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#142f28", padding: "40px", borderRadius: "16px", border: "1px solid #234c41", boxShadow: "0 24px 50px rgba(0,0,0,0.5)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#7ed4c6", marginBottom: "8px", letterSpacing: "-0.02em" }}>Admin Access</h1>
          <p style={{ color: "#87b8aa", fontSize: "0.95rem" }}>Sign in to manage return plans.</p>
        </div>

        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#fca5a5", padding: "12px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "20px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#dbebe6", marginBottom: "8px" }}>Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", background: "#0d221d", border: "1px solid #234c41", borderRadius: "8px", padding: "12px 16px", color: "#fff", outline: "none", fontSize: "0.95rem" }}
              placeholder="admin@gmail.com"
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#dbebe6", marginBottom: "8px" }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", background: "#0d221d", border: "1px solid #234c41", borderRadius: "8px", padding: "12px 16px", color: "#fff", outline: "none", fontSize: "0.95rem" }}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", background: "#ede6dc", color: "#0e1e1a", border: "none", borderRadius: "8px", padding: "14px", fontSize: "1rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px", transition: "0.2s", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Authenticating..." : "Secure Log In"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a href="/" style={{ color: "#638a80", fontSize: "0.85rem", textDecoration: "none" }}>&larr; Return to main site</a>
        </div>
      </div>
    </div>
  );
}