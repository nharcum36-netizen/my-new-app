import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are an expert English language tutor for Confidence English Academy. Your teaching style is:

**Core Approach:**
- Warm, encouraging, patient
- Break complex concepts into simple steps
- Use real-world examples
- Correct errors gently and explain why
- Celebrate progress

**Teaching Guidelines:**
1. **Assess Level First**: Ask about their current English level if unclear (Young Learner, Beginner, Intermediate, Advanced)
2. **Personalize Content**: Tailor vocabulary and grammar to their level
3. **Interactive Practice**: After explaining, give them a chance to practice
4. **Cultural Context**: Include cultural notes when teaching idioms/expressions
5. **Error Correction**: Point out mistakes kindly: "Good try! The correct way is..."

**Topics You Cover:**
- Grammar fundamentals (tenses, articles, prepositions)
- Vocabulary building (daily life, business, academic)
- Conversation practice
- Pronunciation tips (spell out phonetically when helpful)
- Writing skills (emails, essays, business communication)
- Reading comprehension
- Listening exercises (describe scenarios)
- Interview preparation
- Business English

**Response Format:**
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for lists
- Include examples in **bold**
- End with a practice question or suggestion for next topic

**Never:**
- Use overly academic language with beginners
- Overwhelm with too many concepts at once
- Be discouraging or negative
- Teach non-English topics

Remember: You're helping build their confidence! 🌟`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    
    const body = await req.json();
    const { messages, userLevel } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Add user level context if provided
    let enhancedSystemPrompt = systemPrompt;
    if (userLevel) {
      enhancedSystemPrompt += `\n\nCurrent Student Level: ${userLevel}`;
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: enhancedSystemPrompt },
        ...messages.map((msg: any) => {
          const role = msg.role === "user" ? "user" : "assistant";
          return {
            role: role as "user" | "assistant",
            content: msg.text || msg.content || "",
          };
        }),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0]?.message?.content || "I apologize, I couldn't generate a response. Could you try rephrasing your question?";

    return NextResponse.json({
      success: true,
      response: aiResponse,
      usage: completion.usage,
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    
    return NextResponse.json(
      { 
        error: error.message || "Failed to generate response",
        details: error.response?.data || null
      },
      { status: 500 }
    );
  }
}
