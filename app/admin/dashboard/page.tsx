"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AdminDashboard() {

  const router = useRouter()

  const [loggingOut, setLoggingOut] = useState(false)

  const [stats, setStats] = useState([
    { label: "Total Trainees", value: "0", change: "", icon: "👥" },
    { label: "Today's Attendance", value: "0", change: "", icon: "📊" },
    { label: "Attendance %", value: "0%", change: "", icon: "⚡" }
  ])

  const [recentActivity, setRecentActivity] = useState<any[]>([])

  const logout = async () => {

    setLoggingOut(true)

    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      setLoggingOut(false)
    }

  }

  // Fetch dashboard stats
  const fetchStats = async () => {

    try {

      const res = await fetch("/api/admin/stats")
      const data = await res.json()

      if (res.ok) {

        setStats([
          {
            label: "Total Trainees",
            value: data.totalTrainees.toString(),
            change: "",
            icon: "👥"
          },
          {
            label: "Today's Attendance",
            value: data.todayAttendance.toString(),
            change: "",
            icon: "📊"
          },
          {
            label: "Attendance %",
            value: `${data.attendancePercentage}%`,
            change: "",
            icon: "⚡"
          }
        ])

      }

    } catch (error) {
      console.error("Stats fetch failed:", error)
    }

  }

  // Fetch recent attendance
  const fetchRecentActivity = async () => {

    try {

      const res = await fetch("/api/attendance/all")
      const data = await res.json()

      if (res.ok) {

        const latest = data.slice(0, 5)

        setRecentActivity(latest)

      }

    } catch (error) {
      console.error("Recent activity fetch failed:", error)
    }

  }

  useEffect(() => {
    fetchStats()
    fetchRecentActivity()
  }, [])

  // Dashboard cards
  const dashboardItems = [
    {
      title: "Manage Trainees",
      description: "Add, edit, or remove trainee accounts",
      href: "/admin/trainees",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
        </svg>
      )
    },
    {
      title: "View Attendance",
      description: "Monitor and export attendance records",
      href: "/admin/attendance",
      color: "green",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7" />
        </svg>
      )
    },
    {
      title: "Update Password",
      description: "Change your account password",
      onClick: () => router.push("/admin/update-password"),
      color: "purple",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743" />
        </svg>
      )
    }
  ]

  const colorClasses: any = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <button
            onClick={logout}
            disabled={loggingOut}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {stats.map((stat, index) => (

            <div key={index} className="bg-white rounded-lg shadow-sm p-6">

              <div className="flex justify-between mb-2">
                <span className="text-3xl">{stat.icon}</span>
              </div>

              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>

              <p className="text-sm text-gray-500">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {dashboardItems.map((item, index) => {

            const CardWrapper: any = item.href ? "a" : "button"

            const props = item.href
              ? { href: item.href }
              : { onClick: item.onClick }

            return (

              <CardWrapper
                key={index}
                {...props}
                className="group bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition"
              >

                <div className="flex items-center gap-4">

                  <div className={`p-3 rounded-lg ${colorClasses[item.color]}`}>
                    {item.icon}
                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>

                  </div>

                </div>

              </CardWrapper>

            )

          })}

        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Recent Attendance
          </h2>

          <div className="space-y-3">

            {recentActivity.length === 0 && (
              <p className="text-gray-500 text-sm">
                No recent attendance
              </p>
            )}

            {recentActivity.map((item: any) => (

              <div key={item.id} className="flex justify-between border-b pb-2">

                <span className="text-sm text-gray-700">
                  <strong>{item.user?.name}</strong> checked in
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(item.checkIn).toLocaleTimeString()}
                </span>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}