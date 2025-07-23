import { max, min } from './math'
import { OBB } from './obb'
import { IRectWithCenter } from './types'
import { xy_ } from './xy'

export class AABB {
  constructor(
    public minX: number,
    public minY: number,
    public maxX: number,
    public maxY: number,
  ) {}

  static Rect(aabb: AABB): IRectWithCenter {
    return {
      x: aabb.minX,
      y: aabb.minY,
      width: aabb.maxX - aabb.minX,
      height: aabb.maxY - aabb.minY,
      centerX: aabb.minX + (aabb.maxX - aabb.minX) / 2,
      centerY: aabb.minY + (aabb.maxY - aabb.minY) / 2,
    }
  }

  static Collide(one: AABB, another: AABB): boolean {
    return (
      one.minX <= another.maxX &&
      one.maxX >= another.minX &&
      one.minY <= another.maxY &&
      one.maxY >= another.minY
    )
  }

  static Include(one: AABB, another: AABB) {
    let result = 1
    let [large, small] = [one, another]
    if (one.maxX - one.minX < another.maxX - another.minX) {
      result = 0
      large = another
      small = one
    }
    const included =
      large.minX <= small.minX &&
      large.maxX >= small.maxX &&
      large.minY <= small.minY &&
      large.maxY >= small.maxY
    return included ? result : -1
  }

  static Expand(
    aabb: AABB,
    ...expands: [number] | [number, number, number, number]
  ): AABB {
    const { minX, minY, maxX, maxY } = aabb
    if (expands.length === 1) {
      const expand = expands[0]
      return new AABB(minX - expand, minY - expand, maxX + expand, maxY + expand)
    } else {
      return new AABB(
        minX - expands[0],
        minY - expands[1],
        maxX + expands[2],
        maxY + expands[3],
      )
    }
  }

  static Merge(...aabbList: AABB[]) {
    let [xMin, yMin, xMax, yMax] = [Infinity, Infinity, -Infinity, -Infinity]
    aabbList.forEach((aabb) => {
      xMin = min(xMin, aabb.minX)
      yMin = min(yMin, aabb.minY)
      xMax = max(xMax, aabb.maxX)
      yMax = max(yMax, aabb.maxY)
    })
    return new AABB(xMin, yMin, xMax, yMax)
  }

  static FromOBB(obb: OBB) {
    const width = obb.projectionLengthAt(xy_(1, 0))
    const height = obb.projectionLengthAt(xy_(0, 1))
    return new AABB(
      obb.center.x - width / 2,
      obb.center.y - height / 2,
      obb.center.x + width / 2,
      obb.center.y + height / 2,
    )
  }
}
