'use client'

interface ErrorMessageProps {
  message: string
  icon?: string
  className?: string
}

export default function ErrorMessage({ 
  message, 
  icon = '⚠️', 
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`flex items-center justify-center h-full min-h-32 ${className}`}>
      <div className="text-center text-red-600">
        <div className="text-4xl mb-4 animate-pulse">{icon}</div>
        <div className="font-medium text-lg">{message}</div>
      </div>
    </div>
  )
}