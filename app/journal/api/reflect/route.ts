import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { entry } = await req.json()

  const reflection = `
  Thank you for sharing.

  I hear that you wrote:
  "${entry}"

  Take a moment to breathe.
  What emotion stands out most in what you just wrote?
  `

  return NextResponse.json({ reflection })
}
