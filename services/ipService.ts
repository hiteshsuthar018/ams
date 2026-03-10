import { prisma } from "@/lib/prisma"

export async function validateIPAddress(ipAddress: string) {

  const allowedIP = await prisma.allowedIP.findUnique({
    where: {
      ipAddress
    }
  })

  if (!allowedIP) {
    throw new Error(
      "Access denied. Please connect to training center network."
    )
  }

  return true
}