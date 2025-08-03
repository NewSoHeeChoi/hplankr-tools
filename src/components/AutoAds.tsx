'use client'

import Script from 'next/script'

export default function AutoAds() {
  return (
    <Script id="auto-ads-init" strategy="afterInteractive">
      {`
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-3425562734637251",
          enable_page_level_ads: true
        });
      `}
    </Script>
  )
}