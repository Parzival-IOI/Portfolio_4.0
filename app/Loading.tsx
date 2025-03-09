
import Loader from '@/components/loader'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-40 bg-slate-700/10 flex justify-center items-center">
      <Loader />
    </div>
  )
}

export default Loading