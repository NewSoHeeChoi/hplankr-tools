'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function Percent() {
  const t = useTranslations('percent')
  const tc = useTranslations('common')
  const locale = useLocale() as 'ko' | 'en'
  const [calculationType, setCalculationType] = useState('basic')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState('')

  const calculate = () => {
    const num1 = parseFloat(value1)
    const num2 = parseFloat(value2)

    if ((!num1 && num1 !== 0) || (!num2 && num2 !== 0)) {
      setResult(tc('validation_error'))
      return
    }

    let calculatedResult: number
    let resultText: string

    if (calculationType === 'basic') {
      // A의 B% 계산  
      calculatedResult = (num1 * num2) / 100
      resultText = locale === 'ko' 
        ? `${num1}의 ${num2}% = ${calculatedResult}`
        : `${num1} × ${num2}% = ${calculatedResult}`
    } else if (calculationType === 'ratio') {
      // A는 B의 몇 %인가?
      calculatedResult = (num1 / num2) * 100
      resultText = locale === 'ko'
        ? `${num1}는 ${num2}의 ${calculatedResult.toFixed(2)}%`
        : `${num1} is ${calculatedResult.toFixed(2)}% of ${num2}`
    } else if (calculationType === 'change') {
      // A에서 B로 증가한 증가율
      calculatedResult = ((num2 - num1) / num1) * 100
      const direction = calculatedResult > 0 
        ? (locale === 'ko' ? '증가' : 'increase')
        : (locale === 'ko' ? '감소' : 'decrease')
      resultText = locale === 'ko'
        ? `${num1}→${num2}는 ${Math.abs(calculatedResult).toFixed(2)}% ${direction}`
        : `${num1}→${num2} is ${Math.abs(calculatedResult).toFixed(2)}% ${direction}`
    } else if (calculationType === 'discount') {
      // A에서 B% 할인
      calculatedResult = num1 - (num1 * num2) / 100
      resultText = locale === 'ko'
        ? `${num1}에서 ${num2}% 할인 = ${calculatedResult}`
        : `${num2}% off ${num1} = ${calculatedResult}`
    } else {
      resultText = locale === 'ko' ? '계산 오류' : 'Calculation error'
    }

    setResult(resultText)
  }

  const calculationTypes = [
    { key: 'basic', label: t('types.basic.title'), desc: t('types.basic.description'), icon: '📊' },
    { key: 'ratio', label: t('types.ratio.title'), desc: t('types.ratio.description'), icon: '📈' },
    { key: 'change', label: t('types.change.title'), desc: t('types.change.description'), icon: '📉' },
    { key: 'discount', label: t('types.discount.title'), desc: t('types.discount.description'), icon: '💰' }
  ]

  const getInputLabels = () => {
    if (calculationType === 'basic') {
      return { label1: t('base_value'), label2: t('percentage'), placeholder1: '100', placeholder2: '25' }
    } else if (calculationType === 'ratio') {
      return { label1: t('base_value') + ' (A)', label2: t('base_value') + ' (B)', placeholder1: '25', placeholder2: '100' }
    } else if (calculationType === 'change') {
      return { label1: t('labels.previous_value'), label2: t('labels.current_value'), placeholder1: '100', placeholder2: '125' }
    } else if (calculationType === 'discount') {
      return { label1: t('base_value'), label2: t('percentage'), placeholder1: '100', placeholder2: '25' }
    } else {
      return { label1: t('labels.value_1'), label2: t('labels.value_2'), placeholder1: '', placeholder2: '' }
    }
  }

  const labels = getInputLabels()

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="📊"
      colorScheme="purple"
    >

          {/* Calculation Type Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{t('type_selection')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculationTypes.map(({ key, label, desc, icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setCalculationType(key)
                    setValue1('')
                    setValue2('')
                    setResult('')
                  }}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    calculationType === key
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{label}</div>
                      <div className="text-sm text-gray-600 mt-1">{desc}</div>
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
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {labels.label1}
                    </label>
                    <input
                      type="number"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder={labels.placeholder1}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {labels.label2}
                    </label>
                    <input
                      type="number"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      placeholder={labels.placeholder2}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-lg font-medium"
                    />
                  </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{tc('result')}</h3>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 min-h-[8rem] flex items-center justify-center border border-purple-100">
                    {result ? (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {result}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <div>{t('result_placeholder')}</div>
                      </div>
                    )}
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {t('calculate')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guide */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('examples_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: t('types.basic.title'), example: t('types.basic.example'), icon: '📊' },
                { type: t('types.ratio.title'), example: t('types.ratio.example'), icon: '📈' },
                { type: t('types.change.title'), example: t('types.change.example'), icon: '📉' },
                { type: t('types.discount.title'), example: t('types.discount.example'), icon: '💰' }
              ].map((item, index) => (
                <div key={index} className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-purple-800">{item.type}</div>
                      <div className="text-sm text-gray-700 mt-1">{item.example}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </CalculatorLayout>
  )
}