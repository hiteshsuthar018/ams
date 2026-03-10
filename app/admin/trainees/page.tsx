"use client"

import { useEffect, useState } from "react"

export default function TraineesPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [trainees, setTrainees] = useState<any[]>([])

  const fetchTrainees = async () => {
    const res = await fetch("/api/trainee/list")
    const data = await res.json()

    if (res.ok) {
      setTrainees(data)
    }
  }

  useEffect(() => {
    fetchTrainees()
  }, [])

  const createTrainee = async () => {

    const res = await fetch("/api/trainee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    })

    const data = await res.json()

    if (res.ok) {
      alert("Trainee created")
      setName("")
      setEmail("")
      fetchTrainees()
    } else {
      alert(data.error)
    }
  }

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Manage Trainees
      </h1>

      {/* Create trainee form */}

      <div className="mb-10 w-96 space-y-4">

        <input
          placeholder="Name"
          className="border w-full p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border w-full p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={createTrainee}
          className="bg-black text-white w-full p-2"
        >
          Create Trainee
        </button>

      </div>


      {/* Trainee cards */}

      <div className="grid grid-cols-3 gap-6">

        {trainees.map((t) => (

          <div
            key={t.id}
            className="border rounded-lg p-4 shadow-sm"
          >

            <h2 className="text-lg font-semibold">
              {t.name}
            </h2>

            <p className="text-gray-600 text-sm">
              {t.email}
            </p>

            <p className="text-xs mt-2 text-gray-400">
              Joined: {new Date(t.createdAt).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}