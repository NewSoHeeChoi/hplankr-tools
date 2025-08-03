'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { formatCurrency } from '@/lib/localization'
import CalculatorLayout from '@/components/shared/CalculatorLayout'
import CalculatorCard from '@/components/shared/CalculatorCard'
import CalculatorButton from '@/components/shared/CalculatorButton'

export default function TipCalculator() {
  const t = useTranslations('tip')
  const tc = useTranslations('common')
  const locale = useLocale() as 'ko' | 'en'
  
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState('15')
  const [numberOfPeople, setNumberOfPeople] = useState('1')
  const [result, setResult] = useState<{
    tipAmount: number
    totalAmount: number
    perPersonAmount: number
    perPersonTip: number
  } | null>(null)

  const commonTipPercentages = [10, 15, 18, 20, 25]

  const calculate = () => {
    const bill = parseFloat(billAmount)
    const tip = parseFloat(tipPercentage)
    const people = parseInt(numberOfPeople)

    if (!bill || !tip || !people || bill <= 0 || tip < 0 || people <= 0) {
      setResult(null)
      return
    }

    const tipAmount = (bill * tip) / 100
    const totalAmount = bill + tipAmount
    const perPersonAmount = totalAmount / people
    const perPersonTip = tipAmount / people

    setResult({
      tipAmount,
      totalAmount,
      perPersonAmount,
      perPersonTip
    })
  }

  const handleTipPercentageClick = (percentage: number) => {
    setTipPercentage(percentage.toString())
  }

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="🧾"
      colorScheme="emerald"
    >
      {/* Calculator Card */}
      <CalculatorCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('input_title')}</h3>
            
            {/* Bill Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('bill_amount')}
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder={locale === 'ko' ? '50000' : '100'}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
              />
              <div className="text-sm text-gray-500 mt-1">
                {tc('example')}: {tc('example_amount')}
              </div>
            </div>

            {/* Tip Percentage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('tip_percentage')}
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {commonTipPercentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipPercentageClick(percentage)}
                    className={`py-2 px-3 rounded-lg border-2 transition-all font-medium ${
                      tipPercentage === percentage.toString()
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {percentage}%
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(e.target.value)}
                placeholder="15"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
              />
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('number_of_people')}
              </label>
              <input
                type="number"
                min="1"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
              />
              <div className="text-sm text-gray-500 mt-1">
                {t('split_bill_info')}
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{tc('result')}</h3>
            
            <div className="bg-gray-50 rounded-xl p-6 min-h-[20rem]">
              {result ? (
                <div className="space-y-6">
                  {/* Main Results */}
                  <div className="text-center pb-4 border-b border-gray-200">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {formatCurrency(Math.round(result.totalAmount), locale)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('total_amount')}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{t('tip_amount')}</span>
                        <span className="text-lg font-bold text-emerald-600">
                          {formatCurrency(Math.round(result.tipAmount), locale)}
                        </span>
                      </div>
                    </div>
                    
                    {parseInt(numberOfPeople) > 1 && (
                      <>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('per_person_total')}</span>
                            <span className="text-lg font-bold text-gray-700">
                              {formatCurrency(Math.round(result.perPersonAmount), locale)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{t('per_person_tip')}</span>
                            <span className="text-lg font-bold text-emerald-600">
                              {formatCurrency(Math.round(result.perPersonTip), locale)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-4">🧾</div>
                    <div>{t('result_placeholder')}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <CalculatorButton
            onClick={calculate}
            colorScheme="emerald"
          >
            <span className="flex items-center space-x-2">
              <span>{t('calculate')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
          </CalculatorButton>
        </div>
      </CalculatorCard>

      {/* Information Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('guide_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '💰',
              title: t('guide_items.fair.title'),
              description: t('guide_items.fair.description'),
              color: 'emerald'
            },
            {
              icon: '👥',
              title: t('guide_items.split.title'),
              description: t('guide_items.split.description'),
              color: 'blue'
            },
            {
              icon: '⭐',
              title: t('guide_items.service.title'),
              description: t('guide_items.service.description'),
              color: 'yellow'
            }
          ].map((item, index) => {
            const colorClasses = {
              emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
              blue: 'bg-blue-50 border-blue-200 text-blue-600',
              yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600'
            }
            return (
              <div key={index} className={`rounded-xl p-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className={`font-semibold mb-2 ${item.color === 'emerald' ? 'text-emerald-700' : item.color === 'blue' ? 'text-blue-700' : 'text-yellow-700'}`}>
                  {item.title}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-emerald-700">💡 {tc('tip')}:</strong> 
            {t('tip')}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}