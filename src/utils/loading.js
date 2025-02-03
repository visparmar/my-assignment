import React from 'react'

const loading = () => {
  return (
    <div className="w-screen h-screen flex bg-red-600 items-center justify-center ">
    <div className="w-10 h-10 border-4  border-t-blue-600 rounded-full animate-spin">Loading...</div>
  </div>
  
  )
}

export default loading