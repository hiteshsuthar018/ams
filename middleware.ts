export const runtime = "nodejs"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

// Office WiFi Public IP
const OFFICE_PUBLIC_IP = "223.190.246.151"

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  // Public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next()
  }

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const decoded: any = verifyToken(token)

  if (!decoded) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Admin route protection
  if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  // Trainee route protection
  if (pathname.startsWith("/trainee") && decoded.role !== "TRAINEE") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  // WiFi restriction for trainees
  if (decoded.role === "TRAINEE") {

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      ""

    const userIP = ip.split(",")[0].trim()

    // Allow localhost for development
    if (userIP === "127.0.0.1" || userIP === "::1") {
      return NextResponse.next()
    }

    // Allow only office public IP
    if (userIP !== OFFICE_PUBLIC_IP) {
      return NextResponse.redirect(
        new URL("/network-restricted", request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/trainee/:path*"]
}