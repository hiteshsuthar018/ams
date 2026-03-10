
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

async function main() {

  const hashedPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@kadellabs.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  })

  console.log("Admin user created")
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())