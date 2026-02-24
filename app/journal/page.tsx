"use client";

import { useState, useEffect } from "react";

type Mood = "happy" | "neutral" | "sad" | "angry";

type JournalEntry = {
  id: number;
  text: string;
  date: string;
  mood: Mood;
};

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState<Mood>("neutral");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [reflectionError, setReflectionError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (entry.trim() === "") return;

    if (editingId !== null) {
      const updated = entries.map((item) =>
        item.id === editingId
          ? { ...item, text: entry, mood, date: new Date().toLocaleString() }
          : item
      );
      setEntries(updated);
      setEditingId(null);
    } else {
      const newEntry: JournalEntry = {
        id: Date.now(),
        text: entry,
        mood,
        date: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]);
    }

    setEntry("");
    setMood("neutral");
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            🧠 MindScribe Journal
          </h1>
          <p className="text-white text-lg md:text-xl drop-shadow-md">
            Reflect, grow, and understand yourself through journaling
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">✨ AI Insights</h2>
            <button
              onClick={generateReflection}
              disabled={isLoadingReflection}
              className="bg-white text-purple-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoadingReflection ? "Generating..." : "Generate AI Reflection"}
            </button>

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
  );
}
