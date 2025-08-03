import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface HeaderProps {
  showBackButton?: boolean
  showNavLinks?: boolean
  title?: string
  pageIcon?: string
}

export default function Header({ 
  showBackButton = false, 
  showNavLinks = true,
  title,
  pageIcon
}: HeaderProps) {
  const t = useTranslations()

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              HPLankr Tools
            </span>
            {title && (
              <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-gray-300">
                {pageIcon && <span className="text-lg mr-2">{pageIcon}</span>}
                <span className="text-lg font-semibold text-gray-700">{title}</span>
              </div>
            )}
          </Link>
          <nav className="flex items-center space-x-6">
            {showBackButton && (
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('common.back_to_home')}
              </Link>
            )}
            {showNavLinks && (
              <div className="hidden md:flex space-x-8">
                <Link href="#tools" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  {t('common.tools')}
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  {t('common.about')}
                </Link>
              </div>
            )}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  )
}