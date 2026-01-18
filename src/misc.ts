export function twoDecimal(number: number) {
  return Number(number.toFixed(Number.isInteger(number) ? 0 : 2))
}

export function minMax(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
