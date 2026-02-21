export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      padding: "60px 20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      backgroundColor: "#f8f8f8"
    }}>
      
      <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
        MindScribe
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px" }}>
        AI-powered journaling designed to help you heal, grow,
        and step into your purpose.
      </p>

      <button style={{
        padding: "14px 28px",
        fontSize: "16px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer"
      }}>
        Start Your Journal
      </button>

    </main>
  )
}
