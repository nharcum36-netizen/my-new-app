"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ADULT_PROGRAMS = [
  {
    title: "1-on-1 ESL Coaching",
    description: "Personalized lessons to improve your English speaking confidence.",
    price: "$35 / 60 min",
  },
  {
    title: "ESL Group Speaking Class",
    description: "Practice English with other learners in supportive small groups.",
    price: "$79 / month",
  },
  {
    title: "Business & Interview Intensive",
    description: "High-impact coaching for meetings, interviews, and presentations.",
    price: "$55 / session",
  },
];

const YOUTH_PROGRAMS = [
  {
    title: "Youth ESL Coaching (Ages 5-17)",
    description: "Fun lessons for children and teens learning English as a second language.",
    price: "$30 / 60 min",
  },
  {
    title: "Kids & Teens ESL Group",
    description: "Age-appropriate English learning with games and conversation practice.",
    price: "$69 / month",
  },
  {
    title: "Teen Interview & College Prep",
    description: "Prepare for college interviews, presentations, and academic discussions.",
    price: "$45 / session",
  },
];

export default function ProgramsPage() {
  const [creatingCheckout, setCreatingCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCheckoutStatus(params.get("checkout"));
  }, []);

  const createCheckout = async () => {
    const priceId = process.env.NEXT_PUBLIC_PRICE_ID?.trim();
    const origin = window.location.origin;

    try {
      setCreatingCheckout(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          successUrl: `${origin}/programs?checkout=success`,
          cancelUrl: `${origin}/programs?checkout=canceled`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment is temporarily unavailable. Please try again shortly.");
      }
    } catch {
      alert("Payment is temporarily unavailable. Please try again shortly.");
    } finally {
      setCreatingCheckout(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            Confidence English Academy
          </h1>
          <p className="text-white text-lg md:text-xl drop-shadow-md max-w-3xl mx-auto">
            ESL programs for non-native speakers — from children to working professionals.
          </p>
        </div>

        {checkoutStatus === "success" && (
          <div className="mb-6 rounded-xl bg-green-100 text-green-800 p-4 text-center font-semibold">
            Payment successful. Your membership is now active.
          </div>
        )}

        {checkoutStatus === "canceled" && (
          <div className="mb-6 rounded-xl bg-yellow-100 text-yellow-800 p-4 text-center font-semibold">
            Checkout canceled. You can try again anytime.
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Adult Programs (18+)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {ADULT_PROGRAMS.map((program) => (
              <div key={program.title} className="rounded-2xl bg-white/95 p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-700 mb-4">{program.description}</p>
                <p className="text-purple-700 font-bold">{program.price}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Youth Programs (Ages 5-17)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {YOUTH_PROGRAMS.map((program) => (
              <div key={program.title} className="rounded-2xl bg-white/95 p-6 shadow-xl border-4 border-yellow-400">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-700 mb-4">{program.description}</p>
                <p className="text-purple-700 font-bold">{program.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/95 p-6 md:p-8 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Membership Plan</h2>
          <p className="text-gray-700 mb-4">
            Get recorded lessons, weekly worksheets, conversation prompts, and monthly live Q&A.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-3xl font-bold text-purple-700">$19/month</span>
            <button
              onClick={createCheckout}
              disabled={creatingCheckout}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 disabled:opacity-60"
            >
              {creatingCheckout ? "Redirecting..." : "Subscribe Now"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white/95 p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Book Your Trial Lesson</h2>
          <p className="text-gray-700 mb-4">
            Start with a trial session to assess your level and create your personalized speaking plan.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:confidenceenglishacademy1on1@outlook.com?subject=Trial%20Lesson%20Request&body=Hi!%20I'd%20like%20to%20book%20a%20trial%20lesson.%0A%0APreferred%20Program:%20%0AAge%20Group:%20%0APreferred%20Days/Times:%20%0A%0AThank%20you!"
              className="inline-block bg-purple-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-purple-700"
            >
              Book Trial via Email →
            </a>
            <Link
              href="/lessons"
              className="inline-block bg-indigo-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-indigo-700"
            >
              View Lesson Plans
            </Link>
            <Link
              href="/"
              className="inline-block bg-white border border-purple-600 text-purple-700 font-semibold py-3 px-5 rounded-lg hover:bg-purple-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
