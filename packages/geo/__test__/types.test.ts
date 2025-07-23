import { describe, expect, it } from 'vitest'
import { IRect, IRectWithCenter, IXY } from '../src/types'

describe('Types', () => {
  it('should define IXY interface correctly', () => {
    const point: IXY = { x: 10, y: 20 }
    expect(point.x).toBe(10)
    expect(point.y).toBe(20)
  })

  it('should define IRect interface correctly', () => {
    const rect: IRect = { x: 0, y: 0, width: 100, height: 50 }
    expect(rect.x).toBe(0)
    expect(rect.y).toBe(0)
    expect(rect.width).toBe(100)
    expect(rect.height).toBe(50)
  })

  it('should define IRectWithCenter interface correctly', () => {
    const rectWithCenter: IRectWithCenter = {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      centerX: 50,
      centerY: 25,
    }
    expect(rectWithCenter.centerX).toBe(50)
    expect(rectWithCenter.centerY).toBe(25)
  })
})
