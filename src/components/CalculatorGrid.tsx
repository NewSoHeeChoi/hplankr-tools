'use client'

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function CalculatorGrid() {
  const t = useTranslations();

  const calculators = [
    {
      href: "/bmi",
      icon: "⚖️",
      key: "bmi",
      gradient: "from-blue-600 to-blue-700",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      href: "/converter",
      icon: "📏",
      key: "converter",
      gradient: "from-emerald-600 to-emerald-700",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      href: "/percent",
      icon: "📊",
      key: "percent",
      gradient: "from-purple-600 to-purple-700",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      href: "/age",
      icon: "🎂",
      key: "age",
      gradient: "from-rose-600 to-rose-700",
      bgGradient: "from-rose-50 to-rose-100"
    },
    {
      href: "/compound",
      icon: "💰",
      key: "compound",
      gradient: "from-emerald-600 to-emerald-700",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      href: "/loan",
      icon: "💳",
      key: "loan",
      gradient: "from-indigo-600 to-indigo-700",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    {
      href: "/tip",
      icon: "🧾",
      key: "tip",
      gradient: "from-green-600 to-green-700",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      href: "/salary",
      icon: "💼",
      key: "salary",
      gradient: "from-amber-600 to-amber-700",
      bgGradient: "from-amber-50 to-amber-100"
    },
    {
      href: "/affordability",
      icon: "🏠",
      key: "affordability",
      gradient: "from-teal-600 to-teal-700",
      bgGradient: "from-teal-50 to-teal-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
      {calculators.map((tool, index) => (
        <Link key={index} href={tool.href} className="group block">
          <div className={`relative bg-gradient-to-br ${tool.bgGradient} p-8 rounded-2xl border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full`}>
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl text-white text-2xl mb-6 shadow-lg`}>
              {tool.icon}
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
              {t(`calculators.${tool.key}.title`)}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t(`calculators.${tool.key}.description`)}
            </p>
            
            {/* Arrow */}
            <div className="flex items-center mt-6 text-gray-400 group-hover:text-gray-600 transition-colors">
              <span className="text-sm font-medium">{t('common.use')}</span>
              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}