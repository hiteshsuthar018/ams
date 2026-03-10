"use client"

import { useEffect, useState } from "react"

export default function AttendancePage(){

  const [data,setData]=useState([])

  useEffect(()=>{

    fetch("/api/attendance/get")
    .then(res=>res.json())
    .then(setData)

  },[])

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

          {data.map((item:any)=>(
            <tr key={item.id} className="border">

              <td className="p-2">
                {item.user?.name}
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