"use client"

import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import { useRouter } from "next/navigation"
import "react-calendar/dist/Calendar.css"

export default function CalendarPage(){

  const [attendance, setAttendance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const router = useRouter()

  useEffect(()=>{

    fetch("/api/attendance/get")
    .then(res=>res.json())
    .then(data => {
      setAttendance(data)
      setLoading(false)
    })
    .catch(() => setLoading(false))

  },[])

  const markedDates = attendance.map(a =>
    new Date(a.date).toDateString()
  )

  // Get attendance for selected date
  const selectedDateAttendance = attendance.filter(a => 
    new Date(a.date).toDateString() === selectedDate.toDateString()
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
            Attendance Calendar
          </h1>

        </div>

        {loading ? (

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-500">Loading calendar...</p>
            </div>
          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Calendar */}
            <div className="lg:col-span-2 bg-white text-black rounded-lg shadow-sm border border-gray-200 p-6">

              <style jsx global>{`
                .react-calendar {
                  width: 100%;
                  border: none;
                  font-family: inherit;
                }
                .react-calendar__tile {
                  padding: 1em 0.5em;
                  border-radius: 0.5rem;
                  transition: all 0.2s;
                }
                .react-calendar__tile:hover {
                  background-color: #f0fdf4;
                }
                .react-calendar__tile--active {
                  background-color: #22c55e !important;
                  color: white !important;
                }
                .react-calendar__tile--now {
                  background-color: #f3f4f6;
                }
                .bg-green-400 {
                  background-color: #22c55e !important;
                  color: white !important;
                  font-weight: 500;
                }
              `}</style>

              <Calendar
                onChange={setSelectedDate as any}
                value={selectedDate}
                tileClassName={({ date }) => {
                  if(markedDates.includes(date.toDateString())){
                    return "bg-green-400 text-white hover:bg-green-500"
                  }
                  return ""
                }}
              />

            </div>

            {/* Selected Date Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>

              {selectedDateAttendance.length > 0 ? (

                <div className="space-y-3">

                  {selectedDateAttendance.map((item: any) => (

                    <div key={item.id} className="bg-green-50 rounded-lg p-4 border border-green-100">

                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {item.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.user?.name}</p>
                          <p className="text-xs text-gray-500">{item.user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Check In:</span>
                        <span className="font-medium text-green-700">
                          {new Date(item.checkIn).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </span>
                      </div>

                      {item.ipAddress && (
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">IP Address:</span>
                          <span className="font-mono text-xs text-gray-500">{item.ipAddress}</span>
                        </div>
                      )}

                    </div>

                  ))}

                </div>

              ) : (

                <div className="text-center py-8">

                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <p className="text-gray-500 font-medium">No attendance marked</p>
                  <p className="text-sm text-gray-400 mt-1">This date has no attendance records</p>

                </div>

              )}

              {/* Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200">

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total present this month:</span>
                  <span className="font-semibold text-gray-800">
                    {attendance.filter(a => {
                      const date = new Date(a.date)
                      return date.getMonth() === selectedDate.getMonth() && 
                             date.getFullYear() === selectedDate.getFullYear()
                    }).length}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Total present this year:</span>
                  <span className="font-semibold text-gray-800">
                    {attendance.filter(a => {
                      const date = new Date(a.date)
                      return date.getFullYear() === selectedDate.getFullYear()
                    }).length}
                  </span>
                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}