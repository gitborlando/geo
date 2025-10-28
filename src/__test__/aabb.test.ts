// 测试轴对齐包围盒功能

import { describe, expect, it } from 'vitest'
import { AABB } from '../aabb'
import { OBB } from '../obb'

describe('AABB', () => {
  it('should create AABB correctly', () => {
    const aabb = new AABB(0, 0, 10, 10)
    expect(aabb.minX).toBe(0)
    expect(aabb.minY).toBe(0)
    expect(aabb.maxX).toBe(10)
    expect(aabb.maxY).toBe(10)
  })

  it('should convert to rect correctly', () => {
    const aabb = new AABB(5, 10, 15, 25)
    const rect = AABB.rect(aabb)
    expect(rect.x).toBe(5)
    expect(rect.y).toBe(10)
    expect(rect.width).toBe(10)
    expect(rect.height).toBe(15)
    expect(rect.centerX).toBe(10)
    expect(rect.centerY).toBe(17.5)
  })

  it('should detect collision correctly', () => {
    const aabb1 = new AABB(0, 0, 10, 10)
    const aabb2 = new AABB(5, 5, 15, 15)
    const aabb3 = new AABB(20, 20, 30, 30)

    expect(AABB.collide(aabb1, aabb2)).toBe(true)
    expect(AABB.collide(aabb1, aabb3)).toBe(false)
  })

  it('should detect inclusion correctly', () => {
    const large = new AABB(0, 0, 20, 20)
    const small = new AABB(5, 5, 15, 15)
    const outside = new AABB(25, 25, 35, 35)

    expect(AABB.include(large, small)).toBe(1) // large包含small
    expect(AABB.include(small, large)).toBe(0) // small被large包含
    expect(AABB.include(large, outside)).toBe(-1) // 不包含
  })

  it('should expand correctly with single value', () => {
    const aabb = new AABB(5, 5, 15, 15)
    const expanded = AABB.extend(aabb, 2)
    expect(expanded.minX).toBe(3)
    expect(expanded.minY).toBe(3)
    expect(expanded.maxX).toBe(17)
    expect(expanded.maxY).toBe(17)
  })

  it('should expand correctly with four values', () => {
    const aabb = new AABB(5, 5, 15, 15)
    const expanded = AABB.extend(aabb, 1, 2, 3, 4)
    expect(expanded.minX).toBe(4)
    expect(expanded.minY).toBe(3)
    expect(expanded.maxX).toBe(18)
    expect(expanded.maxY).toBe(19)
  })

  it('should merge multiple AABBs correctly', () => {
    const aabb1 = new AABB(0, 0, 5, 5)
    const aabb2 = new AABB(10, 10, 15, 15)
    const aabb3 = new AABB(-5, -5, 0, 0)

    const merged = AABB.merge(aabb1, aabb2, aabb3)
    expect(merged.minX).toBe(-5)
    expect(merged.minY).toBe(-5)
    expect(merged.maxX).toBe(15)
    expect(merged.maxY).toBe(15)
  })

  it('should create from OBB correctly', () => {
    const obb = new OBB(0, 0, 10, 20, 0)
    const aabb = AABB.fromOBB(obb)
    expect(aabb.minX).toBe(0)
    expect(aabb.minY).toBe(0)
    expect(aabb.maxX).toBe(10)
    expect(aabb.maxY).toBe(20)
  })
})
