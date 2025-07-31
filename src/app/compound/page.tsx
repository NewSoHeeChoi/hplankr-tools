'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [compound, setCompound] = useState('12') // monthly by default
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [result, setResult] = useState<{
    error?: string;
    totalAmount?: number;
    totalPrincipal?: number;
    totalInterest?: number;
    simpleInterest?: number;
    compoundAdvantage?: number;
    interestRate?: number;
  } | null>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(time)
    const n = parseFloat(compound)
    const PMT = parseFloat(monthlyContribution) || 0

    if (!P || !r || !t || P <= 0 || r <= 0 || t <= 0) {
      setResult({ error: '모든 값을 올바르게 입력해주세요' })
      return
    }

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const compoundInterest = P * Math.pow((1 + r/n), (n * t))
    
    // Future Value of Annuity (monthly contributions): PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const annuityValue = PMT > 0 ? PMT * (Math.pow(1 + r/n, n * t) - 1) / (r/n) : 0
    
    const totalAmount = compoundInterest + annuityValue
    const totalPrincipal = P + (PMT * 12 * t)
    const totalInterest = totalAmount - totalPrincipal

    // Simple Interest for comparison
    const simpleInterest = P * (1 + r * t) + (PMT * 12 * t * (1 + r * t / 2))
    const compoundAdvantage = totalAmount - simpleInterest

    setResult({
      totalAmount,
      totalPrincipal,
      totalInterest,
      simpleInterest,
      compoundAdvantage,
      interestRate: (totalInterest / totalPrincipal) * 100
    })
  }

  const compoundingOptions = [
    { value: '1', label: '연 1회 (Annually)', frequency: 'annual' },
    { value: '4', label: '분기별 (Quarterly)', frequency: 'quarterly' },
    { value: '12', label: '월별 (Monthly)', frequency: 'monthly' },
    { value: '365', label: '일별 (Daily)', frequency: 'daily' }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl text-white text-2xl mb-6 shadow-lg">
              💰
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              복리 계산기
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              복리의 마법을 체험해보세요. 투자와 저축의 장기적 성장을 시뮬레이션하고 계획하세요
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">투자 정보 입력</h3>
                  
                  {/* Principal Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      초기 투자금 (원금)
                    </label>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="1000000"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">예: 1,000,000원</div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      연간 이자율 (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="7.5"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">예: 7.5% (주식시장 평균)</div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      투자 기간 (년)
                    </label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="10"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">예: 10년 장기 투자</div>
                  </div>

                  {/* Compounding Frequency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      복리 주기
                    </label>
                    <select
                      value={compound}
                      onChange={(e) => setCompound(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium bg-white"
                    >
                      {compoundingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly Contribution */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      월 추가 투자금 (선택사항)
                    </label>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="100000"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-medium"
                    />
                    <div className="text-sm text-gray-500 mt-1">매월 정기 투자금</div>
                  </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">계산 결과</h3>
                  
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
                            <div className="text-3xl font-bold text-emerald-600 mb-2">
                              ₩{result.totalAmount?.toLocaleString() || '0'}
                            </div>
                            <div className="text-sm text-gray-600">
                              최종 투자 금액
                            </div>
                          </div>

                          {/* Breakdown */}
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">총 투자원금</span>
                                <span className="text-lg font-bold text-gray-700">
                                  ₩{result.totalPrincipal?.toLocaleString() || '0'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">복리 수익</span>
                                <span className="text-lg font-bold text-emerald-600">
                                  ₩{result.totalInterest?.toLocaleString() || '0'}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">수익률</span>
                                <span className="text-lg font-bold text-emerald-600">
                                  {result.interestRate?.toFixed(1) || '0'}%
                                </span>
                              </div>
                            </div>

                            {(result.compoundAdvantage || 0) > 0 && (
                              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-emerald-700">복리의 이점</span>
                                  <span className="text-lg font-bold text-emerald-600">
                                    +₩{result.compoundAdvantage?.toLocaleString() || '0'}
                                  </span>
                                </div>
                                <div className="text-xs text-emerald-600 mt-1">
                                  단리 대비 추가 수익
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <div className="text-4xl mb-4">💰</div>
                          <div>투자 정보를 입력하고 계산해보세요</div>
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
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg transform hover:-translate-y-0.5 shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <span>복리 계산하기</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-4 4" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">복리의 힘</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⏰',
                  title: '시간의 마법',
                  description: '시간이 길수록 복리의 효과는 기하급수적으로 증가합니다. 일찍 시작할수록 유리합니다.',
                  color: 'emerald'
                },
                {
                  icon: '📈',
                  title: '수익의 재투자',
                  description: '얻은 수익을 다시 투자하여 수익이 수익을 낳는 선순환 구조를 만듭니다.',
                  color: 'blue'
                },
                {
                  icon: '🎯',
                  title: '목표 달성',
                  description: '정기적인 추가 투자와 복리의 힘으로 재정 목표를 더 빠르게 달성할 수 있습니다.',
                  color: 'green'
                }
              ].map((item, index) => {
                const colorClasses = {
                  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
                  blue: 'bg-blue-50 border-blue-200 text-blue-600',
                  green: 'bg-green-50 border-green-200 text-green-600'
                }
                return (
                  <div key={index} className={`rounded-xl p-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className={`font-semibold mb-2 ${item.color === 'emerald' ? 'text-emerald-700' : item.color === 'blue' ? 'text-blue-700' : 'text-green-700'}`}>
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
                <strong className="text-yellow-700">💡 투자 팁:</strong> 
&quot;복리는 우주에서 가장 강력한 힘이다&quot; - 알베르트 아인슈타인. 
                꾸준한 장기 투자와 복리의 힘으로 wealth building을 시작해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}