import { ReactNode } from 'react'
import Header from './Header'
import AdBanner from '@/components/ads/AdBanner'
import AdUnit from '@/components/ads/AdUnit'

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
          {/* 헤더 광고 */}
          <AdBanner position="header" className="mb-8" />

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

          {/* 본문 상단 광고 */}
          <div className="mb-8">
            <AdUnit
              adSlot="3456789012"
              style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}
              className="content-top-ad"
            />
          </div>

          {children}

          {/* 본문 하단 광고 */}
          <div className="mt-8">
            <AdUnit
              adSlot="3456789012"
              style={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}
              className="content-bottom-ad"
            />
          </div>

          {/* 푸터 광고 */}
          <AdBanner position="footer" className="mt-8" />

          {/* 모바일 광고 */}
          <AdBanner position="mobile" className="mt-4" />
        </div>
      </div>
    </div>
  )
}