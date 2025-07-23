import { describe, expect, it } from 'vitest'
import { AABB } from '../src/aabb'
import { OBB } from '../src/obb'

describe('OBB', () => {
  it('should create OBB correctly', () => {
    const obb = new OBB(0, 0, 10, 20, 0)
    expect(obb.x).toBe(0)
    expect(obb.y).toBe(0)
    expect(obb.width).toBe(10)
    expect(obb.height).toBe(20)
    expect(obb.rotation).toBe(0)
  })

  it('should calculate center correctly', () => {
    const obb = new OBB(0, 0, 10, 20, 0)
    expect(obb.center.x).toBe(5)
    expect(obb.center.y).toBe(10)
  })

  it('should get xy property correctly', () => {
    const obb = new OBB(5, 10, 15, 20, 0)
    const xy = obb.xy
    expect(xy.x).toBe(5)
    expect(xy.y).toBe(10)
  })

  it('should calculate vertex positions correctly', () => {
    const obb = new OBB(0, 0, 10, 20, 0)
    const vertexes = obb.calcVertexXY()
    expect(vertexes).toHaveLength(4)
    expect(vertexes[0]).toEqual({ x: 0, y: 0 }) // TL
    expect(vertexes[1]).toEqual({ x: 10, y: 0 }) // TR
    expect(vertexes[2]).toEqual({ x: 10, y: 20 }) // BR
    expect(vertexes[3]).toEqual({ x: 0, y: 20 }) // BL
  })

  it('should clone OBB correctly', () => {
    const original = new OBB(5, 10, 15, 20, 45)
    const clone = original.clone()
    expect(clone.x).toBe(original.x)
    expect(clone.y).toBe(original.y)
    expect(clone.width).toBe(original.width)
    expect(clone.height).toBe(original.height)
    expect(clone.rotation).toBe(original.rotation)
    expect(clone).not.toBe(original) // 确保是不同的实例
  })

  it('should calculate projection length correctly', () => {
    const obb = new OBB(0, 0, 10, 20, 0)
    const xAxis = { x: 1, y: 0 }
    const yAxis = { x: 0, y: 1 }

    expect(obb.projectionLengthAt(xAxis)).toBe(10)
    expect(obb.projectionLengthAt(yAxis)).toBe(20)
  })

  it('should detect collision correctly', () => {
    const obb1 = new OBB(0, 0, 10, 10, 0)
    const obb2 = new OBB(5, 5, 10, 10, 0) // 重叠
    const obb3 = new OBB(20, 20, 10, 10, 0) // 不重叠

    expect(obb1.collide(obb2)).toBe(true)
    expect(obb1.collide(obb3)).toBe(false)
  })

  it('should create identity OBB correctly', () => {
    const identity = OBB.IdentityOBB()
    expect(identity.x).toBe(0)
    expect(identity.y).toBe(0)
    expect(identity.width).toBe(0)
    expect(identity.height).toBe(0)
    expect(identity.rotation).toBe(0)
  })

  it('should create from rect correctly', () => {
    const rect = { x: 10, y: 20, width: 30, height: 40 }
    const obb = OBB.FromRect(rect, 45)
    expect(obb.x).toBe(10)
    expect(obb.y).toBe(20)
    expect(obb.width).toBe(30)
    expect(obb.height).toBe(40)
    expect(obb.rotation).toBe(45)
  })

  it('should create from AABB correctly', () => {
    const aabb = new AABB(5, 10, 15, 25)
    const obb = OBB.FromAABB(aabb)
    expect(obb.x).toBe(5)
    expect(obb.y).toBe(10)
    expect(obb.width).toBe(10)
    expect(obb.height).toBe(15)
    expect(obb.rotation).toBe(0)
  })
})
