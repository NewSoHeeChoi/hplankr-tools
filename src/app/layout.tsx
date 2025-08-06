import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import GoogleAdsense from '@/components/GoogleAdsense'
import AutoAds from '@/components/AutoAds'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'HPLankr Tools - 무료 온라인 계산기 도구',
  description: '무료 온라인 계산기 도구 모음 - BMI, 나이, 복리, 환율, 대출, 퍼센트 계산기. 간편하고 정확한 계산을 도와드립니다.',
  keywords: 'BMI 계산기, 나이 계산기, 복리 계산기, 환율 계산기, 대출 계산기, 퍼센트 계산기, 무료 계산기, 온라인 도구',
  authors: [{ name: 'HPLankr Tools' }],
  creator: 'HPLankr Tools',
  publisher: 'HPLankr Tools',
  robots: 'index, follow',
  openGraph: {
    title: 'HPLankr Tools - 무료 온라인 계산기 도구',
    description: '무료 온라인 계산기 도구 모음 - BMI, 나이, 복리, 환율, 대출, 퍼센트 계산기',
    url: 'https://calc.hplankr.com',
    siteName: 'HPLankr Tools',
    type: 'website',
    locale: 'ko_KR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HPLankr Tools - 무료 온라인 계산기 도구',
    description: '무료 온라인 계산기 도구 모음 - BMI, 나이, 복리, 환율, 대출, 퍼센트 계산기'
  },
  alternates: {
    canonical: 'https://calc.hplankr.com'
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || ''
  }
}

export default function RootLayout({
  children
}: Props) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <GoogleAdsense publisherId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-3425562734637251'} />
        <AutoAds />
        {children}
      </body>
    </html>
  )
}