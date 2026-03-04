import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// SimpleStorage: Same user database reference
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

// Pre-populate demo account
if (users.size === 0) {
  users.set("demo@example.com", {
    id: "demo-user",
    email: "demo@example.com",
    passwordHash: crypto
      .createHash("sha256")
      .update("demo1234")
      .digest("hex"),
    name: "Demo User",
    englishLevel: "beginner",
    plan: "starter",
    createdAt: new Date().toISOString(),
  });
}

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
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Find user
    const user = users.get(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const passwordHash = hashPassword(password);
    if (passwordHash !== user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(email);

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          englishLevel: user.englishLevel,
          plan: user.plan,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
