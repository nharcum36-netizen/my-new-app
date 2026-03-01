import OpenAI from "openai";

function buildFallbackReflection(entry: string) {
  const normalized = entry.trim();
  const snippet = normalized.length > 180 ? `${normalized.slice(0, 180)}...` : normalized;
  return `Thank you for sharing. I hear that this is meaningful for you: "${snippet}"\n\nA gentle next step: name one emotion you feel right now, then write one small action that would support you today.`;
}

export async function POST(req: Request) {
  try {
    const { entry } = await req.json();

    if (!entry || entry.trim() === "") {
      return Response.json(
        { error: "Journal entry cannot be empty" },
        { status: 400 }
      );
    }

    const openAiKey = process.env.OPENAI_API_KEY?.trim();
    const hasOpenAiKey =
      !!openAiKey &&
      !openAiKey.toLowerCase().includes("your_") &&
      !openAiKey.toLowerCase().includes("replace_me");

    if (!hasOpenAiKey) {
      return Response.json({
        reflection: buildFallbackReflection(entry),
        source: "fallback",
      });
    }

    const openai = new OpenAI({
      apiKey: openAiKey,
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
    console.error("Error in journal reflection endpoint:", error);
    
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
