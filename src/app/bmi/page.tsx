'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BMI() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState('')
  const [bmiValue, setBmiValue] = useState<number | null>(null)

  const calculate = () => {
    const h = parseFloat(height) / 100 // cm to m
    const w = parseFloat(weight)
    
    if (!h || !w || h <= 0 || w <= 0) {
      setResult('올바른 값을 입력해주세요')
      setBmiValue(null)
      return
    }
    
    const bmi = (w / (h * h))
    setBmiValue(bmi)
    
    let status = ''
    if (bmi < 18.5) {
      status = '저체중'
    } else if (bmi < 25) {
      status = '정상'
    } else if (bmi < 30) {
      status = '과체중'
    } else {
      status = '비만'
    }
    
    setResult(`BMI ${bmi.toFixed(1)} - ${status}`)
  }

  const getBMIColor = (value: number) => {
    if (value < 18.5) return 'text-blue-600'
    if (value < 25) return 'text-green-600'
    if (value < 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white text-2xl mb-6 shadow-lg">
              ⚖️
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              BMI 계산기
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              키와 몸무게를 입력하여 체질량지수(BMI)를 계산하고 건강 상태를 확인하세요
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Height Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    키 (cm)
                  </label>
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
                </div>
                
                {/* Weight Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    몸무게 (kg)
                  </label>
                  <div className="relative">
                    <input 
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-medium"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                      kg
                    </div>
                  </div>
                </div>
                
                {/* Calculate Button */}
                <button 
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  BMI 계산하기
                </button>
              </div>
            </div>

            {/* Result Section */}
            {result && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 sm:px-8 py-6">
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
                      <span className="text-blue-600">저체중</span>
                      <span className="text-green-600">정상</span>
                      <span className="text-yellow-600">과체중</span>
                      <span className="text-red-600">비만</span>
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
            <h3 className="text-xl font-bold text-gray-900 mb-6">BMI 기준표</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { range: '18.5 미만', status: '저체중', color: 'text-blue-600', bgColor: 'bg-blue-50' },
                { range: '18.5 ~ 24.9', status: '정상', color: 'text-green-600', bgColor: 'bg-green-50' },
                { range: '25.0 ~ 29.9', status: '과체중', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
                { range: '30.0 이상', status: '비만', color: 'text-red-600', bgColor: 'bg-red-50' }
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
                <strong className="text-blue-700">참고사항:</strong> BMI는 참고용이며, 개인의 건강 상태를 완전히 반영하지 않을 수 있습니다. 
                정확한 건강 진단은 전문의와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}