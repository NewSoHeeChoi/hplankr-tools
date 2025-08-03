import { ReactNode } from 'react'

interface CalculatorCardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function CalculatorCard({ 
  children, 
  className = '', 
  padding = 'lg' 
}: CalculatorCardProps) {
  const paddingClasses = {
    sm: 'p-4 sm:p-6',
    md: 'p-5 sm:p-7',
    lg: 'p-6 sm:p-8'
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </div>
  )
}