"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"

export default function AttendancePage(){

  const [data,setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAttendance = async () => {

    setLoading(true)
    
    try {
      const res = await fetch("/api/attendance/all")
      const result = await res.json()

      if(res.ok){
        setData(result)
      }
    } catch (error) {
      console.error("Error fetching attendance:", error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(()=>{
    fetchAttendance()
  },[])

  // Excel download function
  const downloadExcel = () => {

    const formattedData = data.map((item:any)=>({
      Name: item.user?.name,
      Email: item.user?.email,
      Date: new Date(item.date).toLocaleDateString(),
      CheckIn: new Date(item.checkIn).toLocaleTimeString(),
      IP_Address: item.ipAddress
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData)

    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance")

    XLSX.writeFile(workbook, "attendance.xlsx")

  }

  // Loader Component
  const Loader = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        {/* Spinning inner ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading attendance records...</p>
    </div>
  )

  return(

    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Attendance Records
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? 'Fetching records...' : `Total Records: ${data.length}`}
            </p>
          </div>

          <button
            onClick={downloadExcel}
            disabled={loading || data.length === 0}
            className={`bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-300 focus:outline-none shadow-md flex items-center gap-2 ${
              loading || data.length === 0 
                ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                : 'hover:bg-green-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Excel
          </button>

        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-gray-100 border-b-2 border-gray-200">

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Check In
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    IP Address
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200">

                {loading ? (

                  <tr>
                    <td colSpan={5} className="px-6 py-8">
                      <Loader />
                    </td>
                  </tr>

                ) : data.length > 0 ? (

                  data.map((item:any, index:number) => (
                    
                    <tr 
                      key={item.id} 
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.user?.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {item.user?.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {new Date(item.checkIn).toLocaleTimeString()}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 font-mono">
                          {item.ipAddress}
                        </div>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan={5} className="px-6 py-12 text-center">

                      <div className="flex flex-col items-center justify-center text-gray-400">

                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>

                        <p className="text-lg font-medium">No attendance records found</p>

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