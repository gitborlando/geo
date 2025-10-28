import { describe, expect, it } from 'vitest'
import { AABB } from '../aabb'
import { IMatrix, Matrix } from '../matrix'

describe('Matrix', () => {
  it('should create identity matrix correctly', () => {
    const matrix = Matrix.create()
    expect(matrix).toEqual([1, 0, 0, 1, 0, 0])
  })

  it('should invert matrix correctly', () => {
    const matrix: IMatrix = [2, 0, 0, 2, 10, 20]
    const inverted = Matrix.invert(matrix)
    expect(inverted[0]).toBeCloseTo(0.5)
    expect(inverted[1]).toBeCloseTo(0)
    expect(inverted[2]).toBeCloseTo(0)
    expect(inverted[3]).toBeCloseTo(0.5)
    expect(inverted[4]).toBeCloseTo(-5)
    expect(inverted[5]).toBeCloseTo(-10)
  })

  it('should apply matrix to point correctly', () => {
    const point = { x: 10, y: 20 }
    const matrix: IMatrix = [2, 0, 0, 2, 5, 10] // 缩放2倍，平移(5,10)
    const result = Matrix.applyPoint(point, matrix)
    expect(result.x).toBe(25) // 10*2 + 5 = 25
    expect(result.y).toBe(50) // 20*2 + 10 = 50
  })

  it('should apply matrix to AABB correctly', () => {
    const aabb = new AABB(0, 0, 10, 20)
    const matrix: IMatrix = [2, 0, 0, 2, 0, 0] // 缩放2倍
    const result = Matrix.applyAABB(aabb, matrix)
    expect(result.minX).toBe(0)
    expect(result.minY).toBe(0)
    expect(result.maxX).toBe(20)
    expect(result.maxY).toBe(40)
  })

  it('should invert point transformation correctly', () => {
    const point = { x: 25, y: 50 }
    const matrix: IMatrix = [2, 0, 0, 2, 5, 10]
    const result = Matrix.invertPoint(point, matrix)
    expect(result.x).toBe(10) // (25-5)/2 = 10
    expect(result.y).toBe(20) // (50-10)/2 = 20
  })

  it('should invert AABB transformation correctly', () => {
    const transformedAABB = { minX: 0, minY: 0, maxX: 20, maxY: 40 }
    const matrix: IMatrix = [2, 0, 0, 2, 0, 0]
    const result = Matrix.invertAABB(transformedAABB, matrix)
    expect(result.minX).toBe(0)
    expect(result.minY).toBe(0)
    expect(result.maxX).toBe(10)
    expect(result.maxY).toBe(20)
  })

  it('should handle translation matrix correctly', () => {
    const point = { x: 5, y: 10 }
    const translationMatrix: IMatrix = [1, 0, 0, 1, 15, 25]
    const result = Matrix.applyPoint(point, translationMatrix)
    expect(result.x).toBe(20) // 5 + 15
    expect(result.y).toBe(35) // 10 + 25
  })

  it('should handle rotation matrix correctly', () => {
    const point = { x: 1, y: 0 }
    const rotationMatrix: IMatrix = [0, 1, -1, 0, 0, 0] // 90度旋转
    const result = Matrix.applyPoint(point, rotationMatrix)
    expect(result.x).toBeCloseTo(0, 10)
    expect(result.y).toBeCloseTo(1, 10)
  })
})
