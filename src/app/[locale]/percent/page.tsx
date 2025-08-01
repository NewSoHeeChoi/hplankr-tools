'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Percent() {
  const t = useTranslations()
  const [calculationType, setCalculationType] = useState('basic')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState('')

  const calculate = () => {
    const num1 = parseFloat(value1)
    const num2 = parseFloat(value2)

    if ((!num1 && num1 !== 0) || (!num2 && num2 !== 0)) {
      setResult(t('common.enter_all_values'))
      return
    }

    let calculatedResult: number
    let resultText: string

    if (calculationType === 'basic') {
      // A의 B% 계산
      calculatedResult = (num1 * num2) / 100
      resultText = t('percent.result_format.basic')
        .replace('{value1}', num1?.toLocaleString())
        .replace('{percent}', num2.toString())
        .replace('{result}', calculatedResult?.toLocaleString())
    } else if (calculationType === 'ratio') {
      // A는 B의 몇 %인가?
      calculatedResult = (num1 / num2) * 100
      resultText = t('percent.result_format.ratio')
        .replace('{value1}', num1?.toLocaleString())
        .replace('{percent}', calculatedResult.toFixed(2))
        .replace('{value2}', num2?.toLocaleString())
    } else if (calculationType === 'change') {
      // A에서 B로 증가한 증가율
      calculatedResult = ((num2 - num1) / num1) * 100
      const direction = calculatedResult > 0 ? t('percent.result_format.increase') : t('percent.result_format.decrease')
      resultText = t('percent.result_format.change')
        .replace('{value1}', num1?.toLocaleString())
        .replace('{value2}', num2?.toLocaleString())
        .replace('{percent}', Math.abs(calculatedResult).toFixed(2))
        .replace('{direction}', direction)
    } else if (calculationType === 'discount') {
      // A에서 B% 할인
      calculatedResult = num1 - (num1 * num2) / 100
      resultText = t('percent.result_format.discount')
        .replace('{percent}', num2.toString())
        .replace('{value1}', num1?.toLocaleString())
        .replace('{result}', calculatedResult?.toLocaleString())
    } else {
      resultText = t('percent.result_format.calculation_error')
    }

    setResult(resultText)
  }

  const calculationTypes = [
    { key: 'basic', label: t('percent.types.basic.title'), desc: t('percent.types.basic.description'), icon: '📊' },
    { key: 'ratio', label: t('percent.types.ratio.title'), desc: t('percent.types.ratio.description'), icon: '📈' },
    { key: 'change', label: t('percent.types.change.title'), desc: t('percent.types.change.description'), icon: '📉' },
    { key: 'discount', label: t('percent.types.discount.title'), desc: t('percent.types.discount.description'), icon: '💰' }
  ]

  const getInputLabels = () => {
    if (calculationType === 'basic') {
      return { label1: t('percent.base_value'), label2: t('percent.percentage'), placeholder1: '100', placeholder2: '25' }
    } else if (calculationType === 'ratio') {
      return { label1: t('percent.base_value') + ' (A)', label2: t('percent.base_value') + ' (B)', placeholder1: '25', placeholder2: '100' }
    } else if (calculationType === 'change') {
      return { label1: t('percent.labels.previous_value'), label2: t('percent.labels.current_value'), placeholder1: '100', placeholder2: '125' }
    } else if (calculationType === 'discount') {
      return { label1: t('percent.base_value'), label2: t('percent.percentage'), placeholder1: '100', placeholder2: '25' }
    } else {
      return { label1: t('percent.labels.value_1'), label2: t('percent.labels.value_2'), placeholder1: '', placeholder2: '' }
    }
  }

  const labels = getInputLabels()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl text-white text-2xl mb-6 shadow-lg">
              📊
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('percent.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('percent.description')}
            </p>
          </div>

          {/* Calculation Type Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{t('percent.type_selection')}</h3>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('percent.input_title')}</h3>
                  
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('common.result')}</h3>
                  
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
                        <div>{t('percent.result_placeholder')}</div>
                      </div>
                    )}
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {t('percent.calculate')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guide */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('percent.examples_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: t('percent.types.basic.title'), example: t('percent.types.basic.example'), icon: '📊' },
                { type: t('percent.types.ratio.title'), example: t('percent.types.ratio.example'), icon: '📈' },
                { type: t('percent.types.change.title'), example: t('percent.types.change.example'), icon: '📉' },
                { type: t('percent.types.discount.title'), example: t('percent.types.discount.example'), icon: '💰' }
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
        </div>
      </div>
    </div>
  )
}