import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  generateToken,
  getUserByEmail,
  normalizeEmail,
} from "../../../../lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, englishLevel } = body;
    const normalizedEmail = normalizeEmail(email || "");

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
    if (getUserByEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const newUser = createUser({
      email: normalizedEmail,
      password,
      name,
      englishLevel,
    });

    // Generate token
    const token = generateToken(normalizedEmail);

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
