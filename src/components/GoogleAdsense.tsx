'use client'

import Script from 'next/script'

interface GoogleAdsenseProps {
  publisherId: string
}

export default function GoogleAdsense({ publisherId }: GoogleAdsenseProps) {
  return (
    <>
      {/* AdSense 자동 광고 */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* AdSense 초기화 */}
      <Script id="adsense-init" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>
    </>
  )
}