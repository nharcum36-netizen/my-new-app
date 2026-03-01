"use client";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          Confidence English Academy
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
          Practical English coaching for adults who want to speak clearly and confidently at work and in daily life.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/programs"
            className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition text-xl shadow-lg"
          >
            View Programs →
          </a>
          <a
            href="https://calendly.com/your-calendly-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-lg hover:bg-yellow-500 transition text-xl shadow-lg"
          >
            Book a Trial Lesson
          </a>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 justify-center items-center text-white text-sm">
          <a href="mailto:hello@confidenceenglishacademy.com" className="hover:text-yellow-300 transition">
            ✉️ hello@confidenceenglishacademy.com
          </a>
          <a href="https://instagram.com/confidenceenglishacademy" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            📱 Instagram
          </a>
          <a href="https://tiktok.com/@confidenceenglishacademy" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            🎵 TikTok
          </a>
        </div>
      </div>
    </main>
  );
}
