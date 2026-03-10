"use client"

import { useState } from "react"

export default function TraineesPage() {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")

  const createTrainee = async ()=>{

    const res = await fetch("/api/trainee/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email})
    })

    const data = await res.json()

    if(res.ok){
      alert("Trainee created and credentials sent to email")
    }else{
      alert(data.error)
    }
  }

  return(

    <div className="p-8">

      <h1 className="text-xl font-bold mb-6">
        Create Trainee
      </h1>

      <div className="space-y-4 w-96">

        <input
        placeholder="Name"
        className="border w-full p-2"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        placeholder="Email"
        className="border w-full p-2"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <button
        onClick={createTrainee}
        className="bg-black text-white p-2 w-full"
        >
        Create Trainee
        </button>

      </div>

    </div>

  )
}