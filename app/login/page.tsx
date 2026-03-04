"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_email", email);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-700 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Sign in to your Confidence English Academy account
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mb-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-bold">
              Sign Up
            </Link>
          </p>

          {/* Forgot Password */}
          <div className="text-center">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-300">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 bg-slate-700/50 border border-slate-600 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400 mb-2">Demo Account (Test Mode)</p>
          <p className="text-sm text-gray-300 font-mono">
            📧 demo@example.com<br/>
            🔑 demo1234
          </p>
        </div>
      </div>
    </main>
  );
}
