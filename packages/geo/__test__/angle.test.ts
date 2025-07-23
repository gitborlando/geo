import { describe, expect, it } from 'vitest'
import { Angle, PI } from '../src/angle'

describe('Angle', () => {
  it('should export PI constant correctly', () => {
    expect(PI).toBe(Math.PI)
  })

  it('should calculate cosine correctly', () => {
    expect(Angle.Cos(0)).toBe(1)
    expect(Angle.Cos(90)).toBeCloseTo(0, 10)
    expect(Angle.Cos(180)).toBeCloseTo(-1, 10)
  })

  it('should calculate sine correctly', () => {
    expect(Angle.Sin(0)).toBe(0)
    expect(Angle.Sin(90)).toBeCloseTo(1, 10)
    expect(Angle.Sin(180)).toBeCloseTo(0, 10)
  })

  it('should calculate tangent correctly', () => {
    expect(Angle.Tan(0)).toBe(0)
    expect(Angle.Tan(45)).toBeCloseTo(1, 10)
  })

  it('should convert radians to degrees correctly', () => {
    expect(Angle.AngleFy(Math.PI)).toBe(180)
    expect(Angle.AngleFy(Math.PI / 2)).toBe(90)
    expect(Angle.AngleFy(0)).toBe(0)
  })

  it('should convert degrees to radians correctly', () => {
    expect(Angle.RadianFy(180)).toBe(Math.PI)
    expect(Angle.RadianFy(90)).toBe(Math.PI / 2)
    expect(Angle.RadianFy(0)).toBe(0)
  })

  it('should normalize angles correctly', () => {
    expect(Angle.Normal(370)).toBe(10)
    expect(Angle.Normal(-10)).toBe(350)
    expect(Angle.Normal(0)).toBe(0)
  })

  it('should snap angles to steps correctly', () => {
    expect(Angle.Snap(45)).toBe(90) // 45度四舍五入到90度
    expect(Angle.Snap(80)).toBe(90)
    expect(Angle.Snap(120)).toBe(90)
    expect(Angle.Snap(135)).toBe(180)
    expect(Angle.Snap(0)).toBe(0)
    expect(Angle.Snap(30)).toBe(0) // 30度四舍五入到0度
  })

  it('should rotate point correctly', () => {
    const result = Angle.RotatePoint(1, 0, 0, 0, 90)
    expect(result.x).toBeCloseTo(0, 10)
    expect(result.y).toBeCloseTo(1, 10)
  })
})
