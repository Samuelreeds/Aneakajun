"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminTable({ submissions, adminEmail }: { submissions: any[], adminEmail: string }) {
  const [selectedSub, setSelectedSub] = useState<any | null>(null);

  const getInterests = (jsonStr: string | null) => {
    try {
      return jsonStr ? JSON.parse(jsonStr) : [];
    } catch {
      return [];
    }
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", borderBottom: "1px solid #234c41", paddingBottom: "24px", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", color: "#7ed4c6", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#87b8aa", fontSize: "1rem" }}>
            Welcome back, <strong style={{ color: "#fff" }}>{adminEmail}</strong>. Viewing all submitted questionnaires.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#142f28", border: "1px solid #234c41", padding: "10px 20px", borderRadius: "8px", fontSize: "0.9rem", color: "#a5d0c4" }}>
            Total Submissions: <strong style={{ color: "#fff", fontSize: "1.1rem", marginLeft: "6px" }}>{submissions.length}</strong>
          </div>
          <Link href="/" style={{ background: "#ede6dc", color: "#0e1e1a", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600", transition: "0.2s" }}>
            &larr; Back to Home
          </Link>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "100px 20px", background: "#142f28", borderRadius: "16px", border: "1px dashed #234c41" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#dbebe6", marginBottom: "8px" }}>No return plans yet</h3>
          <p style={{ color: "#638a80", fontSize: "0.95rem" }}>When users submit the form, their data will appear here.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto", background: "#142f28", border: "1px solid #234c41", borderRadius: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #234c41", background: "#0d221d" }}>
                <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600", whiteSpace: "nowrap" }}>Date</th>
                <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600" }}>Applicant</th>
                <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600" }}>Location & Duration</th>
                <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600" }}>Connection</th>
                <th style={{ padding: "20px 24px", color: "#638a80", fontWeight: "600", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => {
                const rowBg = index % 2 === 0 ? "transparent" : "rgba(13, 34, 29, 0.4)";
                return (
                  <tr key={sub.id} style={{ borderBottom: "1px solid #1d3c33", background: rowBg }}>
                    <td style={{ padding: "20px 24px", color: "#a5d0c4", whiteSpace: "nowrap" }}>
                      {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: "20px 24px" }}>
                      <div style={{ fontWeight: "600", color: "#fff", marginBottom: "4px" }}>{sub.name}</div>
                      <a href={`mailto:${sub.email}`} style={{ color: "#55bba9", fontSize: "0.85rem", textDecoration: "none" }}>{sub.email}</a>
                    </td>
                    <td style={{ padding: "20px 24px", color: "#dbebe6" }}>
                      <div style={{ marginBottom: "4px" }}>{sub.currentLocation}</div>
                      {sub.durationMonths && <span style={{ fontSize: "0.8rem", color: "#87b8aa" }}>({sub.durationMonths} months)</span>}
                    </td>
                    <td style={{ padding: "20px 24px", color: "#dbebe6" }}>{sub.cambodiaConnection}</td>
                    <td style={{ padding: "20px 24px", textAlign: "right" }}>
                      <button 
                        onClick={() => setSelectedSub(sub)}
                        style={{ background: "rgba(85, 187, 169, 0.15)", border: "1px solid rgba(85, 187, 169, 0.3)", color: "#7ed4c6", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.85rem", transition: "all 0.2s" }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedSub && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 9999, backdropFilter: "blur(4px)" }} onClick={() => setSelectedSub(null)}>
          <div style={{ background: "#142f28", border: "1px solid #234c41", borderRadius: "16px", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 50px rgba(0,0,0,0.5)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", borderBottom: "1px solid #1d3c33", position: "sticky", top: 0, background: "#142f28", zIndex: 10 }}>
              <h2 style={{ fontSize: "1.4rem", color: "#fff", margin: 0 }}>Applicant Details</h2>
              <button onClick={() => setSelectedSub(null)} style={{ background: "none", border: "none", color: "#87b8aa", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1 }}>&times;</button>
            </div>

            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Name</span>
                  <div style={{ fontSize: "1.1rem", color: "#fff", fontWeight: "500" }}>{selectedSub.name}</div>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Email</span>
                  <a href={`mailto:${selectedSub.email}`} style={{ fontSize: "1rem", color: "#55bba9", textDecoration: "none" }}>{selectedSub.email}</a>
                </div>
              </div>

              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Current Status & Connection</span>
                <div style={{ color: "#dbebe6", background: "#0d221d", padding: "16px", borderRadius: "8px", border: "1px solid #1d3c33" }}>
                  Living in <strong>{selectedSub.currentLocation}</strong> • Identifies as <strong>{selectedSub.cambodiaConnection}</strong> • Planning for <strong>{selectedSub.durationMonths ? `${selectedSub.durationMonths} months` : "Unspecified duration"}</strong>.
                </div>
              </div>

              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Selected Interests</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {getInterests(selectedSub.interests).map((interest: string, idx: number) => (
                    <span key={idx} style={{ background: "rgba(85, 187, 169, 0.15)", color: "#7ed4c6", padding: "6px 14px", borderRadius: "50px", fontSize: "0.85rem", border: "1px solid rgba(85, 187, 169, 0.3)" }}>
                      {interest}
                    </span>
                  ))}
                  {getInterests(selectedSub.interests).length === 0 && <span style={{ color: "#638a80", fontSize: "0.9rem", fontStyle: "italic" }}>No specific interests selected.</span>}
                </div>
              </div>

              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Current Plan</span>
                <div style={{ color: "#dbebe6", fontSize: "1rem", lineHeight: "1.6", background: "#0d221d", padding: "16px", borderRadius: "8px", border: "1px solid #1d3c33" }}>
                  {selectedSub.plansDescription}
                </div>
              </div>

              {selectedSub.biggestConcern && (
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "#638a80", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Biggest Concern / Challenge</span>
                  <div style={{ color: "#fca5a5", fontSize: "1rem", lineHeight: "1.6", background: "rgba(220, 38, 38, 0.05)", padding: "16px", borderRadius: "8px", border: "1px dashed rgba(220, 38, 38, 0.3)" }}>
                    {selectedSub.biggestConcern}
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: "20px 32px", borderTop: "1px solid #1d3c33", background: "#0d221d", textAlign: "right" }}>
              <button onClick={() => setSelectedSub(null)} style={{ background: "#ede6dc", color: "#0e1e1a", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "0.95rem", border: "none" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}