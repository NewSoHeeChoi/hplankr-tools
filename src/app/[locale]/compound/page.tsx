'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { formatCurrency, getExampleValues } from '@/lib/localization'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function CompoundInterest() {
  const t = useTranslations()
  const locale = useLocale() as 'ko' | 'en'
  const examples = getExampleValues(locale)
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [compound, setCompound] = useState('12') // monthly by default
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [result, setResult] = useState<{
    error?: string;
    totalAmount?: number;
    totalPrincipal?: number;
    totalInterest?: number;
    simpleInterest?: number;
    compoundAdvantage?: number;
    interestRate?: number;
  } | null>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const years = parseFloat(time)
    const n = parseFloat(compound)
    const PMT = parseFloat(monthlyContribution) || 0

    if (!P || !r || !years || P <= 0 || r <= 0 || years <= 0) {
      setResult({ error: t('common.validation_error') })
      return
    }

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const compoundInterest = P * Math.pow((1 + r/n), (n * years))
    
    // Future Value of Annuity (monthly contributions): PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const annuityValue = PMT > 0 ? PMT * (Math.pow(1 + r/n, n * years) - 1) / (r/n) : 0
    
    const totalAmount = compoundInterest + annuityValue
    const totalPrincipal = P + (PMT * 12 * years)
    const totalInterest = totalAmount - totalPrincipal

    // Simple Interest for comparison
    const simpleInterest = P * (1 + r * years) + (PMT * 12 * years * (1 + r * years / 2))
    const compoundAdvantage = totalAmount - simpleInterest

    setResult({
      totalAmount,
      totalPrincipal,
      totalInterest,
      simpleInterest,
      compoundAdvantage,
      interestRate: (totalInterest / totalPrincipal) * 100
    })
  }

  const compoundingOptions = [
    { value: '1', label: `${t('compound.frequencies.annually')} (Annually)`, frequency: 'annual' },
    { value: '4', label: `${t('compound.frequencies.quarterly')} (Quarterly)`, frequency: 'quarterly' },
    { value: '12', label: `${t('compound.frequencies.monthly')} (Monthly)`, frequency: 'monthly' },
    { value: '365', label: `${t('compound.frequencies.daily')} (Daily)`, frequency: 'daily' }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
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
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                ← {t('common.back_to_home')}
              </Link>
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl text-white text-2xl mb-6 shadow-lg">
              💰
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('compound.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('compound.description')}
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('compound.input_title')}</h3>
                  
                  {/* Principal Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('compound.initial_amount')}
                    </label>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder={examples.currency}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">{t('common.example')}: {t('common.currency_symbol')}{examples.currency}</div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('compound.annual_rate')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="7.5"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">{t('common.example')}: 7.5% ({t('common.stock_market_average')})</div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('compound.investment_period')}
                    </label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="10"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">{t('common.example')}: 10{t('common.years')} {t('common.long_term_investment')}</div>
                  </div>

                  {/* Compounding Frequency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('compound.compound_frequency')}
                    </label>
                    <select
                      value={compound}
                      onChange={(e) => setCompound(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium bg-white"
                    >
                      {compoundingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly Contribution */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('compound.monthly_contribution')}
                    </label>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder={examples.currencySmall}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">{t('common.monthly_regular_investment')}</div>
                  </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('compound.result_title')}</h3>
                  
                  {/* Result Display */}
                  <div className="bg-gray-50 rounded-xl p-6 min-h-[20rem]">
                    {result ? (
                      result.error ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-red-600">
                            <div className="text-4xl mb-4">⚠️</div>
                            <div className="font-medium">{result.error}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Main Result */}
                          <div className="text-center pb-4 border-b border-gray-200">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">
                              {formatCurrency(result.totalAmount || 0, locale)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {t('compound.final_amount')}
                            </div>
                          </div>

                          {/* Breakdown */}
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('compound.total_principal')}</span>
                                <span className="text-lg font-bold text-gray-700">
                                  {formatCurrency(result.totalPrincipal || 0, locale)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('compound.compound_interest')}</span>
                                <span className="text-lg font-bold text-emerald-600">
                                  {formatCurrency(result.totalInterest || 0, locale)}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('compound.return_rate')}</span>
                                <span className="text-lg font-bold text-emerald-600">
                                  {result.interestRate?.toFixed(1) || '0'}%
                                </span>
                              </div>
                            </div>

                            {(result.compoundAdvantage || 0) > 0 && (
                              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-emerald-700">{t('compound.compound_advantage')}</span>
                                  <span className="text-lg font-bold text-emerald-600">
                                    +{formatCurrency(result.compoundAdvantage || 0, locale)}
                                  </span>
                                </div>
                                <div className="text-xs text-emerald-600 mt-1">
                                  {t('compound.simple_vs_compound')}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <div className="text-4xl mb-4">💰</div>
                          <div>{t('compound.result_placeholder')}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={calculate}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg transform hover:-translate-y-0.5 shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <span>{t('compound.calculate')}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-4 4" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('compound.power_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⏰',
                  title: t('compound.power_items.time.title'),
                  description: t('compound.power_items.time.description'),
                  color: 'emerald'
                },
                {
                  icon: '📈',
                  title: t('compound.power_items.reinvestment.title'),
                  description: t('compound.power_items.reinvestment.description'),
                  color: 'blue'
                },
                {
                  icon: '🎯',
                  title: t('compound.power_items.goal.title'),
                  description: t('compound.power_items.goal.description'),
                  color: 'green'
                }
              ].map((item, index) => {
                const colorClasses = {
                  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
                  blue: 'bg-blue-50 border-blue-200 text-blue-600',
                  green: 'bg-green-50 border-green-200 text-green-600'
                }
                return (
                  <div key={index} className={`rounded-xl p-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className={`font-semibold mb-2 ${item.color === 'emerald' ? 'text-emerald-700' : item.color === 'blue' ? 'text-blue-700' : 'text-green-700'}`}>
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-yellow-700">💡 {t('common.investment_tip')}:</strong> 
                {t('compound.tip')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}