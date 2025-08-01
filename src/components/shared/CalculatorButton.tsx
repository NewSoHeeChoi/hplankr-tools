'use client'

import { ReactNode } from 'react'

interface CalculatorButtonProps {
  onClick: () => void
  isLoading?: boolean
  loadingText?: string
  children: ReactNode
  className?: string
  disabled?: boolean
  colorScheme?: 'blue' | 'emerald' | 'purple' | 'rose' | 'indigo'
}

export default function CalculatorButton({
  onClick,
  isLoading = false,
  loadingText = 'Loading...',
  children,
  className = '',
  disabled = false,
  colorScheme = 'blue'
}: CalculatorButtonProps) {
  const colorClasses = {
    blue: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    emerald: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
    purple: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    rose: 'from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700',
    indigo: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full py-4 px-6 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
        isLoading || disabled
          ? 'bg-gray-400 cursor-not-allowed text-white'
          : `bg-gradient-to-r ${colorClasses[colorScheme]} text-white`
      } ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  )
}