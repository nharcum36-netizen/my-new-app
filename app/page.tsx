"use client";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      Welcome to MindScribe 
      <br />
      Go to /journal to start writing.
    </main>
  );
}
