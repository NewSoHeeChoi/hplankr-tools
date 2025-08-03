'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatCurrency } from '@/lib/localization'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function Salary() {
  const t = useTranslations('salary')
  const locale = useLocale() as 'ko' | 'en'
  const [calculationType, setCalculationType] = useState('annual_to_monthly')
  const [annualSalary, setAnnualSalary] = useState('')
  const [monthlySalary, setMonthlySalary] = useState('')
  const [hourlyWage, setHourlyWage] = useState('')
  const [workHours, setWorkHours] = useState('40')
  const [workDays, setWorkDays] = useState('22')
  const [result, setResult] = useState<{
    error?: string
    grossPay?: number
    netPay?: number
    deductions?: {
      nationalPension?: number
      healthInsurance?: number
      employmentInsurance?: number
      incomeTax?: number
      localTax?: number
      federalTax?: number
      stateTax?: number
      socialSecurity?: number
      medicare?: number
      total: number
    }
    periodType?: string
  } | null>(null)

  const calculate = () => {
    const hours = parseFloat(workHours) || 40
    const days = parseFloat(workDays) || 22

    let grossAmount = 0
    let periodType = ''

    if (calculationType === 'annual_to_monthly') {
      const annual = parseFloat(annualSalary)
      if (!annual || annual <= 0) {
        setResult({ error: 'Valid annual salary required' })
        return
      }
      grossAmount = annual / 12
      periodType = 'monthly'
    } else if (calculationType === 'hourly_to_monthly') {
      const hourly = parseFloat(hourlyWage)
      if (!hourly || hourly <= 0) {
        setResult({ error: 'Valid hourly wage required' })
        return
      }
      grossAmount = hourly * hours * (52 / 12) // Weekly hours * weeks per month
      periodType = 'monthly'
    } else if (calculationType === 'monthly_to_annual') {
      const monthly = parseFloat(monthlySalary)
      if (!monthly || monthly <= 0) {
        setResult({ error: 'Valid monthly salary required' })
        return
      }
      grossAmount = monthly * 12
      periodType = 'annual'
    } else if (calculationType === 'hourly_to_annual') {
      const hourly = parseFloat(hourlyWage)
      if (!hourly || hourly <= 0) {
        setResult({ error: 'Valid hourly wage required' })
        return
      }
      grossAmount = hourly * hours * 52 // Weekly hours * 52 weeks
      periodType = 'annual'
    }

    // Calculate deductions based on locale
    let deductions
    if (locale === 'ko') {
      // Korean deductions (4대보험 + 소득세)
      const monthlyGross = periodType === 'annual' ? grossAmount / 12 : grossAmount
      const nationalPension = Math.min(monthlyGross * 0.045, 248850) // 4.5%, cap at 248,850원
      const healthInsurance = monthlyGross * 0.0354 // 3.54%
      const employmentInsurance = monthlyGross * 0.009 // 0.9%
      
      // Simplified income tax calculation (approximate)
      const taxableIncome = monthlyGross - nationalPension - healthInsurance - employmentInsurance
      const incomeTax = taxableIncome * 0.06 // Simplified 6% rate
      const localTax = incomeTax * 0.1 // 10% of income tax
      
      const totalDeductions = nationalPension + healthInsurance + employmentInsurance + incomeTax + localTax
      
      deductions = {
        nationalPension,
        healthInsurance,
        employmentInsurance,
        incomeTax,
        localTax,
        total: totalDeductions
      }
    } else {
      // US deductions (Federal + State + FICA)
      const annualGross = periodType === 'monthly' ? grossAmount * 12 : grossAmount
      const federalTax = annualGross * 0.12 // Simplified 12% federal rate
      const stateTax = annualGross * 0.05 // Simplified 5% state rate
      const socialSecurity = Math.min(annualGross * 0.062, 9932.40) // 6.2%, cap at $160,200
      const medicare = annualGross * 0.0145 // 1.45%
      
      const totalAnnualDeductions = federalTax + stateTax + socialSecurity + medicare
      const totalDeductions = periodType === 'annual' ? totalAnnualDeductions : totalAnnualDeductions / 12
      
      deductions = {
        federalTax: periodType === 'annual' ? federalTax : federalTax / 12,
        stateTax: periodType === 'annual' ? stateTax : stateTax / 12,
        socialSecurity: periodType === 'annual' ? socialSecurity : socialSecurity / 12,
        medicare: periodType === 'annual' ? medicare : medicare / 12,
        total: totalDeductions
      }
    }

    const netPay = grossAmount - deductions.total

    setResult({
      grossPay: grossAmount,
      netPay,
      deductions,
      periodType
    })
  }

  const calculationTypes = [
    { key: 'annual_to_monthly', icon: '📅' },
    { key: 'hourly_to_monthly', icon: '⏰' },
    { key: 'monthly_to_annual', icon: '💰' },
    { key: 'hourly_to_annual', icon: '🔄' }
  ]

  const getInputFields = () => {
    switch (calculationType) {
      case 'annual_to_monthly':
        return (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('annual_salary')}
            </label>
            <input
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              placeholder={locale === 'ko' ? '50000000' : '80000'}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-lg font-medium"
            />
            <div className="text-sm text-gray-500 mt-1">
              {locale === 'ko' ? '예: 5천만원 (50,000,000)' : 'e.g. $80,000'}
            </div>
          </div>
        )
      case 'hourly_to_monthly':
      case 'hourly_to_annual':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('hourly_wage')}
              </label>
              <input
                type="number"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(e.target.value)}
                placeholder={locale === 'ko' ? '15000' : '25'}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-lg font-medium"
              />
              <div className="text-sm text-gray-500 mt-1">
                {locale === 'ko' ? '예: 15,000원/시간' : 'e.g. $25/hour'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('work_hours')}
              </label>
              <input
                type="number"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                placeholder="40"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-lg font-medium"
              />
              <div className="text-sm text-gray-500 mt-1">
                {locale === 'ko' ? '주당 근무시간 (기본: 40시간)' : 'Hours per week (default: 40)'}
              </div>
            </div>
          </>
        )
      case 'monthly_to_annual':
        return (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('monthly_salary')}
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              placeholder={locale === 'ko' ? '4000000' : '6500'}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-lg font-medium"
            />
            <div className="text-sm text-gray-500 mt-1">
              {locale === 'ko' ? '예: 400만원 (4,000,000)' : 'e.g. $6,500'}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="💼"
      colorScheme="indigo"
    >
      {/* Calculation Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{t('calculation_types')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calculationTypes.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => {
                setCalculationType(key)
                setAnnualSalary('')
                setMonthlySalary('')
                setHourlyWage('')
                setResult(null)
              }}
              className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                calculationType === key
                  ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg'
                  : 'border-gray-200 hover:border-amber-300 bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{icon}</div>
                <div>
                  <div className="font-semibold text-gray-900">{t(`types.${key}.title`)}</div>
                  <div className="text-sm text-gray-600 mt-1">{t(`types.${key}.description`)}</div>
                </div>
              </div>
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
              {getInputFields()}
            </div>

            {/* Result Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('result_title')}</h3>
              
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 min-h-[20rem] border border-amber-100">
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
                      {/* Main Results */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-amber-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('gross_pay')}</span>
                            <span className="text-lg font-bold text-gray-900">
                              {formatCurrency(result.grossPay || 0, locale)}
                              {result.periodType === 'monthly' ? (locale === 'ko' ? '/월' : '/month') : (locale === 'ko' ? '/년' : '/year')}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-700">{t('net_pay')}</span>
                            <span className="text-lg font-bold text-green-600">
                              {formatCurrency(result.netPay || 0, locale)}
                              {result.periodType === 'monthly' ? (locale === 'ko' ? '/월' : '/month') : (locale === 'ko' ? '/년' : '/year')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Deductions Breakdown */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('deductions')}</h4>
                        <div className="space-y-2 text-sm">
                          {locale === 'ko' ? (
                            <>
                              <div className="flex justify-between">
                                <span>{t('national_pension')}</span>
                                <span>{formatCurrency(result.deductions?.nationalPension || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('health_insurance')}</span>
                                <span>{formatCurrency(result.deductions?.healthInsurance || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('employment_insurance')}</span>
                                <span>{formatCurrency(result.deductions?.employmentInsurance || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('income_tax')}</span>
                                <span>{formatCurrency(result.deductions?.incomeTax || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('local_tax')}</span>
                                <span>{formatCurrency(result.deductions?.localTax || 0, locale)}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between">
                                <span>{t('federal_tax')}</span>
                                <span>{formatCurrency(result.deductions?.federalTax || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('state_tax')}</span>
                                <span>{formatCurrency(result.deductions?.stateTax || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('social_security')}</span>
                                <span>{formatCurrency(result.deductions?.socialSecurity || 0, locale)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t('medicare')}</span>
                                <span>{formatCurrency(result.deductions?.medicare || 0, locale)}</span>
                              </div>
                            </>
                          )}
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>{t('total_deductions')}</span>
                            <span>{formatCurrency(result.deductions?.total || 0, locale)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-4">💼</div>
                      <div>{t('result_placeholder')}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 px-6 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
              key: locale === 'ko' ? 'accurate' : 'accurate'
            },
            {
              icon: '💰',
              key: locale === 'ko' ? 'insurance' : 'taxes'
            },
            {
              icon: '🔄',
              key: locale === 'ko' ? 'tax' : 'flexible'
            }
          ].map((item, index) => (
            <div key={index} className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-start space-x-3">
                <div className="text-xl">{item.icon}</div>
                <div>
                  <div className="font-semibold text-amber-800 mb-2">
                    {t(`guide_items.${item.key}.title`)}
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {t(`guide_items.${item.key}.description`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-amber-700">💡 {locale === 'ko' ? '주의사항' : 'Note'}:</strong> {t('note')}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}