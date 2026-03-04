import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// SimpleStorage: In-memory user database (replace with real DB later)
// In production, use PostgreSQL, MongoDB, or similar
const users = new Map<
  string,
  {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    englishLevel: string;
    plan: string;
    createdAt: string;
  }
>();

// Demo account
users.set("demo@example.com", {
  id: "demo-user",
  email: "demo@example.com",
  passwordHash: hashPassword("demo1234"),
  name: "Demo User",
  englishLevel: "beginner",
  plan: "starter",
  createdAt: new Date().toISOString(),
});

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateToken(email: string): string {
  return crypto
    .createHash("sha256")
    .update(email + Date.now() + Math.random())
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, englishLevel } = body;

    // Validate inputs
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Create new user
    const userId = crypto.randomUUID();
    const newUser = {
      id: userId,
      email,
      passwordHash: hashPassword(password),
      name,
      englishLevel: englishLevel || "beginner",
      plan: "free", // Start with free tier
      createdAt: new Date().toISOString(),
    };

    users.set(email, newUser);

    // Generate token
    const token = generateToken(email);

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          englishLevel: newUser.englishLevel,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Signup failed" },
      { status: 500 }
    );
  }
}
