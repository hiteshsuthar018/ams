import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyToken, comparePassword, hashPassword } from "@/lib/auth"

export async function POST(req: Request) {
  try {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded: any = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { oldPassword, newPassword } = await req.json()

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const valid = await comparePassword(oldPassword, user.password)

    if (!valid) {
      return NextResponse.json(
        { error: "Old password incorrect" },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword }
    })

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