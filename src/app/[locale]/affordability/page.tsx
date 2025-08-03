'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatCurrency } from '@/lib/localization'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function Affordability() {
  const t = useTranslations('affordability')
  const locale = useLocale() as 'ko' | 'en'
  const [annualIncome, setAnnualIncome] = useState('')
  const [monthlyDebt, setMonthlyDebt] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [interestRate, setInterestRate] = useState('4.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [result, setResult] = useState<{
    error?: string
    maxHomePrice?: number
    maxLoanAmount?: number
    monthlyPayment?: number
    debtToIncome?: number
    loanToValue?: number
  } | null>(null)

  const calculate = () => {
    const income = parseFloat(annualIncome)
    const debt = parseFloat(monthlyDebt) || 0
    const down = parseFloat(downPayment) || 0
    const rate = parseFloat(interestRate) / 100 / 12 // Monthly interest rate
    const term = parseFloat(loanTerm) * 12 // Total months

    if (!income || income <= 0) {
      setResult({ error: locale === 'ko' ? '유효한 연간 소득을 입력해주세요' : 'Please enter a valid annual income' })
      return
    }

    const monthlyIncome = income / 12
    
    // DTI calculation - maximum 43% for most loans (Korean banks often use 40%)
    const maxDTI = locale === 'ko' ? 0.40 : 0.43
    const maxMonthlyHousing = (monthlyIncome * maxDTI) - debt
    
    if (maxMonthlyHousing <= 0) {
      setResult({ error: locale === 'ko' ? '현재 부채로는 주택 구매가 어렵습니다' : 'Current debt levels make home purchase difficult' })
      return
    }

    // Calculate maximum loan amount based on monthly payment capacity
    // Monthly Payment = P * [r(1+r)^n] / [(1+r)^n - 1]
    // Solving for P: P = Monthly Payment * [(1+r)^n - 1] / [r(1+r)^n]
    const maxLoanAmount = maxMonthlyHousing * ((Math.pow(1 + rate, term) - 1) / (rate * Math.pow(1 + rate, term)))
    
    // Maximum home price = loan amount + down payment
    const maxHomePrice = maxLoanAmount + down
    
    // Calculate actual DTI with housing payment
    const debtToIncome = ((debt + maxMonthlyHousing) / monthlyIncome) * 100
    
    // Calculate LTV
    const loanToValue = down > 0 ? (maxLoanAmount / maxHomePrice) * 100 : 100

    setResult({
      maxHomePrice,
      maxLoanAmount,
      monthlyPayment: maxMonthlyHousing,
      debtToIncome,
      loanToValue
    })
  }

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="🏠"
      colorScheme="emerald"
    >
      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('input_title')}</h3>
              
              {/* Annual Income */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('annual_income')}
                </label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder={locale === 'ko' ? '80000000' : '100000'}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg font-medium"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {locale === 'ko' ? '예: 8천만원 (80,000,000)' : 'e.g. $100,000'}
                </div>
              </div>

              {/* Monthly Debt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('monthly_debt')}
                </label>
                <input
                  type="number"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(e.target.value)}
                  placeholder={locale === 'ko' ? '500000' : '1500'}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg font-medium"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {locale === 'ko' ? '예: 50만원 (신용카드, 대출 등)' : 'e.g. $1,500 (credit cards, loans, etc.)'}
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('down_payment')}
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder={locale === 'ko' ? '200000000' : '50000'}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg font-medium"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {locale === 'ko' ? '예: 2억원 (200,000,000)' : 'e.g. $50,000'}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('interest_rate')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="4.5"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg font-medium"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {locale === 'ko' ? '예: 4.5% (현재 주택담보대출 금리)' : 'e.g. 4.5% (current mortgage rate)'}
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('loan_term')}
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg font-medium bg-white"
                >
                  <option value="15">15{locale === 'ko' ? '년' : ' years'}</option>
                  <option value="20">20{locale === 'ko' ? '년' : ' years'}</option>
                  <option value="25">25{locale === 'ko' ? '년' : ' years'}</option>
                  <option value="30">30{locale === 'ko' ? '년' : ' years'}</option>
                </select>
              </div>
            </div>

            {/* Result Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('result_title')}</h3>
              
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 min-h-[20rem] border border-teal-100">
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
                      <div className="text-center pb-4 border-b border-teal-200">
                        <div className="text-3xl font-bold text-teal-600 mb-2">
                          {formatCurrency(result.maxHomePrice || 0, locale)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {t('max_home_price')}
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-teal-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('max_loan_amount')}</span>
                            <span className="text-lg font-bold text-gray-700">
                              {formatCurrency(result.maxLoanAmount || 0, locale)}
                            </span>
                          </div>
                        </div>
                            
                        <div className="bg-white rounded-lg p-4 border border-teal-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('monthly_payment')}</span>
                            <span className="text-lg font-bold text-teal-600">
                              {formatCurrency(result.monthlyPayment || 0, locale)}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-teal-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('debt_to_income')}</span>
                            <span className={`text-lg font-bold ${(result.debtToIncome || 0) > (locale === 'ko' ? 40 : 43) ? 'text-red-600' : 'text-green-600'}`}>
                              {result.debtToIncome?.toFixed(1) || '0'}%
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-teal-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('loan_to_value')}</span>
                            <span className={`text-lg font-bold ${(result.loanToValue || 0) > 80 ? 'text-orange-600' : 'text-green-600'}`}>
                              {result.loanToValue?.toFixed(1) || '0'}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-4">🏠</div>
                      <div>{t('result_placeholder')}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-4 px-6 rounded-xl hover:from-teal-700 hover:to-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('calculate')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('guide_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '📊',
              key: 'dti',
              color: 'teal'
            },
            {
              icon: '💰',
              key: 'ltv',
              color: 'blue'
            },
            {
              icon: '🏦',
              key: 'emergency',
              color: 'green'
            }
          ].map((item, index) => {
            const colorClasses = {
              teal: 'bg-teal-50 border-teal-200 text-teal-600',
              blue: 'bg-blue-50 border-blue-200 text-blue-600',
              green: 'bg-green-50 border-green-200 text-green-600'
            }
            return (
              <div key={index} className={`rounded-xl p-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className={`font-semibold mb-2 ${item.color === 'teal' ? 'text-teal-700' : item.color === 'blue' ? 'text-blue-700' : 'text-green-700'}`}>
                  {t(`guide_items.${item.key}.title`)}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {t(`guide_items.${item.key}.description`)}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-teal-700">💡 {locale === 'ko' ? '주의사항' : 'Note'}:</strong> {t('note')}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}