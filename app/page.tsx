"use client";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to MindScribe ✨
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
          Reflect, grow, and understand yourself through journaling with AI-powered insights
        </p>
        <a
          href="/journal"
          className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition text-xl shadow-lg"
        >
          Start Your Journal →
        </a>
      </div>
    </main>
  );
}
