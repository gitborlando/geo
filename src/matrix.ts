import { AABB } from './aabb'
import { max, min } from './math'
import { IXY } from './types'
import { xy_ } from './xy'

export type IMatrix = [number, number, number, number, number, number]

export class Matrix {
  static create() {
    return [1, 0, 0, 1, 0, 0] as IMatrix
  }

  static invert(matrix: IMatrix) {
    const [a, b, c, d, e, f] = matrix
    const invDet = 1 / (a * d - b * c)
    return [d, -b, -c, a, c * f - d * e, b * e - a * f].map(
      (i) => i * invDet,
    ) as IMatrix
  }

  static applyPoint(xy: IXY, matrix: IMatrix) {
    const { x, y } = xy
    const [a, b, c, d, e, f] = matrix
    return xy_(a * x + c * y + e, b * x + d * y + f)
  }

  static applyAABB(aabb: AABB, matrix: IMatrix) {
    const { minX, minY, maxX, maxY } = aabb
    const xy1 = Matrix.applyPoint(xy_(minX, minY), matrix)
    const xy2 = Matrix.applyPoint(xy_(maxX, minY), matrix)
    const xy3 = Matrix.applyPoint(xy_(maxX, maxY), matrix)
    const xy4 = Matrix.applyPoint(xy_(minX, maxY), matrix)
    return {
      minX: min(xy1.x, xy2.x, xy3.x, xy4.x),
      minY: min(xy1.y, xy2.y, xy3.y, xy4.y),
      maxX: max(xy1.x, xy2.x, xy3.x, xy4.x),
      maxY: max(xy1.y, xy2.y, xy3.y, xy4.y),
    }
  }

  static invertPoint(xy: IXY, matrix: IMatrix) {
    return Matrix.applyPoint(xy, Matrix.invert(matrix))
  }

  static invertAABB(aabb: AABB, matrix: IMatrix) {
    return Matrix.applyAABB(aabb, Matrix.invert(matrix))
  }
}
