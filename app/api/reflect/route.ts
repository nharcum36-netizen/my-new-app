import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { entry } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a compassionate AI journal guide. Respond with empathy, wisdom, and encouragement.",
        },
        {
          role: "user",
          content: entry,
        },
      ],
    });

    return Response.json({
      reflection: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
