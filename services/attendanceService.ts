import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

export async function markAttendance(userId: string, ipAddress: string) {

  const today = formatDate(new Date())

  const existing = await prisma.attendance.findFirst({
    where: {
      userId,
      date: new Date(today)
    }
  })

  if (existing) {
    throw new Error("Attendance already marked for today")
  }

  return prisma.attendance.create({
    data: {
      userId,
      date: new Date(today),
      checkIn: new Date(),
      ipAddress
    }
  })
}

export async function getUserAttendance(userId: string) {

  return prisma.attendance.findMany({
    where: { userId },
    orderBy: {
      date: "desc"
    }
  })
}

export async function getAllAttendance() {

  return prisma.attendance.findMany({
    include: {
      user: true
    },
    orderBy: {
      date: "desc"
    }
  })
}