export const { sqrt, abs, min, max, round, floor, ceil, random } = Math

export function pow2(number: number) {
  return Math.pow(number, 2)
}
export function pow3(number: number) {
  return Math.pow(number, 3)
}

export function multiply(...numbers: number[]) {
  return numbers.reduce((i, all) => (all *= i), 1)
}
export function divide(a: number, b: number) {
  return b === 0 ? 1 : a / b
}

export function numberHalfFix(number: number) {
  const integerPart = ~~number
  const floatPart = number - integerPart
  const halfFixed = floatPart >= 0.75 ? 1 : floatPart >= 0.25 ? 0.5 : 0
  return integerPart + halfFixed
}

export function twoDecimal(number: number) {
  return Number(number.toFixed(Number.isInteger(number) ? 0 : 2))
}
