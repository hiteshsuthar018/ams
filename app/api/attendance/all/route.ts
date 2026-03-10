import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { getAllAttendance } from "@/services/attendanceService"

export async function GET() {

  try {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded: any = verifyToken(token)

    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      )
    }

    const attendance = await getAllAttendance()

    return NextResponse.json(attendance)

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }
}