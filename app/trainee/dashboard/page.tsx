"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TraineeDashboard(){

  const router = useRouter()
  const [marking, setMarking] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const markAttendance = async ()=>{

    setMarking(true)

    try {
      const res = await fetch("/api/attendance/mark",{
        method:"POST"
      })

      const data = await res.json()

      if(res.ok){
        alert("✅ Attendance marked successfully")
      }else{
        alert(data.error)
      }
    } catch (error) {
      alert("Failed to mark attendance")
    } finally {
      setMarking(false)
    }
  }

  const logout = async ()=>{

    setLoggingOut(true)

    await fetch("/api/auth/logout",{
      method:"POST"
    })

    router.push("/login")
  }

  // Dashboard cards data
  const dashboardItems = [
    {
      title: "Mark Attendance",
      description: "Record your daily attendance",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onClick: markAttendance,
      color: "green",
      loading: marking
    },
    {
      title: "View Attendance",
      description: "Check your attendance history",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: "/trainee/calendar",
      color: "blue"
    },
    {
      title: "Update Password",
      description: "Change your account password",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      href: "/trainee/update-password",
      color: "purple"
    }
  ]

  const colorClasses = {
    green: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Trainee Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, Trainee
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              disabled={loggingOut}
              className={`bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-red-300 focus:outline-none shadow-md flex items-center gap-2 ${
                loggingOut ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
              }`}
            >
              {loggingOut ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging out...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!
          </h2>
          <p className="text-gray-600">
            Don't forget to mark your attendance for today.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {dashboardItems.map((item, index) => {

            const CardWrapper = item.href ? 'a' : 'button'
            const props = item.href ? { href: item.href } : { onClick: item.onClick, disabled: item.loading }

            return (

              <CardWrapper
                key={index}
                {...props}
                className={`group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  item.loading ? 'opacity-70 cursor-not-allowed hover:translate-y-0' : ''
                }`}
              >

                <div className="flex items-start space-x-4">

                  {/* Icon Container */}
                  <div className={`p-3 rounded-lg transition-all duration-300 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    {item.loading ? (
                      <svg className="animate-spin w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      item.icon
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-gray-900">
                      {item.loading ? 'Marking...' : item.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  {!item.loading && (
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}

                </div>

              </CardWrapper>

            )

          })}

        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Quick Tip</p>
              <p className="text-sm text-blue-600 mt-1">
                You can only mark attendance once per day. Make sure to check in when you arrive.
              </p>
            </div>
          </div>
        </div>

      </main>

    </div>
  )
}