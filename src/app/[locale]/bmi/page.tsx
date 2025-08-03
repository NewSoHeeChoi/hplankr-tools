'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { feetInchesToCm, lbsToKg } from '@/lib/localization'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function BMI() {
  const t = useTranslations('bmi')
  const tc = useTranslations('common')
  const locale = useLocale() as 'ko' | 'en'
  
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(locale === 'en' ? 'imperial' : 'metric')
  const [height, setHeight] = useState('')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState('')
  const [bmiValue, setBmiValue] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculate = () => {
    setIsCalculating(true)
    
    let heightInCm: number
    let weightInKg: number
    
    // Convert height to cm
    if (unitSystem === 'imperial') {
      const f = parseFloat(feet)
      const i = parseFloat(inches) || 0
      if (!f || f <= 0) {
        setResult(tc('validation_error'))
        setBmiValue(null)
        setIsCalculating(false)
        return
      }
      heightInCm = feetInchesToCm(f, i)
    } else {
      const h = parseFloat(height)
      if (!h || h <= 0) {
        setResult(tc('validation_error'))
        setBmiValue(null)
        setIsCalculating(false)
        return
      }
      heightInCm = h
    }
    
    // Convert weight to kg
    if (unitSystem === 'imperial') {
      const w = parseFloat(weight)
      if (!w || w <= 0) {
        setResult(tc('validation_error'))
        setBmiValue(null)
        setIsCalculating(false)
        return
      }
      weightInKg = lbsToKg(w)
    } else {
      const w = parseFloat(weight)
      if (!w || w <= 0) {
        setResult(tc('validation_error'))
        setBmiValue(null)
        setIsCalculating(false)
        return
      }
      weightInKg = w
    }
    
    const heightInM = heightInCm / 100
    const bmi = weightInKg / (heightInM * heightInM)
    setBmiValue(bmi)
    
    let status = ''
    if (bmi < 18.5) {
      status = t('underweight')
    } else if (bmi < 25) {
      status = t('normal')
    } else if (bmi < 30) {
      status = t('overweight')
    } else {
      status = t('obese')
    }
    
    setResult(`BMI ${bmi.toFixed(1)} - ${status}`)
    setIsCalculating(false)
  }

  const getBMIColor = (value: number) => {
    if (value < 18.5) return 'text-blue-600'
    if (value < 25) return 'text-green-600'
    if (value < 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="⚖️"
      colorScheme="blue"
    >

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Unit System Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('unit_system')}
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setUnitSystem('metric')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${
                        unitSystem === 'metric'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {t('metric')}
                    </button>
                    <button
                      onClick={() => setUnitSystem('imperial')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${
                        unitSystem === 'imperial'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {t('imperial')}
                    </button>
                  </div>
                </div>

                {/* Height Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {unitSystem === 'metric' ? t('height_cm') : t('height')}
                  </label>
                  {unitSystem === 'metric' ? (
                    <div className="relative">
                      <input 
                        type="number"
                        placeholder="170"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-medium"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                        cm
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <div className="flex-1 relative">
                        <input 
                          type="number"
                          placeholder="5"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-medium"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                          {t('feet')}
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <input 
                          type="number"
                          placeholder="7"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-medium"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                          {t('inches')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Weight Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {unitSystem === 'metric' ? t('weight_kg') : t('weight_lbs')}
                  </label>
                  <div className="relative">
                    <input 
                      type="number"
                      placeholder={unitSystem === 'metric' ? '70' : '154'}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-medium"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                      {unitSystem === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>
                </div>
                
                {/* Calculate Button */}
                <button 
                  onClick={calculate}
                  disabled={isCalculating}
                  className={`w-full py-4 px-6 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    isCalculating 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  {isCalculating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {tc('calculating')}
                    </span>
                  ) : (
                    t('calculate')
                  )}
                </button>
              </div>
            </div>

            {/* Result Section */}
            {result && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 sm:px-8 py-6 transition-all duration-500 ease-in-out transform opacity-100">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {bmiValue?.toFixed(1)}
                    </span>
                    <span className="text-lg text-gray-600 ml-2">BMI</span>
                  </div>
                  <div className={`text-xl font-semibold mb-4 ${bmiValue ? getBMIColor(bmiValue) : ''}`}>
                    {result.split(' - ')[1]}
                  </div>
                  
                  {/* BMI Scale */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-medium mb-2">
                      <span className="text-blue-600">{t('underweight')}</span>
                      <span className="text-green-600">{t('normal')}</span>
                      <span className="text-yellow-600">{t('overweight')}</span>
                      <span className="text-red-600">{t('obese')}</span>
                    </div>
                    <div className="relative h-3 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full">
                      {bmiValue && (
                        <div 
                          className="absolute w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 -translate-y-0"
                          style={{ left: `${Math.min(Math.max((bmiValue - 15) / 20 * 100, 0), 100)}%` }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BMI Information */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart_title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { range: t('ranges.underweight'), status: t('underweight'), color: 'text-blue-600', bgColor: 'bg-blue-50' },
                { range: t('ranges.normal'), status: t('normal'), color: 'text-green-600', bgColor: 'bg-green-50' },
                { range: t('ranges.overweight'), status: t('overweight'), color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
                { range: t('ranges.obese'), status: t('obese'), color: 'text-red-600', bgColor: 'bg-red-50' }
              ].map((item, index) => (
                <div key={index} className={`${item.bgColor} rounded-xl p-4 border border-gray-100`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 font-medium">{item.range}</div>
                      <div className={`text-lg font-bold ${item.color}`}>{item.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-blue-700">주의사항:</strong> {t('note')}
              </p>
            </div>
          </div>
    </CalculatorLayout>
  )
}