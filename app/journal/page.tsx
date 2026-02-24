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

  // 🧠 AI Reflection Generator (local logic)
  const generateReflection = () => {
    if (entries.length === 0) {
      setReflection("Start journaling to receive insights.");
      return;
    }

    const moodCounts = {
      happy: entries.filter((e) => e.mood === "happy").length,
      neutral: entries.filter((e) => e.mood === "neutral").length,
      sad: entries.filter((e) => e.mood === "sad").length,
      angry: entries.filter((e) => e.mood === "angry").length,
    };

    const dominantMood = Object.entries(moodCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0] as Mood;

    const moodMessages: Record<Mood, string> = {
      happy:
        "You've been experiencing a positive emotional pattern. Keep nurturing what’s working in your life.",
      neutral:
        "Your mood has been balanced overall. This may indicate stability or routine in your days.",
      sad:
        "There’s been a noticeable presence of sadness recently. It might help to reflect on what’s contributing to it.",
      angry:
        "Anger has appeared frequently in your entries. Identifying triggers could help improve your emotional balance.",
    };

    const summary =
      moodMessages[dominantMood] +
      " Journaling consistently is helping you become more self-aware.";

    setReflection(summary);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <h1>Mood Journal</h1>

        {/* 🧠 AI Reflection */}
        <div>
          <button
            onClick={generateReflection}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#111827",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Generate AI Reflection
          </button>

          {reflection && (
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background: "#f9fafb",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              {reflection}
            </div>
          )}
        </div>

        {/* Mood Selector */}
        <div style={{ display: "flex", gap: "15px", fontSize: "24px" }}>
          {(["happy", "neutral", "sad", "angry"] as Mood[]).map((m) => (
            <span
              key={m}
              onClick={() => setMood(m)}
              style={{
                cursor: "pointer",
                opacity: mood === m ? 1 : 0.4,
              }}
            >
              {moodEmoji(m)}
            </span>
          ))}
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How are you feeling today?"
          style={{
            width: "100%",
            height: "120px",
            padding: "14px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            resize: "none",
          }}
        />

        <button
          onClick={saveEntry}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {editingId !== null ? "Update Entry" : "Save Entry"}
        </button>

        <hr />

        {entries.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "#fafafa",
              border: "1px solid #eee",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "12px", color: "#888" }}>
              {item.date}
            </div>

            <div style={{ fontSize: "24px", margin: "8px 0" }}>
              {moodEmoji(item.mood)}
            </div>

            <div>{item.text}</div>

            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => editEntry(item)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#4f46e5",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteEntry(item.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#e11d48",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}