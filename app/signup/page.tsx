"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    englishLevel: "beginner",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Store token
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_email", formData.email);

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
            Create Account
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Join Confidence English Academy and start learning with AI
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                English Level
              </label>
              <select
                name="englishLevel"
                value={formData.englishLevel}
                onChange={handleChange}
                className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="young-learners">Young Learners</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-400 mt-2">
                Minimum 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold">
              Sign In
            </Link>
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-8 text-center text-sm text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
        </div>
      </div>
    </main>
  );
}
