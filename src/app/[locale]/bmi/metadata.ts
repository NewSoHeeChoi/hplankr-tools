import { Metadata } from 'next';

export async function generateBMIMetadata(locale: string): Promise<Metadata> {
  const koMetadata: Metadata = {
    title: 'BMI 계산기 - 체질량지수 무료 계산 | HPLankr Tools',
    description: '2025년 정확한 BMI 계산기로 체질량지수를 확인하세요. 키와 몸무게를 입력하면 BMI 지수와 비만도 판정 결과를 즉시 확인할 수 있습니다. 완전 무료!',
    keywords: 'BMI 계산기, 체질량지수, 비만도 계산, 체중 계산기, 건강 계산기, 무료 BMI, 체질량지수 계산',
    openGraph: {
      title: 'BMI 계산기 - 체질량지수 무료 계산',
      description: '키와 몸무게로 BMI 지수를 정확하게 계산하고 비만도를 확인하세요.',
      url: 'https://tools.hplankr.com/ko/bmi',
      siteName: 'HPLankr Tools',
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BMI 계산기 - 체질량지수 무료 계산',
      description: '키와 몸무게로 BMI 지수를 정확하게 계산하고 비만도를 확인하세요.',
    },
    alternates: {
      canonical: 'https://tools.hplankr.com/ko/bmi',
      languages: {
        'ko-KR': 'https://tools.hplankr.com/ko/bmi',
        'en-US': 'https://tools.hplankr.com/en/bmi'
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  const enMetadata: Metadata = {
    title: 'BMI Calculator - Free Body Mass Index Calculator | HPLankr Tools',
    description: '2025 Accurate BMI Calculator to check your Body Mass Index. Enter height and weight to get instant BMI results and obesity assessment. Completely free!',
    keywords: 'BMI calculator, body mass index, obesity calculator, weight calculator, health calculator, free BMI, BMI calculation',
    openGraph: {
      title: 'BMI Calculator - Free Body Mass Index Calculator',
      description: 'Calculate your BMI accurately with height and weight and check your obesity level.',
      url: 'https://tools.hplankr.com/en/bmi',
      siteName: 'HPLankr Tools',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BMI Calculator - Free Body Mass Index Calculator',
      description: 'Calculate your BMI accurately with height and weight and check your obesity level.',
    },
    alternates: {
      canonical: 'https://tools.hplankr.com/en/bmi',
      languages: {
        'ko-KR': 'https://tools.hplankr.com/ko/bmi',
        'en-US': 'https://tools.hplankr.com/en/bmi'
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
  
  return locale === 'ko' ? koMetadata : enMetadata;
}