'use client'

import { useState, useCallback } from 'react'

interface UseCalculatorOptions<V = unknown> {
  initialState?: string | number
  validationFn?: (value: V) => boolean
  calculationFn?: (values: V) => unknown
}

export function useCalculator<T = unknown, V = unknown>(options: UseCalculatorOptions<V> = {}) {
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(async (values: V, customCalculationFn?: (values: V) => Promise<T> | T) => {
    setIsCalculating(true)
    setError(null)

    try {
      // 짧은 지연으로 로딩 애니메이션 표시
      await new Promise(resolve => setTimeout(resolve, 300))

      // 검증
      if (options.validationFn && !options.validationFn(values)) {
        throw new Error('Invalid input values')
      }

      // 계산 실행
      const calculationFn = customCalculationFn || options.calculationFn
      if (!calculationFn) {
        throw new Error('No calculation function provided')
      }

      const calculationResult = await calculationFn(values)
      setResult(calculationResult as T)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed')
      setResult(null)
    } finally {
      setIsCalculating(false)
    }
  }, [options])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setIsCalculating(false)
  }, [])

  return {
    isCalculating,
    result,
    error,
    calculate,
    reset
  }
}