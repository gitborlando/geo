import { describe, expect, it } from 'vitest'
import {
  abs,
  ceil,
  divide,
  floor,
  max,
  min,
  multiply,
  numberHalfFix,
  pow2,
  pow3,
  random,
  round,
  sqrt,
} from '../math'

describe('Math utilities', () => {
  it('should export Math functions correctly', () => {
    expect(sqrt(16)).toBe(4)
    expect(abs(-5)).toBe(5)
    expect(min(3, 1, 4)).toBe(1)
    expect(max(3, 1, 4)).toBe(4)
    expect(round(3.7)).toBe(4)
    expect(floor(3.7)).toBe(3)
    expect(ceil(3.2)).toBe(4)
    expect(typeof random()).toBe('number')
  })

  it('should calculate power of 2 correctly', () => {
    expect(pow2(3)).toBe(9)
    expect(pow2(4)).toBe(16)
    expect(pow2(0)).toBe(0)
  })

  it('should calculate power of 3 correctly', () => {
    expect(pow3(2)).toBe(8)
    expect(pow3(3)).toBe(27)
    expect(pow3(1)).toBe(1)
  })

  it('should multiply numbers correctly', () => {
    expect(multiply(2, 3, 4)).toBe(24)
    expect(multiply(1, 2, 3, 4, 5)).toBe(120)
    expect(multiply()).toBe(1)
  })

  it('should divide numbers correctly', () => {
    expect(divide(10, 2)).toBe(5)
    expect(divide(7, 3)).toBeCloseTo(2.333, 3)
    expect(divide(5, 0)).toBe(1) // 除零返回1
  })

  it('should fix number to half correctly', () => {
    expect(numberHalfFix(1.1)).toBe(1)
    expect(numberHalfFix(1.3)).toBe(1.5)
    expect(numberHalfFix(1.8)).toBe(2)
    expect(numberHalfFix(2.25)).toBe(2.5)
    expect(numberHalfFix(2.75)).toBe(3)
  })
})
