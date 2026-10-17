import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { returnPlans } from "@/db/schema";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // 1. Authenticate the session
  const sessionResponse = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const sessionData = sessionResponse?.data;

  // 2. Protect route: redirect unauthenticated users to login
  if (!sessionData) {
    redirect("/auth");
  }

  // 3. ADMIN LOCK: Allow the new admin email (and your Google email as a backup)
  const ALLOWED_ADMINS = ["admin@gmail.com", "jackstyle4@gmail.com"]; 
  
  if (!ALLOWED_ADMINS.includes(sessionData.user.email)) {
    // Kick regular users back to the homepage
    redirect("/"); 
  }

  // 4. Fetch all return plan submissions from Neon (newest first)
  const submissions = await db
    .select()
    .from(returnPlans)
    .orderBy(desc(returnPlans.createdAt));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0c1e19", color: "#e5f2ed", padding: "60px 4vw", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", borderBottom: "1px solid #234c41", paddingBottom: "24px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: "700", color: "#7ed4c6", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              Admin Dashboard
            </h1>
            <p style={{ color: "#87b8aa", fontSize: "1rem" }}>
              Viewing all submitted <strong style={{ color: "#d1e6e0" }}>&quot;Plan your return&quot;</strong> questionnaires.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ background: "#142f28", border: "1px solid #234c41", padding: "10px 20px", borderRadius: "8px", fontSize: "0.9rem", color: "#a5d0c4" }}>
              Total Submissions: <strong style={{ color: "#fff", fontSize: "1.1rem", marginLeft: "6px" }}>{submissions.length}</strong>
            </div>
            <Link 
              href="/" 
              style={{ background: "#ede6dc", color: "#0e1e1a", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600", transition: "0.2s" }}
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>

        {/* Submissions Data Table */}
        {submissions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 20px", background: "#142f28", borderRadius: "16px", border: "1px dashed #234c41" }}>
            <svg style={{ width: "48px", height: "48px", stroke: "#356357", fill: "none", margin: "0 auto 16px" }} viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 style={{ fontSize: "1.2rem", color: "#dbebe6", marginBottom: "8px" }}>No return plans yet</h3>
            <p style={{ color: "#638a80", fontSize: "0.95rem" }}>When users submit the form, their data will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto", background: "#142f28", border: "1px solid #234c41", borderRadius: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #234c41", background: "#0d221d" }}>
                  <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600", whiteSpace: "nowrap" }}>Date</th>
                  <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600" }}>Applicant</th>
                  <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600" }}>Location</th>
                  <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600" }}>Connection & Duration</th>
                  <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600", width: "25%" }}>Interests</th>
                  <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600", width: "25%" }}>Goals & Concerns</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => {
                  let parsedInterests: string[] = [];
                  try {
                    parsedInterests = sub.interests ? JSON.parse(sub.interests) : [];
                  } catch {
                    parsedInterests = [];
                  }

                  const rowBg = index % 2 === 0 ? "transparent" : "rgba(13, 34, 29, 0.4)";

                  return (
                    <tr key={sub.id} style={{ borderBottom: "1px solid #1d3c33", background: rowBg, transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "#1d3c33"} onMouseOut={(e) => e.currentTarget.style.background = rowBg}>
                      <td style={{ padding: "24px", color: "#a5d0c4", whiteSpace: "nowrap", verticalAlign: "top" }}>
                        {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ padding: "24px", verticalAlign: "top" }}>
                        <div style={{ fontWeight: "600", color: "#fff", fontSize: "1rem", marginBottom: "4px" }}>{sub.name}</div>
                        <a href={`mailto:${sub.email}`} style={{ color: "#55bba9", fontSize: "0.85rem", textDecoration: "none" }}>
                          {sub.email}
                        </a>
                      </td>
                      <td style={{ padding: "24px", color: "#dbebe6", verticalAlign: "top" }}>
                        {sub.currentLocation}
                      </td>
                      <td style={{ padding: "24px", verticalAlign: "top" }}>
                        <div style={{ color: "#dbebe6", marginBottom: "6px" }}>{sub.cambodiaConnection}</div>
                        {sub.durationMonths && (
                          <div style={{ display: "inline-block", background: "#0d221d", color: "#87b8aa", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", border: "1px solid #234c41" }}>
                            {sub.durationMonths} months
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "24px", verticalAlign: "top" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {parsedInterests.map((interest, idx) => (
                            <span key={idx} style={{ background: "rgba(85, 187, 169, 0.12)", border: "1px solid rgba(85, 187, 169, 0.25)", color: "#7ed4c6", padding: "4px 10px", borderRadius: "50px", fontSize: "0.75rem", fontWeight: "500", whiteSpace: "nowrap" }}>
                              {interest}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: "24px", verticalAlign: "top" }}>
                        <div style={{ marginBottom: "12px" }}>
                          <strong style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Plan Status</strong>
                          <span style={{ color: "#dbebe6" }}>{sub.plansDescription}</span>
                        </div>
                        {sub.biggestConcern && (
                          <div>
                            <strong style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Concern / Challenge</strong>
                            <p style={{ color: "#a5d0c4", fontSize: "0.85rem", lineHeight: "1.5", margin: 0 }}>{sub.biggestConcern}</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}