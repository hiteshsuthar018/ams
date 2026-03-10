import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { markAttendance } from "@/services/attendanceService"

// Office WiFi Public IP
const OFFICE_PUBLIC_IP = "223.190.246.151"

export async function POST(req: Request) {
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

    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      ""

    const userIP = ip.split(",")[0].trim()
console.log("User IP:", userIP)
    // Allow localhost during development
    if (userIP !== "127.0.0.1" && userIP !== "::1") {

      if (userIP !== OFFICE_PUBLIC_IP) {
        return NextResponse.json(
          { error: "Attendance allowed only on office WiFi" },
          { status: 403 }
        )
      }

    }

    const attendance = await markAttendance(
      decoded.userId,
      userIP
    )

    return NextResponse.json({
      message: "Attendance marked",
      attendance
    })

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }
}