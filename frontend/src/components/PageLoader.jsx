import React from 'react'
import { LuLoader } from 'react-icons/lu'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <LuLoader className='animate-spin size-10 text-primary' />
    </div>
  )
}

export default PageLoader