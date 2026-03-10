"use client"

import { useEffect, useState } from "react"
import Calendar from "react-calendar"

export default function CalendarPage(){

  const [attendance,setAttendance]=useState<any[]>([])

  useEffect(()=>{

    fetch("/api/attendance/get")
    .then(res=>res.json())
    .then(setAttendance)

  },[])

  const markedDates = attendance.map(a =>
    new Date(a.date).toDateString()
  )

  return(

    <div className="p-8">

      <h1 className="text-xl font-bold mb-6">
      Attendance Calendar
      </h1>

      <Calendar
      tileClassName={({date})=>{

        if(markedDates.includes(date.toDateString())){
          return "bg-green-400 text-white"
        }

      }}
      />

    </div>

  )
}