"use client";

import { useState, useEffect } from "react";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";

type Mood = "happy" | "neutral" | "sad" | "angry";

type JournalEntry = {
  id: number;
  text: string;
  date: string;
  mood: Mood;
};

const CANVA_PAGES = [
  "Cover Page.png",
  "Welcome.png",
  "Introduction.png",
  "How to use journal.png",
  "Prompt.png",
  "Prompt (2).png",
  "Prompt (3).png",
  "Prompt (4).png",
  "Prompt (5).png",
  "Prompt (6).png",
  "Affirmation.png",
  "Affirmation (2).png",
  "Affirmation (3).png",
  "Affirmation (4).png",
  "Affirmation cont'.png",
  "Affirmation cont' (2).png",
  "Affirmation cont' (3).png",
  "Affirmation cont' (4).png",
  "Affirmation cont' (5).png",
  "Reflection.png",
  "Reflection (2).png",
  "Reflection (3).png",
  "Reflection cont'.png",
  "Reflection cont' (2).png",
  "Reflection cont' (3).png",
  "Reflection cont' (4).png",
  "Reflection cont' (5).png",
  "Reflection cont' (6).png",
  "Reflection cont' (7).png",
  "Reflection cont' (8).png",
  "Reflection cont' (9).png",
  "Relection.png",
  "Relection (2).png",
  "Relection (3).png",
  "Letter never sent.png",
  "Letter never sent (2).png",
  "Letter never sent (3).png",
  "I am becoming.png",
  "Renewal.png",
  "Renewal (2).png",
  "Renewal (3).png",
  "Renewal (4).png",
  "Renewal (5).png",
  "Renewal cont'.png",
  "Restoration.png",
  "Restoration (2).png",
  "Restoration (3).png",
  "Restoration cont'.png",
  "Restoration cont' (2).png",
  "Restoration cont' (3).png",
  "Acknowledgment.png",
];

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState<Mood>("neutral");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [reflectionError, setReflectionError] = useState("");
  const [subscription, setSubscription] = useState<any | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showPageViewer, setShowPageViewer] = useState(true);

  // load entries from server, fallback to localStorage
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/entries");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.entries)) {
            setEntries(data.entries);
            return;
          }
        }
      } catch (e) {
        // ignore and fallback
      }

      const saved = localStorage.getItem("journalEntries");
      if (saved) setEntries(JSON.parse(saved));
    };

    load();
  }, []);

  // check subscription status if Supabase client env is available
  useEffect(() => {
    const checkSubscription = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;

      const supabase = createSupabaseClient(url, key);
      setLoadingSubscription(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const token = session?.access_token;
        if (!token) return;

        const res = await fetch("/api/subscription", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;
        const data = await res.json();
        setSubscription(data.subscription || null);
      } catch (err) {
        console.error("Subscription check failed:", err);
      } finally {
        setLoadingSubscription(false);
      }
    };

    checkSubscription();
  }, []);

  // persist locally and attempt server sync
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const saveEntry = async () => {
    if (entry.trim() === "") return;

    if (editingId !== null) {
      const updated = entries.map((item) =>
        item.id === editingId
          ? { ...item, text: entry, mood, date: new Date().toLocaleString() }
          : item
      );
      setEntries(updated);
      setEditingId(null);
      setEntry("");
      setMood("neutral");
      return;
    }

    const tempId = -Date.now();
    const newEntry: JournalEntry = {
      id: tempId,
      text: entry,
      mood,
      date: new Date().toLocaleString(),
    };

    // optimistically add local entry
    setEntries([newEntry, ...entries]);
    setEntry("");
    setMood("neutral");

    // attempt to persist to server and replace optimistic entry with server row
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newEntry.text, mood: newEntry.mood }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.entry) {
          const serverEntry: JournalEntry = {
            id: data.entry.id,
            text: data.entry.text,
            mood: data.entry.mood,
            date: data.entry.created_at || newEntry.date,
          };

          setEntries((prev) => prev.map((e) => (e.id === tempId ? serverEntry : e)));
        }
      }
    } catch (err) {
      // leave optimistic entry in local state/localStorage if server fails
      console.error("Persist failed:", err);
    }
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((item) => item.id !== id));
  };

  const editEntry = (item: JournalEntry) => {
    setEntry(item.text);
    setMood(item.mood);
    setEditingId(item.id);
  };

  const moodEmoji = (m: Mood) => {
    switch (m) {
      case "happy":
        return "😊";
      case "sad":
        return "😔";
      case "angry":
        return "😡";
      default:
        return "😐";
    }
  };

  const generateReflection = async () => {
    if (entries.length === 0) {
      setReflection("Start journaling to receive AI insights.");
      return;
    }

    setIsLoadingReflection(true);
    setReflectionError("");
    
    try {
      const latestEntry = entries[0];
      const response = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry: latestEntry.text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate reflection");
      }

      const data = await response.json();
      setReflection(data.reflection);
    } catch (err) {
      console.error("Error:", err);
      setReflectionError("Could not generate AI reflection. Please check your OpenAI API key.");
      setReflection("");
    } finally {
      setIsLoadingReflection(false);
    }
  };

  const createCheckout = async () => {
    const priceId = process.env.NEXT_PUBLIC_PRICE_ID;
    if (!priceId) {
      alert("Subscription price not configured. Set NEXT_PUBLIC_PRICE_ID.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Could not create checkout session.");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed. See console for details.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            🧠 MindScribe Journal
          </h1>
          <p className="text-white text-lg md:text-xl drop-shadow-md">
            Reflect, grow, and understand yourself through journaling
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Page Viewer */}
          {showPageViewer && (
            <div className="lg:col-span-1 flex flex-col">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                  <h2 className="text-xl font-bold">📖 Journal Guide</h2>
                </div>
                
                {/* Page Image */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={`/journal-pages/${CANVA_PAGES[currentPageIndex]}`}
                      alt={`Journal page ${currentPageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-4 border-t space-y-4">
                  <p className="text-sm text-gray-600 text-center font-semibold">
                    Page {currentPageIndex + 1} of {CANVA_PAGES.length}
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                      disabled={currentPageIndex === 0}
                      className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setCurrentPageIndex(Math.min(CANVA_PAGES.length - 1, currentPageIndex + 1))}
                      disabled={currentPageIndex === CANVA_PAGES.length - 1}
                      className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next →
                    </button>
                  </div>

                  <button
                    onClick={() => setShowPageViewer(false)}
                    className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
                  >
                    Hide Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Journaling Interface */}
          <div className={showPageViewer ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">✨ AI Insights</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={generateReflection}
                    disabled={isLoadingReflection}
                    className="bg-white text-purple-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoadingReflection ? "Generating..." : "Generate AI Reflection"}
                  </button>
                  <button
                    onClick={createCheckout}
                    className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
                    disabled={loadingSubscription || !!subscription}
                    title={subscription ? "You have an active subscription" : "Subscribe"}
                  >
                    {loadingSubscription ? "Checking..." : subscription ? "Subscribed" : "Subscribe"}
                  </button>
                  {!showPageViewer && (
                    <button
                      onClick={() => setShowPageViewer(true)}
                      className="bg-indigo-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
                    >
                      Show Guide
                    </button>
                  )}
                </div>

                {reflection && (
                  <div className="mt-4 bg-white text-gray-800 p-4 rounded-lg shadow-md">
                    <p className="text-sm whitespace-pre-line">{reflection}</p>
                  </div>
                )}
                
                {reflectionError && (
                  <div className="mt-4 bg-red-100 text-red-800 p-4 rounded-lg">
                    <p className="text-sm">{reflectionError}</p>
                  </div>
                )}
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    How are you feeling?
                  </label>
                  <div className="flex gap-4 text-4xl">
                    {(["happy", "neutral", "sad", "angry"] as Mood[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMood(m)}
                        className={`transition transform ${
                          mood === m ? "scale-125" : "opacity-40 hover:opacity-60"
                        }`}
                      >
                        {moodEmoji(m)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What's on your mind?
                  </label>
                  <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Share your thoughts, feelings, and experiences..."
                    className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  onClick={saveEntry}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
                >
                  {editingId !== null ? "Update Entry" : "Save Entry"}
                </button>
              </div>

              {entries.length > 0 && (
                <div className="border-t">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      📝 Your Entries ({entries.length})
                    </h3>
                    <div className="space-y-4">
                      {entries.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{moodEmoji(item.mood)}</span>
                              <span className="text-xs text-gray-500">
                                {item.date}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editEntry(item)}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteEntry(item.id)}
                                className="text-sm font-semibold text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {entries.length === 0 && (
                <div className="p-16 text-center">
                  <p className="text-gray-400 text-lg">
                    No entries yet. Start writing to begin your journal ✍️
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
