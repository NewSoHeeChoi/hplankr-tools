import { ReactNode } from 'react'
import Header from './Header'

interface CalculatorLayoutProps {
  children: ReactNode
  title: string
  description: string
  icon: string
  colorScheme?: 'blue' | 'emerald' | 'purple' | 'rose' | 'indigo'
}

export default function CalculatorLayout({
  children,
  title,
  description,
  icon,
  colorScheme = 'blue'
}: CalculatorLayoutProps) {
  const colorClasses = {
    blue: 'from-blue-50 via-white to-indigo-50',
    emerald: 'from-emerald-50 via-white to-green-50',
    purple: 'from-purple-50 via-white to-pink-50',
    rose: 'from-rose-50 via-white to-pink-50',
    indigo: 'from-indigo-50 via-white to-blue-50'
  }

  const iconColorClasses = {
    blue: 'from-blue-600 to-blue-700',
    emerald: 'from-emerald-600 to-emerald-700',
    purple: 'from-purple-600 to-purple-700',
    rose: 'from-rose-600 to-pink-600',
    indigo: 'from-indigo-600 to-indigo-700'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colorClasses[colorScheme]}`}>
      <Header showBackButton />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto lg:max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${iconColorClasses[colorScheme]} rounded-2xl text-white text-2xl mb-6 shadow-lg`}>
              {icon}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}