"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (isLogin) {
        // Neon Auth Email Sign-In
        const { error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          setError(error.message || "Invalid email or password.");
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        // Neon Auth Email Sign-Up
        const { error } = await authClient.signUp.email({
          name: email.split("@")[0],
          email,
          password,
        });

        if (error) {
          setError(error.message || "Failed to create account.");
        } else {
          setMessage("Account created successfully! Please sign in.");
          setIsLogin(true);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected authentication error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-body">
      <div className="page">
        {/* Left: art + quote */}
        <aside className="art">
          <Link href="/" className="brand">
            <img
              src="/logo.jpg"
              alt="Aneakajun Logo"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            Aneakajun
          </Link>
          <blockquote className="quote">
            &ldquo;We're building something new for you. Create your account today and be the first one inside when we launch.&rdquo;
            <footer>The Aneakajun Team</footer>
          </blockquote>
        </aside>

        {/* Right: form */}
        <main className="panel">
          <Link href="/" className="brand mobile-brand">
            <img
              src="/logo.jpg"
              alt="Aneakajun Logo"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            Aneakajun
          </Link>
          <button
            className="top-link"
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setMessage("");
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>

          <div className="box">
            <h1>{isLogin ? "Welcome back" : "Create an account"}</h1>
            <p className="sub">
              {isLogin
                ? "Enter your email below to log in to your account"
                : "Enter your email below to create your account"}
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <input
                className="field"
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
              <input
                className="field"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
              />

              <button className="btn btn-dark" type="submit" disabled={loading}>
                {loading
                  ? "Processing..."
                  : isLogin
                  ? "Sign In with Email"
                  : "Sign Up with Email"}
              </button>
            </form>

            <div className="or">Or continue with</div>

            <button
              type="button"
              className="btn btn-line"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: `${window.location.origin}/`,
                });
              }}
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                />
              </svg>
              <span>Google</span>
            </button>

            {message && (
              <p className="msg" style={{ color: "#15803d" }}>
                {message}
              </p>
            )}
            {error && (
              <p className="msg" style={{ color: "#b91c1c" }}>
                {error}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}