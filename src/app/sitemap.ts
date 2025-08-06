import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 🚨 하드코딩으로 강제 설정 - 어떤 환경변수도 사용하지 않음
  const baseUrl = 'https://calc.hplankr.com'  // 절대 변경 불가

  // 계산기 페이지들 (우선순위별 분류)
  const highPriorityCalculators = ['bmi', 'age', 'loan'] // 인기 계산기
  const mediumPriorityCalculators = ['converter', 'percent', 'compound', 'tip']
  const standardPriorityCalculators = ['salary', 'affordability']
  
  // 지원 언어
  const locales = ['ko', 'en']
  
  const currentDate = new Date().toISOString()
  
  const sitemapEntries: MetadataRoute.Sitemap = [
    // 홈페이지 (최고 우선순위)
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // 언어별 홈페이지 (높은 우선순위)
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
    // 인기 계산기들 (높은 우선순위)
    ...locales.flatMap(locale =>
      highPriorityCalculators.map(calculator => ({
        url: `${baseUrl}/${locale}/${calculator}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    ),
    // 중간 우선순위 계산기들
    ...locales.flatMap(locale =>
      mediumPriorityCalculators.map(calculator => ({
        url: `${baseUrl}/${locale}/${calculator}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    ),
    // 표준 우선순위 계산기들
    ...locales.flatMap(locale =>
      standardPriorityCalculators.map(calculator => ({
        url: `${baseUrl}/${locale}/${calculator}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      }))
    )
  ]
  
  return sitemapEntries
}