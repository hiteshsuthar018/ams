import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { getUserAttendance } from "@/services/attendanceService"

export async function GET() {
  try {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token" },
        { status: 401 }
      )
    }

    const decoded: any = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    const attendance = await getUserAttendance(decoded.userId)
    return NextResponse.json(attendance)

  } catch (error: any) {

    console.error("Attendance API error:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }
}