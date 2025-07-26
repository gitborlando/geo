import { describe, expect, it } from 'vitest'
import {
  XY,
  xy_,
  xy_center,
  xy_client,
  xy_distance,
  xy_divide,
  xy_dot,
  xy_from,
  xy_minus,
  xy_multiply,
  xy_mutate,
  xy_opposite,
  xy_plus,
  xy_toArray,
} from '../src/xy'

describe('XY utilities', () => {
  it('should create xy point correctly', () => {
    const point = xy_(10, 20)
    expect(point.x).toBe(10)
    expect(point.y).toBe(20)
  })

  it('should create xy from client event correctly', () => {
    const event = { clientX: 100, clientY: 200 }
    const point = xy_client(event)
    expect(point.x).toBe(100)
    expect(point.y).toBe(200)
  })

  it('should copy xy point correctly', () => {
    const original = { x: 5, y: 10 }
    const copy = xy_from(original)
    expect(copy.x).toBe(5)
    expect(copy.y).toBe(10)
  })

  it('should get center point correctly', () => {
    const rect = { centerX: 50, centerY: 75 }
    const center = xy_center(rect)
    expect(center.x).toBe(50)
    expect(center.y).toBe(75)
  })

  it('should mutate xy point correctly', () => {
    const point1 = { x: 1, y: 2 }
    const point2 = { x: 3, y: 4 }
    xy_mutate(point1, point2)
    expect(point1.x).toBe(3)
    expect(point1.y).toBe(4)
  })

  it('should add xy points correctly', () => {
    const point1 = { x: 1, y: 2 }
    const point2 = { x: 3, y: 4 }
    const result = xy_plus(point1, point2)
    expect(result.x).toBe(4)
    expect(result.y).toBe(6)
  })

  it('should subtract xy points correctly', () => {
    const point1 = { x: 5, y: 8 }
    const point2 = { x: 2, y: 3 }
    const result = xy_minus(point1, point2)
    expect(result.x).toBe(3)
    expect(result.y).toBe(5)
  })

  it('should multiply xy point correctly', () => {
    const point = { x: 2, y: 3 }
    const result = xy_multiply(point, 2, 3)
    expect(result.x).toBe(12)
    expect(result.y).toBe(18)
  })

  it('should divide xy point correctly', () => {
    const point = { x: 12, y: 18 }
    const result = xy_divide(point, 2, 3)
    expect(result.x).toBe(2)
    expect(result.y).toBe(3)
  })

  it('should calculate distance correctly', () => {
    const point1 = { x: 0, y: 0 }
    const point2 = { x: 3, y: 4 }
    const distance = xy_distance(point1, point2)
    expect(distance).toBe(5)
  })

  it('should calculate dot product correctly', () => {
    const point1 = { x: 2, y: 3 }
    const point2 = { x: 4, y: 5 }
    const dot = xy_dot(point1, point2)
    expect(dot).toBe(23) // 2*4 + 3*5 = 8 + 15 = 23
  })

  it('should get opposite point correctly', () => {
    const point = { x: 3, y: -4 }
    const opposite = xy_opposite(point)
    expect(opposite.x).toBe(-3)
    expect(opposite.y).toBe(4)
  })

  it('should convert to array correctly', () => {
    const point = { x: 7, y: 11 }
    const array = xy_toArray(point)
    expect(array).toEqual([7, 11])
  })
})

describe('XY class', () => {
  it('should create XY instance correctly', () => {
    const xy = new XY(10, 20)
    expect(xy.x).toBe(10)
    expect(xy.y).toBe(20)
  })

  it('should create from point correctly', () => {
    const xy = XY.from({ x: 5, y: 10 })
    expect(xy.x).toBe(5)
    expect(xy.y).toBe(10)
  })

  it('should create from array correctly', () => {
    const xy = XY.fromArray([15, 25])
    expect(xy.x).toBe(15)
    expect(xy.y).toBe(25)
  })

  it('should perform chained operations correctly', () => {
    const xy = new XY(2, 3).plus({ x: 1, y: 2 }).multiply(2)
    expect(xy.x).toBe(6) // (2+1)*2 = 6
    expect(xy.y).toBe(10) // (3+2)*2 = 10
  })

  it('should calculate distance correctly', () => {
    const xy = new XY(0, 0)
    const distance = xy.distance({ x: 3, y: 4 })
    expect(distance).toBe(5)
  })
})
