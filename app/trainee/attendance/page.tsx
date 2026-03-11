"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AttendancePage(){

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{

    fetch("/api/attendance/get")
    .then(res=>res.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })
    .catch(() => setLoading(false))

  },[])

  // Loader Component
  const Loader = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500">Loading attendance...</p>
    </div>
  )

  return(

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
            My Attendance Records
          </h1>

        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-1">Total Days</p>
            <p className="text-2xl font-bold text-gray-800">{data.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-1">This Month</p>
            <p className="text-2xl font-bold text-gray-800">
              {data.filter((item: any) => {
                const date = new Date(item.date)
                const now = new Date()
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
              }).length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-1">Last 30 Days</p>
            <p className="text-2xl font-bold text-gray-800">
              {data.filter((item: any) => {
                const date = new Date(item.date)
                const thirtyDaysAgo = new Date()
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                return date >= thirtyDaysAgo
              }).length}
            </p>
          </div>

        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-gray-100 border-b-2 border-gray-200">

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Check In Time
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200">

                {loading ? (

                  <tr>
                    <td colSpan={3} className="px-6 py-8">
                      <Loader />
                    </td>
                  </tr>

                ) : data.length > 0 ? (

                  data.map((item: any, index: number) => (
                    
                    <tr 
                      key={item.id} 
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {item.user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.user?.name}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(item.checkIn).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </span>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan={3} className="px-6 py-12 text-center">

                      <div className="flex flex-col items-center justify-center text-gray-400">

                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>

                        <p className="text-lg font-medium text-gray-500 mb-2">
                          No attendance records found
                        </p>

                        <p className="text-sm text-gray-400">
                          Your attendance history will appear here
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  )
}