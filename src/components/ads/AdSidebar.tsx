'use client'

import AdUnit from './AdUnit'

interface AdSidebarProps {
  className?: string
}

export default function AdSidebar({ className = '' }: AdSidebarProps) {
  return (
    <div className={`ad-sidebar ${className}`}>
      {/* 사이드바 직사각형 광고 */}
      <div className="mb-6">
        <AdUnit
          adSlot="2345678901" // 사이드바 직사각형 슬롯
          adFormat="rectangle"
          style={{
            display: 'block',
            width: '300px',
            height: '250px',
            margin: '0 auto'
          }}
          className="sidebar-rectangle-ad"
        />
      </div>

      {/* 큰 직사각형 광고 */}
      <div className="mb-6">
        <AdUnit
          adSlot="6789012345" // 큰 직사각형 슬롯
          adFormat="rectangle"
          style={{
            display: 'block',
            width: '336px',
            height: '280px',
            margin: '0 auto'
          }}
          className="sidebar-large-rectangle-ad"
        />
      </div>
    </div>
  )
}