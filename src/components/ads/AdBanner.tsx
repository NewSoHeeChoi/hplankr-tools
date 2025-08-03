'use client'

import AdUnit from './AdUnit'

interface AdBannerProps {
  position: 'header' | 'footer' | 'mobile'
  className?: string
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  const getAdConfig = () => {
    switch (position) {
      case 'header':
        return {
          adSlot: '1234567890', // 헤더 배너 슬롯
          style: { display: 'block', textAlign: 'center' as const, minHeight: '90px' },
          className: 'header-ad mb-4'
        }
      case 'footer':
        return {
          adSlot: '4567890123', // 푸터 배너 슬롯
          style: { display: 'block', textAlign: 'center' as const, minHeight: '90px' },
          className: 'footer-ad mt-4'
        }
      case 'mobile':
        return {
          adSlot: '5678901234', // 모바일 배너 슬롯
          style: { display: 'block', textAlign: 'center' as const, minHeight: '50px' },
          className: 'mobile-ad block md:hidden'
        }
      default:
        return {
          adSlot: '1234567890',
          style: { display: 'block' },
          className: ''
        }
    }
  }

  const config = getAdConfig()

  return (
    <div className={`ad-banner ${config.className} ${className}`}>
      <AdUnit
        adSlot={config.adSlot}
        style={config.style}
        className="w-full"
      />
    </div>
  )
}