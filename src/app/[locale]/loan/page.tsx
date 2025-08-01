'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { formatCurrency } from '@/lib/localization'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function LoanCalculator() {
  const t = useTranslations()
  const locale = useLocale() as 'ko' | 'en'
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [termUnit, setTermUnit] = useState('years') // years or months
  const [result, setResult] = useState<{
    error?: string;
    monthlyPayment?: number;
    totalAmount?: number;
    totalInterest?: number;
    loanDetails?: {
      principal: number;
      rate: number;
      termMonths: number;
    };
  } | null>(null)

  const calculate = () => {
    const principal = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate) / 100
    const termValue = parseFloat(loanTerm)

    if (!principal || !annualRate || !termValue || principal <= 0 || annualRate < 0 || termValue <= 0) {
      setResult({ error: t('common.validation_error') })
      return
    }

    // Convert term to months
    const termInMonths = termUnit === 'years' ? termValue * 12 : termValue
    const monthlyRate = annualRate / 12

    // Monthly payment formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
    let monthlyPayment: number
    
    if (monthlyRate === 0) {
      // If no interest, simple division
      monthlyPayment = principal / termInMonths
    } else {
      const factor = Math.pow(1 + monthlyRate, termInMonths)
      monthlyPayment = principal * (monthlyRate * factor) / (factor - 1)
    }

    const totalAmount = monthlyPayment * termInMonths
    const totalInterest = totalAmount - principal

    setResult({
      monthlyPayment,
      totalAmount,
      totalInterest,
      loanDetails: {
        principal,
        rate: annualRate,
        termMonths: termInMonths
      }
    })
  }

  const loanTypes = [
    { key: 'personal', label: t('loan.loan_types.personal.title'), desc: t('loan.loan_types.personal.description'), icon: '👤' },
    { key: 'mortgage', label: t('loan.loan_types.mortgage.title'), desc: t('loan.loan_types.mortgage.description'), icon: '🏠' },
    { key: 'auto', label: t('loan.loan_types.auto.title'), desc: t('loan.loan_types.auto.description'), icon: '🚗' },
    { key: 'business', label: t('loan.loan_types.business.title'), desc: t('loan.loan_types.business.description'), icon: '💼' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl text-white text-2xl mb-6 shadow-lg">
              💳
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('loan.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('loan.description')}
            </p>
          </div>

          {/* Loan Type Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{t('loan.loan_types_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loanTypes.map(({ key, label, desc, icon }) => (
                <div key={key} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2 text-center">{icon}</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 mb-1">{label}</div>
                    <div className="text-sm text-gray-600">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('loan.input_title')}</h3>
                  
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('loan.loan_amount')} ({t('common.currency')})
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder={locale === 'ko' ? '50000000' : '500000'}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {t('common.example')}: {locale === 'ko' ? '5천만원 (50,000,000)' : '$500,000'}
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('loan.annual_rate')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="4.5"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">{t('common.example')}: 4.5% ({t('common.bank_average_rate')})</div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('loan.loan_term')}
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="20"
                        className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg font-medium"
                      />
                      <select
                        value={termUnit}
                        onChange={(e) => setTermUnit(e.target.value)}
                        className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg font-medium bg-white min-w-[100px]"
                      >
                        <option value="years">{t('loan.years')}</option>
                        <option value="months">{t('loan.months')}</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{t('common.example')}: 20{t('loan.years')} {t('common.or')} 240{t('loan.months')}</div>
                  </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('loan.result_title')}</h3>
                  
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
                            <div className="text-3xl font-bold text-indigo-600 mb-2">
                              {formatCurrency(Math.round(result.monthlyPayment || 0), locale)} / {locale === 'ko' ? '월' : 'month'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {t('loan.monthly_payment')}
                            </div>
                          </div>

                          {/* Breakdown */}
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('loan.loan_principal')}</span>
                                <span className="text-lg font-bold text-gray-700">
                                  {formatCurrency(result.loanDetails?.principal || 0, locale)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('loan.total_payment')}</span>
                                <span className="text-lg font-bold text-orange-600">
                                  {formatCurrency(Math.round(result.totalAmount || 0), locale)}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('loan.total_interest')}</span>
                                <span className="text-lg font-bold text-red-600">
                                  {formatCurrency(Math.round(result.totalInterest || 0), locale)}
                                </span>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-indigo-700">{t('loan.loan_period')}</span>
                                <span className="text-lg font-bold text-indigo-600">
                                  {result.loanDetails?.termMonths}{t('loan.months')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <div className="text-4xl mb-4">💳</div>
                          <div>{t('loan.result_placeholder')}</div>
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
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg transform hover:-translate-y-0.5 shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <span>{t('loan.calculate')}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('loan.guide_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📊',
                  title: t('loan.guide_items.accurate.title'),
                  description: t('loan.guide_items.accurate.description'),
                  color: 'indigo'
                },
                {
                  icon: '💰',
                  title: t('loan.guide_items.save.title'),
                  description: t('loan.guide_items.save.description'),
                  color: 'green'
                },
                {
                  icon: '⏰',
                  title: t('loan.guide_items.plan.title'),
                  description: t('loan.guide_items.plan.description'),
                  color: 'blue'
                }
              ].map((item, index) => {
                const colorClasses = {
                  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
                  green: 'bg-green-50 border-green-200 text-green-600',
                  blue: 'bg-blue-50 border-blue-200 text-blue-600'
                }
                return (
                  <div key={index} className={`rounded-xl p-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className={`font-semibold mb-2 ${item.color === 'indigo' ? 'text-indigo-700' : item.color === 'green' ? 'text-green-700' : 'text-blue-700'}`}>
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
                <strong className="text-yellow-700">💡 {t('common.important_notice')}:</strong> 
                {t('loan.note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}