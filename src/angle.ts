import { IXY } from './types'
import { XY } from './xy'

export class Angle {
  static cos(angle: number) {
    return Math.cos(Angle.radianFy(angle))
  }

  static sin(angle: number) {
    return Math.sin(Angle.radianFy(angle))
  }

  static cosSin(angle: number) {
    const radians = Angle.radianFy(angle)
    return { cos: Math.cos(radians), sin: Math.sin(radians) }
  }

  static tan(angle: number) {
    return Math.tan(Angle.radianFy(angle))
  }

  static atan2(y: number, x: number) {
    return Angle.angleFy(Math.atan2(y, x))
  }

  static angleFy(radians: number) {
    return radians * (180 / Math.PI)
  }

  static radianFy(angle: number) {
    return angle * (Math.PI / 180)
  }

  static normal(angle: number) {
    return ((angle % 360) + 360) % 360
  }

  static minor(angle: number) {
    return Math.min(angle, 360 - angle)
  }

  static snap(angle: number, step = 90) {
    return Angle.normal(Math.round(angle / step) * step)
  }

  static sweep(v1: IXY, v2: IXY = XY.xAxis(), clockwise = false) {
    const dot = v1.x * v2.x + v1.y * v2.y
    const det = v1.x * v2.y - v1.y * v2.x
    return Angle.normal(Angle.atan2(det, dot) * (clockwise ? 1 : -1))
  }
}
