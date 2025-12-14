import React from 'react'

export const LoadingSpinner = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-b-2',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full border-teal-600 ${sizeClasses[size]}`}
        style={{ borderTopColor: 'transparent' }}
      />
      {text && <p className="text-sm text-stone-500 font-medium">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
