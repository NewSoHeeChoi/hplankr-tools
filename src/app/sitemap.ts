import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calc.hplankr.com'
  
  const calculators = [
    'age',
    'bmi', 
    'compound',
    'converter',
    'loan',
    'percent',
    'tip',
    'salary',
    'affordability'
  ]

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ko`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ]

  // 한국어 페이지
  calculators.forEach(calc => {
    routes.push({
      url: `${baseUrl}/ko/${calc}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  })

  // 영어 페이지  
  calculators.forEach(calc => {
    routes.push({
      url: `${baseUrl}/en/${calc}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  })

  return routes
}