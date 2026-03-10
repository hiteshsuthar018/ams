import { NextResponse } from "next/server"
import { resetPassword } from "@/services/authService"

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json()

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and new password required" },
        { status: 400 }
      )
    }

    await resetPassword(email, newPassword)

    return NextResponse.json({
      message: "Password updated successfully"
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}