'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface HeaderProps {
  showBackButton?: boolean
}

export default function Header({ showBackButton = false }: HeaderProps) {
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
          </Link>
          <nav className="flex items-center space-x-6">
            {showBackButton && (
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                ← {t('common.back_to_home')}
              </Link>
            )}
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
  )
}