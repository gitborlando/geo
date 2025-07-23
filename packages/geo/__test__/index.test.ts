import { describe, expect, it } from 'vitest'
import * as Geo from '../src/index'

describe('Index exports', () => {
  it('should export all modules correctly', () => {
    // 验证AABB相关导出
    expect(typeof Geo.AABB).toBe('function')

    // 验证Angle相关导出
    expect(typeof Geo.Angle).toBe('function')
    expect(typeof Geo.PI).toBe('number')

    // 验证数学函数导出
    expect(typeof Geo.sqrt).toBe('function')
    expect(typeof Geo.abs).toBe('function')
    expect(typeof Geo.pow2).toBe('function')
    expect(typeof Geo.pow3).toBe('function')
    expect(typeof Geo.multiply).toBe('function')
    expect(typeof Geo.divide).toBe('function')
    expect(typeof Geo.numberHalfFix).toBe('function')

    // 验证Matrix相关导出
    expect(typeof Geo.Matrix).toBe('function')

    // 验证OBB相关导出
    expect(typeof Geo.OBB).toBe('function')

    // 验证贝塞尔曲线相关导出
    expect(typeof Geo.pointsOnBezierCurves).toBe('function')
    expect(typeof Geo.simplify).toBe('function')
    expect(typeof Geo.simplifyPoints).toBe('function')

    // 验证XY相关导出
    expect(typeof Geo.xy_).toBe('function')
    expect(typeof Geo.xy_client).toBe('function')
    expect(typeof Geo.xy_from).toBe('function')
    expect(typeof Geo.xy_plus).toBe('function')
    expect(typeof Geo.xy_minus).toBe('function')
    expect(typeof Geo.xy_multiply).toBe('function')
    expect(typeof Geo.xy_divide).toBe('function')
    expect(typeof Geo.xy_distance).toBe('function')
    expect(typeof Geo.xy_dot).toBe('function')
    expect(typeof Geo.XY).toBe('function')
  })

  it('should export type interfaces', () => {
    // 验证可以使用导出的类型
    const point: Geo.IXY = { x: 10, y: 20 }
    const rect: Geo.IRect = { x: 0, y: 0, width: 100, height: 50 }
    const rectWithCenter: Geo.IRectWithCenter = {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      centerX: 50,
      centerY: 25,
    }

    expect(point.x).toBe(10)
    expect(rect.width).toBe(100)
    expect(rectWithCenter.centerX).toBe(50)
  })

  it('should allow creating instances from exported classes', () => {
    // 测试能够创建实例
    const aabb = new Geo.AABB(0, 0, 10, 10)
    const obb = new Geo.OBB(0, 0, 10, 10, 0)
    const xy = new Geo.XY(5, 5)

    expect(aabb.minX).toBe(0)
    expect(obb.width).toBe(10)
    expect(xy.x).toBe(5)
  })

  it('should allow using static methods from exported classes', () => {
    // 测试静态方法
    const matrix = Geo.Matrix.Create()
    const normalizedAngle = Geo.Angle.Normal(370)
    const distance = Geo.xy_distance({ x: 0, y: 0 }, { x: 3, y: 4 })

    expect(matrix).toEqual([1, 0, 0, 1, 0, 0])
    expect(normalizedAngle).toBe(10)
    expect(distance).toBe(5)
  })
})
