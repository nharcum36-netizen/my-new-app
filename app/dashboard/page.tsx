"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"tutor" | "lessons" | "progress" | "schedule">("tutor");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hello! 👋 I'm your AI English tutor. What would you like to learn today?" }
  ]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const email = localStorage.getItem("user_email");
    
    if (!token) {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    router.push("/");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, { role: "user", text: message }]);
    setMessage("");
    
    // Simulate AI response (will be replaced with real API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "That's a great question! Let me help you with that. (Demo mode - real AI integration coming soon)" 
      }]);
    }, 500);
  };

  const studentData = {
    name: userEmail?.split("@")[0] || "Student",
    email: userEmail,
    level: "Beginner (A1-A2)",
    plan: "Pro",
    progress: 34,
    streak: 5,
    hoursLearned: 12,
    nextSession: "Saturday, 2:00 PM",
    achievements: [
      { icon: "🔥", label: "5-Day Streak", date: "In Progress" },
      { icon: "💬", label: "First Conversation", date: "Mar 4, 2024" },
      { icon: "⭐", label: "Quiz Master", date: "Mar 3, 2024" }
    ]
  };

  const lessons = [
    { level: "Young Learners", progress: 20, emoji: "🎨" },
    { level: "Beginner", progress: 45, emoji: "📚" },
    { level: "Intermediate", progress: 0, emoji: "🎯" },
    { level: "Advanced", progress: 0, emoji: "🚀" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {studentData.name}! 👋</h1>
            <p className="text-blue-100">Level: {studentData.level} | Plan: {studentData.plan}</p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
              Settings
            </a>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl">
            <p className="text-sm opacity-90">Progress</p>
            <p className="text-4xl font-bold">{studentData.progress}%</p>
            <p className="text-xs opacity-75">12/35 lessons done</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl">
            <p className="text-sm opacity-90">Current Streak</p>
            <p className="text-4xl font-bold">{studentData.streak} 🔥</p>
            <p className="text-xs opacity-75">days in a row</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl">
            <p className="text-sm opacity-90">Learning Hours</p>
            <p className="text-4xl font-bold">{studentData.hoursLearned}</p>
            <p className="text-xs opacity-75">total logged</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl">
            <p className="text-sm opacity-90">Next Live Session</p>
            <p className="text-lg font-bold">{studentData.nextSession}</p>
            <button className="text-xs mt-2 bg-white text-blue-600 px-3 py-1 rounded font-bold hover:bg-gray-100">
              Join
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          {["tutor", "lessons", "progress", "schedule"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "tutor" && "🤖 AI Tutor"}
              {tab === "lessons" && "📚 My Lessons"}
              {tab === "progress" && "📊 Progress"}
              {tab === "schedule" && "📅 Schedule"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* AI Tutor Tab */}
            {activeTab === "tutor" && (
              <div className="bg-slate-700 rounded-2xl p-6 h-[600px] flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">Chat with Your AI Tutor</h3>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.role === "user"
                            ? "bg-cyan-500 text-white rounded-br-none"
                            : "bg-slate-600 text-gray-100 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message... (e.g., 'teach me about family')"
                    className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-cyan-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* My Lessons Tab */}
            {activeTab === "lessons" && (
              <div className="space-y-4">
                {lessons.map((lesson, idx) => (
                  <div key={idx} className="bg-slate-700 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-white">
                        {lesson.emoji} {lesson.level}
                      </h4>
                      <span className="text-cyan-400 font-bold">{lesson.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                        style={{ width: `${lesson.progress}%` }}
                      ></div>
                    </div>
                    <button className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-cyan-600">
                      {lesson.progress === 0 ? "Start" : "Continue"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === "progress" && (
              <div className="space-y-4">
                <div className="bg-slate-700 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-white mb-4">Your Achievements</h4>
                  <div className="space-y-3">
                    {studentData.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-slate-600 p-4 rounded-lg">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <p className="font-bold text-white">{achievement.label}</p>
                          <p className="text-xs text-gray-400">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-white mb-4">Certificates</h4>
                  <p className="text-gray-300 mb-4">Complete lessons to earn certificates!</p>
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-cyan-600">
                    View All Certificates
                  </button>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === "schedule" && (
              <div className="bg-slate-700 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-4">Upcoming Live Sessions</h4>
                <div className="space-y-4">
                  <div className="bg-slate-600 p-4 rounded-lg border-l-4 border-cyan-500">
                    <p className="font-bold text-white">Weekly Group Coaching</p>
                    <p className="text-sm text-gray-300">Saturday, 2:00 PM - 3:00 PM EST</p>
                    <p className="text-xs text-gray-400 mt-2">Topic: Conversation Basics</p>
                    <button className="mt-3 bg-cyan-500 text-white px-4 py-2 rounded font-bold hover:bg-cyan-600 w-full">
                      Join on Zoom
                    </button>
                  </div>
                  <div className="bg-slate-600 p-4 rounded-lg border-l-4 border-gray-500">
                    <p className="font-bold text-white">Weekly Group Coaching</p>
                    <p className="text-sm text-gray-300">Next Saturday, 2:00 PM - 3:00 PM EST</p>
                    <p className="text-xs text-gray-400 mt-2">Topic: Question Formation</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-slate-700 p-6 rounded-xl">
              <h4 className="font-bold text-white mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full bg-cyan-500 text-white py-2 rounded-lg font-bold hover:bg-cyan-600">
                  Start New Lesson
                </button>
                <button className="w-full bg-slate-600 text-white py-2 rounded-lg font-bold hover:bg-slate-500">
                  Book 1-on-1 Session
                </button>
                <button className="w-full bg-slate-600 text-white py-2 rounded-lg font-bold hover:bg-slate-500">
                  View Recordings
                </button>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-slate-700 p-6 rounded-xl">
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-cyan-400 hover:text-cyan-300">
                  📖 Grammar Guide
                </a>
                <a href="#" className="block text-cyan-400 hover:text-cyan-300">
                  🎵 Pronunciation Tips
                </a>
                <a href="#" className="block text-cyan-400 hover:text-cyan-300">
                  📚 Vocabulary Lists
                </a>
                <a href="#" className="block text-cyan-400 hover:text-cyan-300">
                  ❓ FAQ
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white p-6 rounded-xl">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-sm mb-4">Our support team is here for you</p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-gray-100">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
