import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET() {

  try {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded: any = verifyToken(token)

    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const today = new Date()
    today.setHours(0,0,0,0)

    const totalTrainees = await prisma.user.count({
      where: { role: "TRAINEE" }
    })

    const todayAttendance = await prisma.attendance.count({
      where: {
        date: {
          gte: today
        }
      }
    })

    const attendancePercentage =
      totalTrainees === 0
        ? 0
        : Math.round((todayAttendance / totalTrainees) * 100)

    return NextResponse.json({
      totalTrainees,
      todayAttendance,
      attendancePercentage
    })

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }

}