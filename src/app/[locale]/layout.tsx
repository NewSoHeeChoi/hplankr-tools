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
  
  return {
    title: locale === 'ko' ? '필수 계산기 모음 - HPLankr Tools' : 'Essential Calculator Collection - HPLankr Tools',
    description: locale === 'ko' 
      ? '일상에서 자주 사용하는 계산을 정확하고 빠르게 처리할 수 있는 전문적인 도구들을 제공합니다.'
      : 'Provide professional tools that can accurately and quickly process calculations frequently used in daily life.',
  };
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
