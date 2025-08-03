'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function Converter() {
  const t = useTranslations('converter')
  
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('cm')
  const [toUnit, setToUnit] = useState('inch')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')

  const unitData = {
    length: {
      cm: { name: 'cm', rate: 1 },
      m: { name: 'm', rate: 0.01 },
      inch: { name: 'inch', rate: 0.393701 },
      ft: { name: 'ft', rate: 0.0328084 }
    },
    weight: {
      kg: { name: 'kg', rate: 1 },
      g: { name: 'g', rate: 1000 },
      lb: { name: 'lb', rate: 2.20462 },
      oz: { name: 'oz', rate: 35.274 }
    },
    temperature: {
      celsius: { name: '°C' },
      fahrenheit: { name: '°F' },
      kelvin: { name: 'K' }
    }
  }

  const categories = [
    { key: 'length', label: t('categories.length'), icon: '📏', color: 'emerald' },
    { key: 'weight', label: t('categories.weight'), icon: '⚖️', color: 'blue' },
    { key: 'temperature', label: t('categories.temperature'), icon: '🌡️', color: 'red' }
  ]

  const convert = () => {
    const value = parseFloat(inputValue)
    if (!value && value !== 0) {
      setResult(t('common.enter_number'))
      return
    }

    let convertedValue: number
    let fromName = ''
    let toName = ''

    if (category === 'temperature') {
      // 온도 변환
      let celsius = value
      if (fromUnit === 'fahrenheit') celsius = (value - 32) * 5/9
      if (fromUnit === 'kelvin') celsius = value - 273.15
      
      if (toUnit === 'fahrenheit') convertedValue = celsius * 9/5 + 32
      else if (toUnit === 'kelvin') convertedValue = celsius + 273.15
      else convertedValue = celsius

      fromName = unitData.temperature[fromUnit as 'celsius' | 'fahrenheit' | 'kelvin'].name
      toName = unitData.temperature[toUnit as 'celsius' | 'fahrenheit' | 'kelvin'].name
    } else if (category === 'length') {
      // 길이 변환
      const lengthUnits = unitData.length
      const fromRate = lengthUnits[fromUnit as keyof typeof lengthUnits].rate
      const toRate = lengthUnits[toUnit as keyof typeof lengthUnits].rate
      
      convertedValue = (value / fromRate) * toRate
      fromName = lengthUnits[fromUnit as keyof typeof lengthUnits].name
      toName = lengthUnits[toUnit as keyof typeof lengthUnits].name
    } else if (category === 'weight') {
      // 무게 변환
      const weightUnits = unitData.weight
      const fromRate = weightUnits[fromUnit as keyof typeof weightUnits].rate
      const toRate = weightUnits[toUnit as keyof typeof weightUnits].rate
      
      convertedValue = (value / fromRate) * toRate
      fromName = weightUnits[fromUnit as keyof typeof weightUnits].name
      toName = weightUnits[toUnit as keyof typeof weightUnits].name
    } else {
      convertedValue = 0
      fromName = ''
      toName = ''
    }
    
    setResult(`${value.toLocaleString()} ${fromName} = ${convertedValue.toLocaleString()} ${toName}`)
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    const units = Object.keys(unitData[newCategory as keyof typeof unitData])
    setFromUnit(units[0])
    setToUnit(units[1])
    setResult('')
    setInputValue('')
  }

  const getCurrentUnits = () => {
    return unitData[category as keyof typeof unitData]
  }

  const getColorClasses = (colorName: string) => {
    const colors = {
      emerald: {
        bg: 'from-emerald-600 to-emerald-700',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        focus: 'focus:ring-emerald-500'
      },
      blue: {
        bg: 'from-blue-600 to-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-200',
        focus: 'focus:ring-blue-500'
      },
      red: {
        bg: 'from-red-600 to-red-700',
        text: 'text-red-600',
        border: 'border-red-200',
        focus: 'focus:ring-red-500'
      }
    }
    return colors[colorName as keyof typeof colors] || colors.blue
  }

  const currentColors = getColorClasses(categories.find(cat => cat.key === category)?.color || 'blue')

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="📏"
      colorScheme="emerald"
    >

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              {categories.map((cat) => {
                const isActive = category === cat.key
                const catColors = getColorClasses(cat.color)
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-r ${catColors.bg} text-white shadow-lg transform scale-105`
                        : 'bg-white text-gray-600 hover:text-gray-900 hover:shadow-md border border-gray-200'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Converter Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('input_title')}</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('input_label')}
                    </label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t('input_label')}
                      className={`w-full px-4 py-4 border-2 border-gray-200 rounded-xl ${currentColors.focus} focus:border-transparent transition-colors text-lg font-medium`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('from_unit')}
                    </label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className={`w-full px-4 py-4 border-2 border-gray-200 rounded-xl ${currentColors.focus} focus:border-transparent transition-colors text-lg font-medium bg-white`}
                    >
                      {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                        <option key={key} value={key}>{unit.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('output_title')}</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t('to_unit')}
                    </label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className={`w-full px-4 py-4 border-2 border-gray-200 rounded-xl ${currentColors.focus} focus:border-transparent transition-colors text-lg font-medium bg-white`}
                    >
                      {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                        <option key={key} value={key}>{unit.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Result Display */}
                  <div className="bg-gray-50 rounded-xl p-4 min-h-[4rem] flex items-center justify-center">
                    {result ? (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {result}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        {t('result_placeholder')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Convert Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={convert}
                  className={`bg-gradient-to-r ${currentColors.bg} text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg transform hover:-translate-y-0.5 shadow-lg`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{t('calculate')}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Conversions */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('common_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { from: t('common_examples.meter'), to: t('common_examples.cm'), category: 'length' },
                { from: t('common_examples.kg'), to: t('common_examples.pound'), category: 'weight' },
                { from: t('common_examples.celsius'), to: t('common_examples.fahrenheit'), category: 'temperature' },
                { from: t('common_examples.inch'), to: t('common_examples.cm_from_inch'), category: 'length' },
                { from: t('common_examples.pound_to_gram'), to: t('common_examples.gram'), category: 'weight' },
                { from: t('common_examples.celsius_hot'), to: t('common_examples.fahrenheit_hot'), category: 'temperature' }
              ].map((conversion, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 font-medium">{conversion.from}</div>
                  <div className="text-gray-400 my-1">↓</div>
                  <div className="text-sm font-semibold text-gray-900">{conversion.to}</div>
                </div>
              ))}
            </div>
          </div>
    </CalculatorLayout>
  )
}