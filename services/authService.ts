import { prisma } from "@/lib/prisma"
import { hashPassword, comparePassword, generateToken } from "@/lib/auth"
import { generateRandomPassword } from "@/lib/utils"
import { sendCredentialsEmail } from "./emailService"

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const validPassword = await comparePassword(password, user.password)

  if (!validPassword) {
    throw new Error("Invalid credentials")
  }

  const token = generateToken({
    userId: user.id,
    role: user.role
  })

  return { user, token }
}

export async function createTrainee(name: string, email: string) {

  const password = generateRandomPassword()

  const hashedPassword = await hashPassword(password)

  const trainee = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "TRAINEE"
    }
  })

  // send credentials via email
  await sendCredentialsEmail(email, password)

  return trainee
}

export async function resetPassword(email: string, newPassword: string) {

  const hashedPassword = await hashPassword(newPassword)

  return prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword
    }
  })
}