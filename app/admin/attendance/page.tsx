"use client"

import { useEffect, useState } from "react"

export default function AttendancePage(){

  const [data,setData] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function fetchAttendance(){

      try{

        const res = await fetch("/api/attendance/all")
        
        const result = await res.json()

        // ensure array
        if(Array.isArray(result)){
          setData(result)
        }else{
          console.error("API returned:", result)
          setData([])
        }

      }catch(err){
        console.error("Fetch error:",err)
        setData([])
      }

      setLoading(false)

    }

    fetchAttendance()

  },[])

  if(loading){
    return <div className="p-8">Loading attendance...</div>
  }

  return(

    <div className="p-8">

      <h1 className="text-xl font-bold mb-6">
        Attendance Records
      </h1>

      <table className="w-full border">

        <thead>
          <tr className="border">
            <th className="p-2">Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Check In</th>
          </tr>
        </thead>

        <tbody>

          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No attendance records
              </td>
            </tr>
          )}

          {data.map((item:any)=>(
            <tr key={item.id} className="border">

              <td className="p-2">
                {item.user?.name || "Unknown"}
              </td>

              <td className="p-2">
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td className="p-2">
                {new Date(item.checkIn).toLocaleTimeString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )
}