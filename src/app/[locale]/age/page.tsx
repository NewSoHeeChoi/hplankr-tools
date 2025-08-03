'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import CalculatorLayout from '@/components/shared/CalculatorLayout'

export default function Age() {
  const t = useTranslations('age')
  const tc = useTranslations('common')
  const locale = useLocale() as 'ko' | 'en'
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
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const birthDayName = dayNames[birthDate.getDay()]

    setResult({
      internationalAge,
      koreanAge,
      yearAge,
      daysDiff,
      daysToNextBirthday,
      birthDayName,
      birthDate: `${year}/${month}/${day}`
    })
  }

  const getCurrentYear = () => new Date().getFullYear()

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('description')}
      icon="🎂"
      colorScheme="rose"
    >
      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('input_title')}</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('birth_year')}
                </label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder={locale === 'ko' ? `예: ${getCurrentYear() - 25}` : `e.g. ${getCurrentYear() - 25}`}
                  min="1900"
                  max="2025"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('birth_month')}
                </label>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-medium bg-white"
                >
                  <option value="">{t('month_placeholder')}</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('birth_day')}
                </label>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-medium bg-white"
                >
                  <option value="">{t('day_placeholder')}</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('calculate')}
              </button>
            </div>

            {/* Result Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{tc('result')}</h3>
              
              {result ? (
                <div className="space-y-4">
                  {/* Birth Info */}
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🎂</div>
                      <div>
                        <div className="font-semibold text-gray-900">{t('birth_info')}</div>
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
                          <div className="font-semibold text-green-800">{t('international_age')}</div>
                        </div>
                        <div className="text-2xl font-bold text-green-700">{result.internationalAge}</div>
                      </div>
                      <div className="text-xs text-green-600 mt-1">{t('official_legal')}</div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">🇰🇷</div>
                          <div className="font-semibold text-blue-800">{t('korean_age')}</div>
                        </div>
                        <div className="text-2xl font-bold text-blue-700">{result.koreanAge}</div>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">{t('traditional_korean')}</div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">📅</div>
                          <div className="font-semibold text-purple-800">{t('year_age')}</div>
                        </div>
                        <div className="text-2xl font-bold text-purple-700">{result.yearAge}</div>
                      </div>
                      <div className="text-xs text-purple-600 mt-1">{t('birth_year_minus')}</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t('days_lived')}</span>
                        <span className="font-semibold text-gray-900">{result.daysDiff.toLocaleString()}일</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t('days_to_birthday')}</span>
                        <span className="font-semibold text-gray-900">{result.daysToNextBirthday?.toLocaleString()}일</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-8 min-h-[20rem] flex items-center justify-center border border-rose-100">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-4">🎂</div>
                    <div>{t('result_placeholder')}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('explanation_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              type: t('methods.international.title'),
              desc: t('methods.international.description'),
              icon: '✅',
              bgColor: 'bg-green-50',
              borderColor: 'border-green-100',
              textColor: 'text-green-800'
            },
            {
              type: t('methods.korean.title'),
              desc: t('methods.korean.description'),
              icon: '🇰🇷',
              bgColor: 'bg-blue-50',
              borderColor: 'border-blue-100',
              textColor: 'text-blue-800'
            },
            {
              type: t('methods.year.title'),
              desc: t('methods.year.description'),
              icon: '📅',
              bgColor: 'bg-purple-50',
              borderColor: 'border-purple-100',
              textColor: 'text-purple-800'
            }
          ].map((item, index) => (
            <div key={index} className={`${item.bgColor} rounded-xl p-4 border ${item.borderColor}`}>
              <div className="flex items-start space-x-3">
                <div className="text-xl">{item.icon}</div>
                <div>
                  <div className={`font-semibold ${item.textColor}`}>{item.type}</div>
                  <div className="text-sm text-gray-700 mt-1">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-rose-700">{t('note_label')}:</strong> {t('note')}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}