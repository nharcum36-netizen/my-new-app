"use client";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            🤖 Learn English with AI + Live Coaching
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4 drop-shadow-md">
            <span className="font-bold">80% AI-Powered Learning</span> — Personalized lessons available 24/7
          </p>
          <p className="text-lg md:text-xl text-purple-100 mb-8 drop-shadow-md max-w-2xl mx-auto">
            <span className="font-bold">20% Your Instructor</span> — Weekly group coaching for guidance and accountability
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a
              href="/pricing"
              className="inline-block bg-white text-purple-600 font-bold py-4 px-12 rounded-lg hover:bg-gray-100 transition text-lg shadow-lg hover:shadow-xl"
            >
              View Plans & Pricing
            </a>
            <a
              href="/dashboard"
              className="inline-block bg-cyan-400 text-gray-900 font-bold py-4 px-12 rounded-lg hover:bg-cyan-300 transition text-lg shadow-lg hover:shadow-xl"
            >
              🚀 Start Learning Free
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mt-12 text-white">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm">Active Learners</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9★</p>
              <p className="text-sm">Student Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">30</p>
              <p className="text-sm">Weeks Curriculum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            The Best of Both Worlds
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* AI Learning */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">🤖 80% AI Tutor</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>24/7 Availability</strong> — Learn whenever you want</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Personal Tutor</strong> — Adapts to your level & pace</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Interactive Lessons</strong> — Games, quizzes, exercises</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Unlimited Practice</strong> — No waiting for appointments</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Progress Tracking</strong> — See your improvement</span>
                </li>
              </ul>
            </div>

            {/* Live Coaching */}
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">👥 20% Live Coaching</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Weekly Sessions</strong> — Community + accountability</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Real Human Feedback</strong> — Ask questions anytime</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Group Practice</strong> — Learn with other students</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Motivation & Support</strong> — Keep you on track</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Personalized Guidance</strong> — Custom learning plans</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plans for Every Budget
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            All plans include AI learning + live coaching. Choose what works for you.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "$29/mo", features: ["1 group call/month", "All lessons", "Progress tracking"] },
              { name: "Pro", price: "$79/mo", features: ["4 group calls/month", "All lessons", "Certificates", "Priority support"] },
              { name: "Elite", price: "$199/mo", features: ["Weekly 1-on-1", "Custom curriculum", "All Pro features", "Direct email access"] }
            ].map((plan) => (
              <div key={plan.name} className="bg-slate-700 p-6 rounded-xl border border-slate-600 hover:border-cyan-500 transition">
                <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                <p className="text-3xl font-bold text-cyan-400 mb-4">{plan.price}</p>
                <ul className="space-y-2 text-gray-300 text-sm mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
                <button className="w-full bg-cyan-500 text-white font-bold py-2 rounded-lg hover:bg-cyan-600">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <a href="/pricing" className="inline-block mt-8 text-cyan-400 hover:text-cyan-300 font-bold">
            View all pricing details →
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Join 500+ students learning English with AI + live coaching
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a
              href="/pricing"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100"
            >
              See Pricing
            </a>
            <a
              href="mailto:confidenceenglishacademy1on1@outlook.com"
              className="inline-block bg-transparent text-white font-bold py-3 px-8 rounded-lg border-2 border-white hover:bg-white hover:text-blue-600"
            >
              Contact Us
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <a href="mailto:confidenceenglishacademy1on1@outlook.com" className="hover:text-gray-200">
              ✉️ confidenceenglishacademy1on1@outlook.com
            </a>
            <a href="https://instagram.com/confidenceenglish.esl" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              📱 @confidenceenglish.esl
            </a>
            <a href="https://tiktok.com/@confidenceenglish.esl" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              🎵 @confidenceenglish.esl
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
