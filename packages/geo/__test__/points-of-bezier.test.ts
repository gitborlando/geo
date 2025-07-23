import { describe, expect, it } from 'vitest'
import {
  Point,
  pointsOnBezierCurves,
  simplify,
  simplifyPoints,
} from '../src/points-of-bezier'

describe('Points of Bezier', () => {
  const createBezierPoints = (): Point[] => [
    { x: 0, y: 0 }, // 起点
    { x: 10, y: 20 }, // 控制点1
    { x: 30, y: 20 }, // 控制点2
    { x: 40, y: 0 }, // 终点
  ]

  it('should generate points on bezier curve correctly', () => {
    const controlPoints = createBezierPoints()
    const points = pointsOnBezierCurves(controlPoints, 0.15)

    expect(points.length).toBeGreaterThan(2)
    expect(points[0]).toEqual({ x: 0, y: 0 }) // 起点
    expect(points[points.length - 1]).toEqual({ x: 40, y: 0 }) // 终点
  })

  it('should generate points with custom tolerance', () => {
    const controlPoints = createBezierPoints()
    const highTolerance = pointsOnBezierCurves(controlPoints, 1.0)
    const lowTolerance = pointsOnBezierCurves(controlPoints, 0.01)

    expect(lowTolerance.length).toBeGreaterThan(highTolerance.length)
  })

  it('should generate points with distance simplification', () => {
    const controlPoints = createBezierPoints()
    const points = pointsOnBezierCurves(controlPoints, 0.15, 5.0)
    const pointsWithoutSimplify = pointsOnBezierCurves(controlPoints, 0.15)

    expect(points.length).toBeLessThanOrEqual(pointsWithoutSimplify.length)
  })

  it('should simplify points correctly', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0.1 },
      { x: 2, y: 0.2 },
      { x: 3, y: 0.1 },
      { x: 4, y: 0 },
      { x: 10, y: 0 },
    ]

    const simplified = simplify(points, 0.5)
    expect(simplified.length).toBeLessThan(points.length)
    expect(simplified[0]).toEqual(points[0]) // 起点保持
    expect(simplified[simplified.length - 1]).toEqual(points[points.length - 1]) // 终点保持
  })

  it('should simplify points with Ramer-Douglas-Peucker algorithm', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 3, y: 1 },
      { x: 4, y: 0 },
    ]

    const simplified = simplifyPoints(points, 0, points.length, 0.5)
    expect(simplified.length).toBeGreaterThanOrEqual(2) // 至少保留起点和终点
    expect(simplified[0]).toEqual(points[0])
  })

  it('should handle empty bezier curves correctly', () => {
    const emptyPoints: Point[] = []
    const result = pointsOnBezierCurves(emptyPoints)
    expect(result).toEqual([])
  })

  it('should handle single segment bezier correctly', () => {
    const singleSegment = createBezierPoints()
    const points = pointsOnBezierCurves(singleSegment, 0.15)

    expect(points.length).toBeGreaterThanOrEqual(2)
    expect(points[0].x).toBe(0)
    expect(points[0].y).toBe(0)
    expect(points[points.length - 1].x).toBe(40)
    expect(points[points.length - 1].y).toBe(0)
  })

  it('should handle multiple bezier segments correctly', () => {
    const multipleSegments: Point[] = [
      { x: 0, y: 0 }, // 第一段：起点
      { x: 10, y: 20 }, // 控制点1
      { x: 30, y: 20 }, // 控制点2
      { x: 40, y: 0 }, // 终点/第二段起点
      { x: 50, y: -20 }, // 控制点1
      { x: 70, y: -20 }, // 控制点2
      { x: 80, y: 0 }, // 第二段：终点
    ]

    const points = pointsOnBezierCurves(multipleSegments, 0.15)
    expect(points.length).toBeGreaterThan(4) // 应该有更多点
  })
})
