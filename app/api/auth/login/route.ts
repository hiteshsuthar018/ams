import { NextResponse } from "next/server"
import { loginUser } from "@/services/authService"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      )
    }

    const { user, token } = await loginUser(email, password)

    const response = NextResponse.json({
      message: "Login successful",
      user
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/"
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    )
  }
}