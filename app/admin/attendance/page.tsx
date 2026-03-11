"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"

export default function AttendancePage(){

  const [data,setData] = useState<any[]>([])

  const fetchAttendance = async () => {

    const res = await fetch("/api/attendance/all")
    const result = await res.json()

    if(res.ok){
      setData(result)
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

  return(

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-xl font-bold">
          Attendance Records
        </h1>

        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>

      </div>

      <table className="w-full border">

        <thead>

          <tr className="border bg-gray-100">

            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Date</th>
            <th className="p-2">Check In</th>
            <th className="p-2">IP</th>

          </tr>

        </thead>

        <tbody>

          {data.map((item:any)=>(
            <tr key={item.id} className="border">

              <td className="p-2">{item.user?.name}</td>
              <td className="p-2">{item.user?.email}</td>
              <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
              <td className="p-2">{new Date(item.checkIn).toLocaleTimeString()}</td>
              <td className="p-2">{item.ipAddress}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}