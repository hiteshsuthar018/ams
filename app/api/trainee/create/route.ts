import { NextResponse } from "next/server"
import { createTrainee } from "@/services/authService"

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email required" },
        { status: 400 }
      )
    }

    const trainee = await createTrainee(name, email)

    return NextResponse.json({
      message: "Trainee created successfully",
      trainee
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}