import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET as string

// hash password before saving to database
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

// compare login password with hashed password
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword)
}

// generate JWT token after login
export function generateToken(payload: {
  userId: string
  role: string
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  })
}

// verify token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}