/**
 * 지역별 현지화 유틸리티 함수들
 * 화폐 단위, 측정 단위, 온도 단위, 날짜 형식을 지역별로 처리
 */

export type Locale = 'ko' | 'en';

// 화폐 정보
export const CURRENCY_INFO = {
  ko: {
    symbol: '₩',
    name: '원',
    code: 'KRW',
    position: 'prefix', // ₩1,000
    thousandSeparator: ',',
    decimalSeparator: '.',
    decimalPlaces: 0
  },
  en: {
    symbol: '$',
    name: 'USD',
    code: 'USD',
    position: 'prefix', // $1,000
    thousandSeparator: ',',
    decimalSeparator: '.',
    decimalPlaces: 2
  }
} as const;

// 측정 단위 시스템
export const MEASUREMENT_SYSTEMS = {
  ko: {
    length: {
      primary: 'cm',
      secondary: 'm',
      units: ['mm', 'cm', 'm', 'km']
    },
    weight: {
      primary: 'kg',
      secondary: 'g',
      units: ['g', 'kg']
    },
    temperature: {
      primary: 'celsius',
      units: ['celsius', 'fahrenheit']
    }
  },
  en: {
    length: {
      primary: 'ft',
      secondary: 'in',
      units: ['in', 'ft', 'yd', 'mi', 'cm', 'm']
    },
    weight: {
      primary: 'lb',
      secondary: 'oz',
      units: ['oz', 'lb', 'kg', 'g']
    },
    temperature: {
      primary: 'fahrenheit',
      units: ['fahrenheit', 'celsius']
    }
  }
} as const;

// 날짜 형식
export const DATE_FORMATS = {
  ko: {
    short: 'YYYY/MM/DD',
    long: 'YYYY년 MM월 DD일',
    input: 'YYYY-MM-DD'
  },
  en: {
    short: 'MM/DD/YYYY',
    long: 'MMMM DD, YYYY',
    input: 'YYYY-MM-DD'
  }
} as const;

/**
 * 화폐 포맷팅 함수
 */
export function formatCurrency(amount: number, locale: Locale): string {
  const currency = CURRENCY_INFO[locale];
  
  // 소수점 처리
  const roundedAmount = currency.decimalPlaces === 0 
    ? Math.round(amount) 
    : Number(amount.toFixed(currency.decimalPlaces));
  
  // 천 단위 구분자 추가
  const formattedNumber = roundedAmount.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces
  });
  
  return currency.position === 'prefix' 
    ? `${currency.symbol}${formattedNumber}`
    : `${formattedNumber}${currency.symbol}`;
}

/**
 * 화폐 단위 정보 가져오기
 */
export function getCurrencyInfo(locale: Locale) {
  return CURRENCY_INFO[locale];
}

/**
 * 측정 단위 시스템 정보 가져오기
 */
export function getMeasurementSystem(locale: Locale) {
  return MEASUREMENT_SYSTEMS[locale];
}

/**
 * BMI 계산 시 사용할 기본 단위들
 */
export function getBMIDefaultUnits(locale: Locale) {
  const system = MEASUREMENT_SYSTEMS[locale];
  return {
    height: system.length.primary,
    weight: system.weight.primary,
    heightSecondary: system.length.secondary // 미국에서 ft + in 조합을 위해
  };
}

/**
 * 단위 변환기에서 사용할 기본 단위들
 */
export function getConverterDefaults(locale: Locale) {
  const system = MEASUREMENT_SYSTEMS[locale];
  return {
    length: {
      from: system.length.primary,
      to: system.length.secondary
    },
    weight: {
      from: system.weight.primary,
      to: system.weight.secondary
    },
    temperature: {
      from: system.temperature.primary,
      to: system.temperature.primary === 'celsius' ? 'fahrenheit' : 'celsius'
    }
  };
}

/**
 * 온도 단위 변환
 */
export function convertTemperature(value: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number {
  if (from === to) return value;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9/5) + 32;
  } else if (from === 'fahrenheit' && to === 'celsius') {
    return (value - 32) * 5/9;
  }
  
  return value;
}

/**
 * 길이 단위 변환 (기본적인 것들만)
 */
export function convertLength(value: number, from: string, to: string): number {
  const conversions: { [key: string]: number } = {
    // 미터법
    'mm': 0.001,
    'cm': 0.01,
    'm': 1,
    'km': 1000,
    // 야드파운드법
    'in': 0.0254,
    'ft': 0.3048,
    'yd': 0.9144,
    'mi': 1609.34
  };
  
  if (!conversions[from] || !conversions[to]) return value;
  
  // 미터로 변환 후 목표 단위로 변환
  const meters = value * conversions[from];
  return meters / conversions[to];
}

/**
 * 무게 단위 변환
 */
export function convertWeight(value: number, from: string, to: string): number {
  const conversions: { [key: string]: number } = {
    // 미터법
    'g': 1,
    'kg': 1000,
    // 야드파운드법
    'oz': 28.3495,
    'lb': 453.592
  };
  
  if (!conversions[from] || !conversions[to]) return value;
  
  // 그램으로 변환 후 목표 단위로 변환
  const grams = value * conversions[from];
  return grams / conversions[to];
}

/**
 * 피트와 인치를 센티미터로 변환
 */
export function feetInchesToCm(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches;
  return totalInches * 2.54;
}

/**
 * 센티미터를 피트와 인치로 변환
 */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/**
 * 파운드를 킬로그램으로 변환
 */
export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

/**
 * 킬로그램을 파운드로 변환
 */
export function kgToLbs(kg: number): number {
  return kg / 0.453592;
}

/**
 * 날짜 형식 가져오기
 */
export function getDateFormat(locale: Locale) {
  return DATE_FORMATS[locale];
}

/**
 * 지역별 예시 값들
 */
export function getExampleValues(locale: Locale) {
  return {
    currency: locale === 'ko' ? '1,000,000' : '10,000',
    currencySmall: locale === 'ko' ? '100,000' : '1,000', 
    height: locale === 'ko' ? '170' : "5'7\"",
    weight: locale === 'ko' ? '70' : '154',
    temperature: locale === 'ko' ? '25' : '77',
    interestRate: locale === 'ko' ? '7.5% (주식시장 평균)' : '7.5% (Stock market average)'
  };
}

/**
 * 단위 라벨 가져오기
 */
export function getUnitLabels(locale: Locale) {
  return {
    height: locale === 'ko' ? 'cm' : 'ft/in',
    weight: locale === 'ko' ? 'kg' : 'lbs',
    temperature: locale === 'ko' ? '°C' : '°F',
    currency: CURRENCY_INFO[locale].name
  };
}