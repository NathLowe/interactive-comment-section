import React from 'react'
import "./index.css"

export default function Button({
    children,
    onClick,
    className,
}:{
    children: React.ReactNode,
    onClick: ()=>void,
    className?:string,
}) {
  return (
    <button onClick={onClick} className={`my-button ${className}`} >
      {children}
    </button>
  )
}
