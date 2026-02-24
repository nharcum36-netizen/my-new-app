import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { entry } = await req.json();

    if (!entry || entry.trim() === "") {
      return Response.json(
        { error: "Journal entry cannot be empty" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a compassionate AI journal guide. Provide thoughtful, empathetic reflections that help users understand their emotions better. Keep your response concise but meaningful.",
        },
        {
          role: "user",
          content: entry,
        },
      ],
    });

    const reflection = response.choices[0].message.content;
    
    if (!reflection) {
      return Response.json(
        { error: "Failed to generate reflection" },
        { status: 500 }
      );
    }

    return Response.json({ reflection });
  } catch (error) {
    console.error("Error in reflection endpoint:", error);
    
    if (error instanceof Error) {
      return Response.json(
        { error: `Error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return Response.json(
      { error: "An unexpected error occurred while generating reflection" },
      { status: 500 }
    );
  }
}
