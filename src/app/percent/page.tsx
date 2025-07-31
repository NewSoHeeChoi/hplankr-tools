'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Percent() {
  const [calculationType, setCalculationType] = useState('percentage')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState('')

  const calculate = () => {
    const num1 = parseFloat(value1)
    const num2 = parseFloat(value2)

    if ((!num1 && num1 !== 0) || (!num2 && num2 !== 0)) {
      setResult('모든 값을 입력해주세요')
      return
    }

    let calculatedResult: number
    let resultText: string

    if (calculationType === 'percentage') {
      // A의 B% 계산
      calculatedResult = (num1 * num2) / 100
      resultText = `${num1}의 ${num2}% = ${calculatedResult}`
    } else if (calculationType === 'ratio') {
      // A는 B의 몇 %인가?
      calculatedResult = (num1 / num2) * 100
      resultText = `${num1}은 ${num2}의 ${calculatedResult.toFixed(2)}%입니다`
    } else if (calculationType === 'increase') {
      // A에서 B로 증가한 증가율
      calculatedResult = ((num2 - num1) / num1) * 100
      resultText = `${num1}에서 ${num2}로 ${calculatedResult > 0 ? '증가' : '감소'}율: ${Math.abs(calculatedResult).toFixed(2)}%`
    } else if (calculationType === 'discount') {
      // A에서 B% 할인
      calculatedResult = num1 - (num1 * num2) / 100
      resultText = `${num1}에서 ${num2}% 할인 = ${calculatedResult}`
    } else {
      resultText = '계산 오류'
    }

    setResult(resultText)
  }

  const calculationTypes = [
    { key: 'percentage', label: 'A의 B% 계산', desc: '100의 25% = 25', icon: '📊' },
    { key: 'ratio', label: 'A는 B의 몇%?', desc: '25는 100의 25%', icon: '📈' },
    { key: 'increase', label: '증가/감소율', desc: '100→125는 25% 증가', icon: '📉' },
    { key: 'discount', label: '할인 계산', desc: '100에서 25% 할인 = 75', icon: '💰' }
  ]

  const getInputLabels = () => {
    if (calculationType === 'percentage') {
      return { label1: '기준값 (A)', label2: '퍼센트 (B%)', placeholder1: '100', placeholder2: '25' }
    } else if (calculationType === 'ratio') {
      return { label1: '비교값 (A)', label2: '기준값 (B)', placeholder1: '25', placeholder2: '100' }
    } else if (calculationType === 'increase') {
      return { label1: '이전값 (A)', label2: '현재값 (B)', placeholder1: '100', placeholder2: '125' }
    } else if (calculationType === 'discount') {
      return { label1: '원가 (A)', label2: '할인율 (B%)', placeholder1: '100', placeholder2: '25' }
    } else {
      return { label1: '값 1', label2: '값 2', placeholder1: '', placeholder2: '' }
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
                ← 홈으로
              </Link>
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
              퍼센트 계산기
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              다양한 퍼센트 계산을 빠르고 정확하게 수행하세요
            </p>
          </div>

          {/* Calculation Type Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">계산 유형 선택</h3>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">입력 값</h3>
                  
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">계산 결과</h3>
                  
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
                        <div>계산 결과가 여기에 표시됩니다</div>
                      </div>
                    )}
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    계산하기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guide */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">계산 예시</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: 'A의 B% 계산', example: '1000원의 15% → 150원', icon: '📊' },
                { type: 'A는 B의 몇%', example: '150원은 1000원의 15%', icon: '📈' },
                { type: '증가/감소율', example: '1000원→1150원은 15% 증가', icon: '📉' },
                { type: '할인 계산', example: '1000원에서 15% 할인 → 850원', icon: '💰' }
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