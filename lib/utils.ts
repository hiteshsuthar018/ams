import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

// combine tailwind classes safely
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

// generate random password for trainee
export function generateRandomPassword(length: number = 10) {
  return crypto.randomBytes(length).toString("hex").slice(0, length)
}

// generate random token for password reset
export function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

// format date for attendance calendar
export function formatDate(date: Date) {
  return date.toISOString().split("T")[0]
}