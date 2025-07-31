'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Age() {
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [result, setResult] = useState<{
    internationalAge: number
    koreanAge: number
    yearAge: number
    daysDiff: number
    daysToNextBirthday: number
    birthDayName: string
    birthDate: string
  } | null>(null)

  const calculate = () => {
    const year = parseInt(birthYear)
    const month = parseInt(birthMonth)
    const day = parseInt(birthDay)

    if (!year || !month || !day || year < 1900 || year > 2025 || month < 1 || month > 12 || day < 1 || day > 31) {
      setResult(null)
      return
    }

    const today = new Date()
    const birthDate = new Date(year, month - 1, day)
    
    // 만 나이 계산
    let internationalAge = today.getFullYear() - year
    if (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)) {
      internationalAge--
    }

    // 한국 나이 계산 (세는 나이)
    const koreanAge = today.getFullYear() - year + 1

    // 연 나이 계산
    const yearAge = today.getFullYear() - year

    // 태어난 지 며칠
    const timeDiff = today.getTime() - birthDate.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

    // 다음 생일까지 며칠
    const nextBirthday = new Date(today.getFullYear(), month - 1, day)
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 3600 * 24))

    // 요일 계산
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const birthDayName = dayNames[birthDate.getDay()]

    setResult({
      internationalAge,
      koreanAge,
      yearAge,
      daysDiff,
      daysToNextBirthday,
      birthDayName,
      birthDate: `${year}년 ${month}월 ${day}일`
    })
  }

  const getCurrentYear = () => new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl text-white text-2xl mb-6 shadow-lg">
              🎂
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              나이 계산기
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              만 나이, 세는 나이, 연 나이를 한번에 정확하게 계산하세요
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">생년월일 입력</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      태어난 년도
                    </label>
                    <input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      placeholder={`예: ${getCurrentYear() - 25}`}
                      min="1900"
                      max="2025"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      태어난 월
                    </label>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-medium bg-white"
                    >
                      <option value="">월을 선택하세요</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}월
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      태어난 일
                    </label>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-medium bg-white"
                    >
                      <option value="">일을 선택하세요</option>
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}일
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    나이 계산하기
                  </button>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">계산 결과</h3>
                  
                  {result ? (
                    <div className="space-y-4">
                      {/* Birth Info */}
                      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">🎂</div>
                          <div>
                            <div className="font-semibold text-gray-900">생년월일</div>
                            <div className="text-gray-700">{result.birthDate} ({result.birthDayName})</div>
                          </div>
                        </div>
                      </div>

                      {/* Age Cards */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-xl">✅</div>
                              <div className="font-semibold text-green-800">만 나이</div>
                            </div>
                            <div className="text-2xl font-bold text-green-700">{result.internationalAge}세</div>
                          </div>
                          <div className="text-xs text-green-600 mt-1">공식/법적 나이</div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-xl">🇰🇷</div>
                              <div className="font-semibold text-blue-800">세는 나이</div>
                            </div>
                            <div className="text-2xl font-bold text-blue-700">{result.koreanAge}세</div>
                          </div>
                          <div className="text-xs text-blue-600 mt-1">한국 전통 방식</div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-xl">📅</div>
                              <div className="font-semibold text-purple-800">연 나이</div>
                            </div>
                            <div className="text-2xl font-bold text-purple-700">{result.yearAge}세</div>
                          </div>
                          <div className="text-xs text-purple-600 mt-1">올해 - 태어난 해</div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">태어난 지</span>
                            <span className="font-semibold text-gray-900">{result.daysDiff.toLocaleString()}일</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">다음 생일까지</span>
                            <span className="font-semibold text-gray-900">{result.daysToNextBirthday}일</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-8 min-h-[20rem] flex items-center justify-center border border-rose-100">
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-4">🎂</div>
                        <div>생년월일을 입력하고 계산해보세요</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">나이 계산 방식 설명</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  type: '만 나이',
                  desc: '생일이 지났으면 (현재년도 - 출생년도), 생일이 안 지났으면 -1세',
                  icon: '✅',
                  color: 'green'
                },
                {
                  type: '세는 나이',
                  desc: '현재년도 - 출생년도 + 1 (한국 전통 방식)',
                  icon: '🇰🇷',
                  color: 'blue'
                },
                {
                  type: '연 나이',
                  desc: '현재년도 - 출생년도 (생일 무관)',
                  icon: '📅',
                  color: 'purple'
                }
              ].map((item, index) => (
                <div key={index} className={`bg-${item.color}-50 rounded-xl p-4 border border-${item.color}-100`}>
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{item.icon}</div>
                    <div>
                      <div className={`font-semibold text-${item.color}-800`}>{item.type}</div>
                      <div className="text-sm text-gray-700 mt-1">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-rose-700">참고사항:</strong> 2023년 6월 28일부터 공식 나이는 만 나이로 통일되었습니다.
                법적 문서나 공식적인 용도에는 만 나이를 사용하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}