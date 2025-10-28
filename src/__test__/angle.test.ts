import { describe, expect, it } from 'vitest'
import { Angle, PI } from '../angle'

describe('Angle', () => {
  it('should export PI constant correctly', () => {
    expect(PI).toBe(Math.PI)
  })

  it('should calculate cosine correctly', () => {
    expect(Angle.cos(0)).toBe(1)
    expect(Angle.cos(90)).toBeCloseTo(0, 10)
    expect(Angle.cos(180)).toBeCloseTo(-1, 10)
  })

  it('should calculate sine correctly', () => {
    expect(Angle.sin(0)).toBe(0)
    expect(Angle.sin(90)).toBeCloseTo(1, 10)
    expect(Angle.sin(180)).toBeCloseTo(0, 10)
  })

  it('should calculate tangent correctly', () => {
    expect(Angle.tan(0)).toBe(0)
    expect(Angle.tan(45)).toBeCloseTo(1, 10)
  })

  it('should convert radians to degrees correctly', () => {
    expect(Angle.angleFy(Math.PI)).toBe(180)
    expect(Angle.angleFy(Math.PI / 2)).toBe(90)
    expect(Angle.angleFy(0)).toBe(0)
  })

  it('should convert degrees to radians correctly', () => {
    expect(Angle.radianFy(180)).toBe(Math.PI)
    expect(Angle.radianFy(90)).toBe(Math.PI / 2)
    expect(Angle.radianFy(0)).toBe(0)
  })

  it('should normalize angles correctly', () => {
    expect(Angle.normal(370)).toBe(10)
    expect(Angle.normal(-10)).toBe(350)
    expect(Angle.normal(0)).toBe(0)
  })

  it('should snap angles to steps correctly', () => {
    expect(Angle.snap(45)).toBe(90) // 45度四舍五入到90度
    expect(Angle.snap(80)).toBe(90)
    expect(Angle.snap(120)).toBe(90)
    expect(Angle.snap(135)).toBe(180)
    expect(Angle.snap(0)).toBe(0)
    expect(Angle.snap(30)).toBe(0) // 30度四舍五入到0度
  })

  it('should rotate point correctly', () => {
    const result = Angle.rotatePoint(1, 0, 0, 0, 90)
    expect(result.x).toBeCloseTo(0, 10)
    expect(result.y).toBeCloseTo(1, 10)
  })
})
