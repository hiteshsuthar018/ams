"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TraineesPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [trainees, setTrainees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const router = useRouter()

  const fetchTrainees = async () => {
    setLoading(true)
    const res = await fetch("/api/trainee/list")
    const data = await res.json()

    if (res.ok) {
      setTrainees(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTrainees()
  }, [])

  const createTrainee = async () => {

    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields")
      return
    }

    setCreating(true)

    const res = await fetch("/api/trainee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    })

    const data = await res.json()

    if (res.ok) {
      alert("Trainee created successfully")
      setName("")
      setEmail("")
      fetchTrainees()
    } else {
      alert(data.error)
    }
    setCreating(false)
  }

  // Loader Component
  const Loader = () => (
    <div className="flex flex-col items-center justify-center py-12 col-span-3">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500">Loading trainees...</p>
    </div>
  )

  return (

    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header with Back Button */}
        <div className="mb-6 flex items-center gap-4">

          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 group-hover:border-gray-300 group-hover:shadow transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Manage Trainees
          </h1>

        </div>

        {/* Create Trainee Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-md">

          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Add New Trainee
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                placeholder="e.g., John Doe"
                className="w-full px-4 py-2.5 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g., john@example.com"
                className="w-full px-4 py-2.5 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={createTrainee}
              disabled={creating || !name.trim() || !email.trim()}
              className={`w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-green-300 focus:outline-none shadow-md flex items-center justify-center gap-2 ${
                (creating || !name.trim() || !email.trim()) ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
              }`}
            >
              {creating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Trainee
                </>
              )}
            </button>

          </div>

        </div>

        {/* Trainees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading ? (
            <Loader />
          ) : trainees.length > 0 ? (

            trainees.map((t, index) => (

              <div
                key={t.id}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-green-200"
              >

                <div className="flex items-start justify-between mb-3">

                  <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                    {t.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>

                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">
                  {t.name}
                </h2>

                <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t.email}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Joined {new Date(t.createdAt).toLocaleDateString()}
                  </div>

                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">

              <div className="flex flex-col items-center justify-center text-gray-400">

                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>

                <p className="text-lg font-medium text-gray-500 mb-2">
                  No trainees found
                </p>

                <p className="text-sm text-gray-400">
                  Add your first trainee using the form above
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}