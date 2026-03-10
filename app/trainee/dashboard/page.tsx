"use client"

import { useRouter } from "next/navigation"

export default function TraineeDashboard(){

  const router = useRouter()

  const markAttendance = async ()=>{

    const res = await fetch("/api/attendance/mark",{
      method:"POST"
    })

    const data = await res.json()

    if(res.ok){
      alert("Attendance marked")
    }else{
      alert(data.error)
    }
  }

  return(

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
      Trainee Dashboard
      </h1>

      <button
      onClick={markAttendance}
      className="bg-green-600 text-white p-3"
      >
      Mark Attendance
      </button>

      <div className="mt-6">

        <button
        onClick={()=>router.push("/trainee/calendar")}
        className="underline"
        >
        View Attendance Calendar
        </button>

      </div>

    </div>

  )
}