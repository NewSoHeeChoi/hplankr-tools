'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  fullWidthResponsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function AdUnit({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = { display: 'block' }
}: AdUnitProps) {
  useEffect(() => {
    try {
      // AdSense 광고 로드
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense 로드 오류:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3425562734637251"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

// 광고 슬롯 설정 (AdSense에서 생성 후 업데이트)
export const AdSlots = {
  HEADER_BANNER: '1234567890',      // 헤더 배너 (728x90 또는 반응형)
  SIDEBAR_RECT: '2345678901',       // 사이드바 직사각형 (300x250)
  IN_CONTENT: '3456789012',         // 본문 내 광고 (반응형)
  FOOTER_BANNER: '4567890123',      // 푸터 배너 (728x90 또는 반응형)
  MOBILE_BANNER: '5678901234',      // 모바일 배너 (320x50)
  LARGE_RECTANGLE: '6789012345',    // 큰 직사각형 (336x280)
}