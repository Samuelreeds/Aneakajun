"use client";

import { useState } from "react";
import { subscribeToWaitlist, submitReturnPlan } from "@/lib/actions";
import Link from "next/link";
import AnimatedTitle from "./AnimatedTitle";
import SocialLinks from "./SocialLinks";

export default function ComingSoon() {
  // Return Plan Form Interactive States
  const [connection, setConnection] = useState<string>("");
  const [plans, setPlans] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const handleReturnPlanSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Append controlled state selections
    formData.set("cambodiaConnection", connection);
    formData.set("plansDescription", plans);
    formData.delete("interests");
    interests.forEach((item) => formData.append("interests", item));

    const res = await submitReturnPlan(formData);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setMessage(res.success);
      form.reset();
      setConnection("");
      setPlans("");
      setInterests([]);
    }

    setLoading(false);
  };

  return (
    <div className="landing-body">
      {/* HEADER SECTION */}
      <header className="navbar" id="top">
        <Link href="/" className="logo" aria-label="Aneakajun Home">
          <img
            src="/logo.jpg"
            alt="Aneakajun Logo"
            style={{
              height: "56px",
              width: "56px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>
        <nav className="nav-links">
          <Link href="#top" className="active">
            Home
          </Link>
          <Link href="#plan">Plan your return</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/auth#login" className="login">
            Log in
          </Link>
          <Link href="/auth#signup" className="signup">
            Sign up
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <img className="layer base" src="/background.jpg" alt="Background" />
        <div className="shade"></div>

        <AnimatedTitle />

        <img className="layer front" src="/foreground.png" alt="Foreground" />
        <div className="shade-bottom"></div>

        <div className="center">
          <div
            style={{
              marginBottom: "24px",
              textAlign: "center",
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                margin: "0 0 4px 0",
                letterSpacing: "-0.02em",
              }}
            >
              aneakajun.com
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                fontStyle: "italic",
                margin: "0",
                opacity: 0.9,
              }}
            >
              diaspora re-rooted.
            </p>
          </div>

          <form
            action={async (formData) => {
              await subscribeToWaitlist(formData);
            }}
            className="notify-form open"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Notify Me</button>
          </form>
        </div>
      </section>

      {/* SECOND SECTION: PLAN YOUR RETURN */}
      <section className="plan-return-section" id="plan">
        <div className="plan-return-container">
          {/* Left Column: Heading & Subtitle */}
          <div className="plan-return-left">
            <h2 className="plan-return-title">Plan your return</h2>
            <p className="plan-return-subtitle">
              Complete the form and our team will contact you to follow up with
              your plans in Cambodia.
            </p>
          </div>

          {/* Right Column: Detailed Form */}
          <div className="plan-return-right">
            <div className="plan-return-card">
              {message && <div className="plan-msg success">{message}</div>}
              {error && <div className="plan-msg error">{error}</div>}

              <form onSubmit={handleReturnPlanSubmit}>
                {/* Name */}
                <div className="plan-field-group">
                  <label className="plan-label" htmlFor="name">
                    Name:*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="plan-input"
                    required
                  />
                </div>

                {/* Email address */}
                <div className="plan-field-group">
                  <label className="plan-label" htmlFor="email">
                    Email address:*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="plan-input"
                    required
                  />
                </div>

                {/* Where do you currently live? */}
                <div className="plan-field-group">
                  <label className="plan-label" htmlFor="currentLocation">
                    Where do you currently live?*
                  </label>
                  <input
                    id="currentLocation"
                    name="currentLocation"
                    type="text"
                    className="plan-input"
                    required
                  />
                </div>

                {/* Which best describes your connection to Cambodia? */}
                <div className="plan-field-group">
                  <label className="plan-label">
                    Which best describes your connection to Cambodia?*
                  </label>
                  <div className="plan-options-list">
                    {[
                      "Khmer raised abroad",
                      "Cambodian living overseas",
                      "Person of Cambodian heritage",
                      "Other connection to Cambodia",
                    ].map((item) => (
                      <div
                        key={item}
                        className={`plan-option-row ${
                          connection === item ? "active" : ""
                        }`}
                        onClick={() => setConnection(item)}
                      >
                        <div className="plan-check-box">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How long do you plan to be in Cambodia for? */}
                <div className="plan-field-group">
                  <label className="plan-label" htmlFor="durationMonths">
                    How long do you plan to be in Cambodia for? (in months)
                  </label>
                  <input
                    id="durationMonths"
                    name="durationMonths"
                    type="text"
                    className="plan-input"
                  />
                </div>

                {/* Which best describes your plans? */}
                <div className="plan-field-group">
                  <label className="plan-label">
                    Which best describes your plans?*
                  </label>
                  <div className="plan-options-list">
                    {[
                      "Actively planning a return",
                      "Exploring possibilities",
                      "I've already returned",
                      "I'm interested on behalf of someone else",
                    ].map((item) => (
                      <div
                        key={item}
                        className={`plan-option-row ${
                          plans === item ? "active" : ""
                        }`}
                        onClick={() => setPlans(item)}
                      >
                        <div className="plan-check-box">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What are you most interested in? */}
                <div className="plan-field-group">
                  <label className="plan-label">
                    What are you most interested in? (Select all that apply)*
                  </label>
                  <div className="plan-options-list">
                    {[
                      "Employment and career",
                      "Starting a business",
                      "Investment and real estate",
                      "Relocation and housing",
                      "Living in Cambodia",
                      "Volunteering and community",
                      "Culture and reconnecting with roots",
                      "Short–term visit",
                      "Partnership or contributing to Aneakajun",
                      "Other",
                    ].map((item) => {
                      const selected = interests.includes(item);
                      return (
                        <div
                          key={item}
                          className={`plan-option-row ${
                            selected ? "active" : ""
                          }`}
                          onClick={() => toggleInterest(item)}
                        >
                          <div className="plan-check-box">
                            <svg viewBox="0 0 24 24">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What is your biggest question, concern, or challenge */}
                <div className="plan-field-group">
                  <label className="plan-label" htmlFor="biggestConcern">
                    What is your biggest question, concern, or challenge about
                    returning to Cambodia?
                  </label>
                  <textarea
                    id="biggestConcern"
                    name="biggestConcern"
                    className="plan-textarea"
                    rows={4}
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="plan-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>

                <p className="plan-disclaimer">
                  Your information is kept strictly private. Never submit passwords.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS (Fixed at bottom right) */}
      <SocialLinks />
    </div>
  );
}