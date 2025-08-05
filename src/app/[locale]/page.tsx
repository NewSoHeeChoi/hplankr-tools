import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import StructuredData from '@/components/StructuredData';
import dynamic from 'next/dynamic';

// Dynamically import non-critical components
const CalculatorGrid = dynamic(() => import('@/components/CalculatorGrid'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-2xl h-64"></div>
});

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      icon: "⚡",
      key: "fast"
    },
    {
      icon: "📱",
      key: "responsive"
    },
    {
      icon: "🔒",
      key: "privacy"
    }
  ];

  return (
    <>
      <StructuredData
        type="WebApplication"
        name="HPLankr Tools - 무료 온라인 계산기 모음"
        description="BMI, 대출, 복리이자, 급여, 팁 계산기 등 생활 필수 도구 9개를 제공하는 무료 온라인 계산기 모음"
        url="https://tools.hplankr.com"
        applicationCategory="ProductivityApplication"
        additionalProperties={{
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: 9,
            itemListElement: [
              { '@type': 'SoftwareApplication', name: 'BMI 계산기', url: 'https://tools.hplankr.com/ko/bmi' },
              { '@type': 'SoftwareApplication', name: '대출 계산기', url: 'https://tools.hplankr.com/ko/loan' },
              { '@type': 'SoftwareApplication', name: '복리 계산기', url: 'https://tools.hplankr.com/ko/compound' },
              { '@type': 'SoftwareApplication', name: '급여 계산기', url: 'https://tools.hplankr.com/ko/salary' },
              { '@type': 'SoftwareApplication', name: '팁 계산기', url: 'https://tools.hplankr.com/ko/tip' }
            ]
          }
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                HPLankr Tools
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-8">
                <Link href="#tools" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  {t('common.tools')}
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  {t('common.about')}
                </Link>
              </div>
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {t('homepage.tagline')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                {t('homepage.title')}
              </span>
              <br />
              <span className="text-gray-700">{t('homepage.subtitle')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('homepage.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="#tools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('homepage.cta')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {t('homepage.free')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('homepage.tools_title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('homepage.tools_description')}
            </p>
          </div>

          <CalculatorGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-white">HPLankr Tools</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('common.copyright')}
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}