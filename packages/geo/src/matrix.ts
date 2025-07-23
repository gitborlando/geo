import { AABB } from './aabb'
import { max, min } from './math'
import { IXY } from './types'
import { xy_ } from './xy'

export type IMatrix = [number, number, number, number, number, number]

export class Matrix {
  static Create() {
    return [1, 0, 0, 1, 0, 0] as IMatrix
  }

  static Invert(matrix: IMatrix) {
    const [a, b, c, d, e, f] = matrix
    const invDet = 1 / (a * d - b * c)
    return [d, -b, -c, a, c * f - d * e, b * e - a * f].map(
      (i) => i * invDet,
    ) as IMatrix
  }

  static ApplyPoint(xy: IXY, matrix: IMatrix) {
    const { x, y } = xy
    const [a, b, c, d, e, f] = matrix
    return xy_(a * x + c * y + e, b * x + d * y + f)
  }

  static ApplyAABB(aabb: AABB, matrix: IMatrix) {
    const { minX, minY, maxX, maxY } = aabb
    const xy1 = Matrix.ApplyPoint(xy_(minX, minY), matrix)
    const xy2 = Matrix.ApplyPoint(xy_(maxX, minY), matrix)
    const xy3 = Matrix.ApplyPoint(xy_(maxX, maxY), matrix)
    const xy4 = Matrix.ApplyPoint(xy_(minX, maxY), matrix)
    return {
      minX: min(xy1.x, xy2.x, xy3.x, xy4.x),
      minY: min(xy1.y, xy2.y, xy3.y, xy4.y),
      maxX: max(xy1.x, xy2.x, xy3.x, xy4.x),
      maxY: max(xy1.y, xy2.y, xy3.y, xy4.y),
    }
  }

  static InvertPoint(xy: IXY, matrix: IMatrix) {
    return Matrix.ApplyPoint(xy, Matrix.Invert(matrix))
  }

  static InvertAABB(aabb: AABB, matrix: IMatrix) {
    return Matrix.ApplyAABB(aabb, Matrix.Invert(matrix))
  }
}
