"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage(){

  const router = useRouter()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const updatePassword = async ()=>{

    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/update-password",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        oldPassword,
        newPassword
      })
    })

    const data = await res.json()

    if(res.ok){
      alert("Password updated successfully")
      router.push("/trainee/dashboard")
    }else{
      alert(data.error)
      setLoading(false)
    }

  }

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!newPassword) return null
    if (newPassword.length < 6) return { text: "Too short", color: "text-red-500", bg: "bg-red-500" }
    if (newPassword.length < 8) return { text: "Weak", color: "text-orange-500", bg: "bg-orange-500" }
    if (newPassword.length < 12) return { text: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" }
    return { text: "Strong", color: "text-green-500", bg: "bg-green-500" }
  }

  const strength = getPasswordStrength()

  return(

    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">

      <div className="max-w-md w-full">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 group-hover:border-gray-300 group-hover:shadow transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">

          {/* Header with gradient */}
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Update Password
            </h1>
            <p className="text-green-100 text-sm mt-1">
              Choose a strong password to keep your account secure
            </p>
          </div>

          {/* Form */}
          <div className="p-6">

            <div className="space-y-5">

              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2.5 pr-10 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showOldPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 pr-10 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {newPassword && strength && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${strength.bg} transition-all duration-300`}
                          style={{ 
                            width: newPassword.length < 6 ? '25%' : 
                                   newPassword.length < 8 ? '50%' : 
                                   newPassword.length < 12 ? '75%' : '100%' 
                          }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${strength.color}`}>
                        {strength.text}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2.5 pr-10 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Match indicator */}
                {confirmPassword && (
                  <div className="mt-1 flex items-center gap-1">
                    {newPassword === confirmPassword ? (
                      <>
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-green-500">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-xs text-red-500">Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Password requirements */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                <ul className="space-y-1 text-xs text-gray-500">
                  <li className="flex items-center gap-1">
                    {newPassword.length >= 6 ? (
                      <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                    At least 6 characters
                  </li>
                </ul>
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={() => router.back()}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={updatePassword}
                disabled={loading || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6}
                className={`flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-green-300 focus:outline-none shadow-md flex items-center justify-center gap-2 ${
                  (loading || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6) 
                    ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                    : 'hover:bg-green-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}