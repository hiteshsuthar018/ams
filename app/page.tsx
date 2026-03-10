import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyToken } from "@/lib/auth"

export default async function HomePage() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  // if no token → login
  if (!token) {
    redirect("/login")
  }

  const decoded: any = verifyToken(token)

  if (!decoded) {
    redirect("/login")
  }

  // role based redirect
  if (decoded.role === "ADMIN") {
    redirect("/admin/dashboard")
  }

  if (decoded.role === "TRAINEE") {
    redirect("/trainee/dashboard")
  }

  redirect("/login")
}