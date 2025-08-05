import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  const koMetadata = {
    title: '무료 온라인 계산기 모음 - BMI, 대출, 복리 계산기 | HPLankr Tools',
    description: '2025년 최신 무료 온라인 계산기! BMI, 대출, 복리이자, 급여, 팁 계산기 등 생활 필수 도구 9개를 한번에. 정확하고 빠른 계산 결과를 확인하세요.',
    keywords: '온라인 계산기, BMI 계산기, 대출 계산기, 복리 계산기, 급여 계산기, 팁 계산기, 무료 계산기, 생활 계산기',
    openGraph: {
      title: '무료 온라인 계산기 모음 - BMI, 대출, 복리 계산기',
      description: '2025년 최신 무료 온라인 계산기! 생활 필수 도구 9개를 한번에 사용하세요.',
      url: 'https://tools.hplankr.com/ko',
      siteName: 'HPLankr Tools',
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: '무료 온라인 계산기 모음 - HPLankr Tools',
      description: '2025년 최신 무료 온라인 계산기! BMI, 대출, 복리이자 등 생활 필수 도구.',
    },
    alternates: {
      canonical: 'https://tools.hplankr.com/ko',
      languages: {
        'ko-KR': 'https://tools.hplankr.com/ko',
        'en-US': 'https://tools.hplankr.com/en'
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

  const enMetadata = {
    title: 'Free Online Calculator Collection - BMI, Loan, Compound Interest | HPLankr Tools',
    description: '2025 Latest Free Online Calculators! BMI, loan, compound interest, salary, tip calculators and more. Get accurate and fast calculation results instantly.',
    keywords: 'online calculator, BMI calculator, loan calculator, compound interest calculator, salary calculator, tip calculator, free calculator, life calculator',
    openGraph: {
      title: 'Free Online Calculator Collection - BMI, Loan, Compound Interest',
      description: '2025 Latest Free Online Calculators! Essential life tools in one place.',
      url: 'https://tools.hplankr.com/en',
      siteName: 'HPLankr Tools',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Online Calculator Collection - HPLankr Tools',
      description: '2025 Latest Free Online Calculators! BMI, loan, compound interest and more essential tools.',
    },
    alternates: {
      canonical: 'https://tools.hplankr.com/en',
      languages: {
        'ko-KR': 'https://tools.hplankr.com/ko',
        'en-US': 'https://tools.hplankr.com/en'
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

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load optimized messages with namespace-based loading
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
