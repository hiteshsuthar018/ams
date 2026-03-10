"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()

    if (res.ok) {

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard")
      } else {
        router.push("/trainee/dashboard")
      }

    } else {
      alert(data.error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="w-96 space-y-4 border p-6 rounded-lg"
      >
        <h1 className="text-xl font-bold">
          Kadel Labs Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-2"
        >
          Login
        </button>

      </form>

    </div>
  )
}