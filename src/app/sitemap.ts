import { MetadataRoute } from 'next'

// Force no caching and immediate revalidation
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  // 강제로 calc.hplankr.com 사용 (환경변수 무시)
  const baseUrl = 'https://calc.hplankr.com'
  
  // 환경 디버그 정보를 콘솔에 출력 (개발 환경에서만)
  if (process.env.NODE_ENV !== 'production') {
    console.log('Sitemap Debug Info:', {
      VERCEL_URL: process.env.VERCEL_URL,
      NODE_ENV: process.env.NODE_ENV,
      baseUrl,
      timestamp: new Date().toISOString()
    })
  }

  // 정적 페이지들
  const routes = [
    '',
    '/ko',
    '/en',
    '/ko/bmi',
    '/en/bmi',
    '/ko/converter', 
    '/en/converter',
    '/ko/percent',
    '/en/percent',
    '/ko/age',
    '/en/age',
    '/ko/compound',
    '/en/compound',
    '/ko/loan',
    '/en/loan',
    '/ko/tip',
    '/en/tip',
    '/ko/salary',
    '/en/salary',
    '/ko/affordability',
    '/en/affordability'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.includes('/ko') || route.includes('/en') ? 0.8 : 0.5,
  }))
}