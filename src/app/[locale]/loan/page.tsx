'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatCurrency } from '@/lib/localization'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function LoanCalculator() {
  const t = useTranslations('loan')
  const tc = useTranslations('common')
  const locale = useLocale() as 'ko' | 'en'
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [termUnit, setTermUnit] = useState('years') // years or months
  const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null)
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
      setResult({ error: 'Validation Error' })
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

  // 각 대출 유형별 기본값 정의
  const loanTypeDefaults = {
    personal: {
      amount: locale === 'ko' ? '10000000' : '15000',
      rate: '12.5',
      term: '5',
      unit: 'years' as const
    },
    mortgage: {
      amount: locale === 'ko' ? '300000000' : '400000', 
      rate: '4.2',
      term: '25',
      unit: 'years' as const
    },
    auto: {
      amount: locale === 'ko' ? '30000000' : '35000',
      rate: '6.8', 
      term: '5',
      unit: 'years' as const
    },
    business: {
      amount: locale === 'ko' ? '50000000' : '75000',
      rate: '8.5',
      term: '7', 
      unit: 'years' as const
    }
  }

  const loanTypes = [
    { 
      key: 'personal', 
      label: t('loan_types.personal.title'), 
      desc: t('loan_types.personal.description'), 
      icon: '👤',
      rateRange: locale === 'ko' ? '8-15%' : '8-15%',
      termRange: locale === 'ko' ? '1-7년' : '1-7 years'
    },
    { 
      key: 'mortgage', 
      label: t('loan_types.mortgage.title'), 
      desc: t('loan_types.mortgage.description'), 
      icon: '🏠',
      rateRange: locale === 'ko' ? '3-5%' : '3-5%', 
      termRange: locale === 'ko' ? '10-30년' : '10-30 years'
    },
    { 
      key: 'auto', 
      label: t('loan_types.auto.title'), 
      desc: t('loan_types.auto.description'), 
      icon: '🚗',
      rateRange: locale === 'ko' ? '4-8%' : '4-8%',
      termRange: locale === 'ko' ? '3-7년' : '3-7 years'
    },
    { 
      key: 'business', 
      label: t('loan_types.business.title'), 
      desc: t('loan_types.business.description'), 
      icon: '💼',
      rateRange: locale === 'ko' ? '5-12%' : '5-12%',
      termRange: locale === 'ko' ? '1-10년' : '1-10 years'
    }
  ]

  // 대출 유형 선택 핸들러
  const handleLoanTypeSelect = (loanType: string) => {
    setSelectedLoanType(loanType)
    const defaults = loanTypeDefaults[loanType as keyof typeof loanTypeDefaults]
    if (defaults) {
      setLoanAmount(defaults.amount)
      setInterestRate(defaults.rate)
      setLoanTerm(defaults.term)
      setTermUnit(defaults.unit)
      setResult(null) // 결과 초기화
    }
  }

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="💳"
      colorScheme="indigo"
    >
      <div className="max-w-4xl mx-auto">

          {/* Loan Type Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{t('loan_types_title')}</h3>
            <p className="text-sm text-gray-600 text-center mb-6">{locale === 'ko' ? '대출 유형을 선택하면 해당 유형에 맞는 기본값이 자동으로 설정됩니다' : 'Default values for the loan type will be automatically set when you select a loan type'}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loanTypes.map(({ key, label, desc, icon, rateRange, termRange }) => (
                <button
                  key={key}
                  onClick={() => handleLoanTypeSelect(key)}
                  className={`bg-white rounded-xl p-4 border-2 transition-all duration-200 text-left hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedLoanType === key
                      ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg'
                      : 'border-gray-100 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-2xl mb-2 text-center">{icon}</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 mb-1">{label}</div>
                    <div className="text-sm text-gray-600 mb-2">{desc}</div>
                    <div className="text-xs text-indigo-600 font-medium">
                      <div>{locale === 'ko' ? '이자율' : 'Rate'}: {rateRange}</div>
                      <div>{locale === 'ko' ? '기간' : 'Term'}: {termRange}</div>
                    </div>
                  </div>
                  {selectedLoanType === key && (
                    <div className="mt-2 text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {locale === 'ko' ? '선택됨' : 'Selected'}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('input_title')}</h3>
                  
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('loan_amount')}
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder={locale === 'ko' ? '50000000' : '500000'}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {tc('example')}: {tc('example_loan_amount')}
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('annual_rate')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="4.5"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">{locale === 'ko' ? '예: 4.5%' : 'e.g. 4.5%'}</div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('loan_term')}
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
                        <option value="years">{t('years')}</option>
                        <option value="months">{t('months')}</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{locale === 'ko' ? `예: 20${t('years')} 또는 240${t('months')}` : `e.g. 20${t('years')} or 240${t('months')}`}</div>
                  </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('result_title')}</h3>
                  
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
                              {t('monthly_payment')}
                            </div>
                          </div>

                          {/* Breakdown */}
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('loan_principal')}</span>
                                <span className="text-lg font-bold text-gray-700">
                                  {formatCurrency(result.loanDetails?.principal || 0, locale)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('total_payment')}</span>
                                <span className="text-lg font-bold text-orange-600">
                                  {formatCurrency(Math.round(result.totalAmount || 0), locale)}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">{t('total_interest')}</span>
                                <span className="text-lg font-bold text-red-600">
                                  {formatCurrency(Math.round(result.totalInterest || 0), locale)}
                                </span>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-indigo-700">{t('loan_period')}</span>
                                <span className="text-lg font-bold text-indigo-600">
                                  {result.loanDetails?.termMonths}{t('months')}
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
                          <div>{t('result_placeholder')}</div>
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
                    <span>{t('calculate')}</span>
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
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('guide_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📊',
                  title: t('guide_items.accurate.title'),
                  description: t('guide_items.accurate.description'),
                  color: 'indigo'
                },
                {
                  icon: '💰',
                  title: t('guide_items.save.title'),
                  description: t('guide_items.save.description'),
                  color: 'green'
                },
                {
                  icon: '⏰',
                  title: t('guide_items.plan.title'),
                  description: t('guide_items.plan.description'),
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
                <strong className="text-yellow-700">💡 {locale === 'ko' ? '중요사항' : 'Important'}:</strong> 
                {t('note')}
              </p>
            </div>
          </div>
      </div>
    </CalculatorLayout>
  )
}