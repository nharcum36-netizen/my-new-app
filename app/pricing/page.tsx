"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? 29 : 249,
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Perfect for exploring English learning",
      features: [
        "Unlimited AI conversations with tutor",
        "Access to one lesson level",
        "1 group coaching call per month",
        "Progress tracking & badges",
        "Chat history & notes",
        "Email support"
      ],
      cta: "Start Learning",
      highlight: false,
      planId: "starter"
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? 79 : 699,
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Best for serious English learners",
      features: [
        "Unlimited AI conversations + priority support",
        "Access to ALL lesson levels (Young Learners to Advanced)",
        "4 weekly group coaching calls per month",
        "Personalized learning path",
        "Interactive exercises & quizzes",
        "Certificates of completion",
        "Progress analytics & reports",
        "Bonus: 2 group practice sessions/month"
      ],
      cta: "Subscribe Now",
      highlight: true,
      planId: "pro"
    },
    {
      name: "Elite",
      price: billingCycle === "monthly" ? 199 : 1999,
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "For professionals & business English",
      features: [
        "Everything in Pro +",
        "2 private 1-on-1 coaching calls per month",
        "Custom learning curriculum based on your goals",
        "Industry-specific English vocabulary",
        "Live interview prep & business simulations",
        "Priority response for questions",
        "Direct email with instructor",
        "Recording library of all sessions"
      ],
      cta: "Get Elite Access",
      highlight: false,
      planId: "elite"
    }
  ];

  const handleCheckout = async (planId: string) => {
    const token = localStorage.getItem("auth_token");
    const email = localStorage.getItem("user_email");

    // If not logged in, redirect to login
    if (!token) {
      router.push("/login");
      return;
    }

    setLoadingPlan(planId);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType: planId,
          billingCycle: billingCycle,
          email: email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout failed");
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Learn English Your Way
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            AI-powered learning with live coaching. Flexible plans for every budget.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                billingCycle === "monthly"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500 text-white"
              }`}
            >
              Monthly
            </button>
            <span className="text-sm">
              {billingCycle === "annual" && <span className="text-green-300 font-bold">Save 17%</span>}
            </span>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                billingCycle === "annual"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500 text-white"
              }`}
            >
              Annual
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl overflow-hidden transition transform hover:scale-105 ${
                plan.highlight
                  ? "ring-2 ring-cyan-500 md:scale-105 bg-gradient-to-b from-cyan-900 to-slate-800"
                  : "bg-slate-700"
              }`}
            >
              {/* Card Header */}
              <div className={`p-8 ${plan.highlight ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-600"}`}>
                <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-200 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-300">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan.planId)}
                  disabled={loadingPlan === plan.planId}
                  className={`w-full text-center py-3 rounded-lg font-bold text-lg transition ${
                    plan.highlight
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50"
                      : "bg-slate-600 text-white hover:bg-slate-500 disabled:opacity-50"
                  }`}
                >
                  {loadingPlan === plan.planId ? "Processing..." : plan.cta}
                </button>

                {plan.name === "Starter" && (
                  <p className="text-center text-xs text-gray-400 mt-4">
                    No credit card required. 7-day free trial.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">FAQ</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white mb-2">Can I change plans anytime?</h4>
                <p className="text-gray-300">
                  Yes! Upgrade or downgrade anytime. If you upgrade, you'll be charged the difference. If you downgrade, you'll be refunded the difference.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">What if I don't like it?</h4>
                <p className="text-gray-300">
                  We offer a 7-day money-back guarantee. No questions asked. Your satisfaction is our priority.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Is there a contract?</h4>
                <p className="text-gray-300">
                  No contracts! Cancel anytime. Your access continues until the end of your billing cycle.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">What's Included</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex gap-3">
                <span className="text-cyan-400">🤖</span>
                <div>
                  <p className="font-semibold">AI Tutor (24/7)</p>
                  <p className="text-sm">Chat anytime, learn at your pace</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400">📚</span>
                <div>
                  <p className="font-semibold">Lesson Modules</p>
                  <p className="text-sm">Interactive games, exercises, quizzes</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400">👥</span>
                <div>
                  <p className="font-semibold">Live Coaching</p>
                  <p className="text-sm">Weekly group sessions with instructor</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400">📊</span>
                <div>
                  <p className="font-semibold">Progress Tracking</p>
                  <p className="text-sm">See your learning journey visualized</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400">🏆</span>
                <div>
                  <p className="font-semibold">Certificates</p>
                  <p className="text-sm">Earn achievements at each milestone</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Trusted by Learners</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg">
              <p className="text-4xl font-bold text-cyan-400">500+</p>
              <p className="text-gray-300">Active Learners</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <p className="text-4xl font-bold text-cyan-400">4.9★</p>
              <p className="text-gray-300">Student Rating</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <p className="text-4xl font-bold text-cyan-400">10,000+</p>
              <p className="text-gray-300">Lessons Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-lg text-blue-100 mb-6">
            Choose your plan above or email us if you have questions
          </p>
          <a
            href="mailto:confidenceenglishacademy1on1@outlook.com"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
