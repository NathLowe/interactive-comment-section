import React from 'react'
import './index.css'

export default function Nested({
    children
}:{
    children: React.ReactNode
}) {
  return (
    <div className="nested pl-4 sm:pl-10">
        <div className="my-container pl-4 sm:pl-10">
            {children}
        </div>
    </div>
  )
}
