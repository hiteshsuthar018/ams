import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function GET() {

  const password = await bcrypt.hash("admin123",10)

  await prisma.user.create({
    data:{
      name:"Admin",
      email:"admin@kadellabs.com",
      password,
      role:"ADMIN"
    }
  })

  return NextResponse.json({message:"Admin created"})
}