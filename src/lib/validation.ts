/**
 * 입력 검증 유틸리티 함수들
 */

export function parseNumber(value: string): number | null {
  const parsed = parseFloat(value.trim())
  return isNaN(parsed) ? null : parsed
}

export function parsePositiveNumber(value: string): number | null {
  const parsed = parseNumber(value)
  return parsed !== null && parsed > 0 ? parsed : null
}

export function parseNonNegativeNumber(value: string): number | null {
  const parsed = parseNumber(value)
  return parsed !== null && parsed >= 0 ? parsed : null
}

export function validateRequiredFields(...values: string[]): boolean {
  return values.every(value => value.trim() !== '')
}

export function validatePositiveNumbers(...values: string[]): boolean {
  return values.every(value => {
    const parsed = parsePositiveNumber(value)
    return parsed !== null
  })
}