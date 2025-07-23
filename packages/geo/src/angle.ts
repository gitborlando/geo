export const { PI, cos, sin, tan, acos, asin, atan, atan2 } = Math

export class Angle {
  static Cos(angle: number) {
    return cos(Angle.RadianFy(angle))
  }

  static Sin(angle: number) {
    return sin(Angle.RadianFy(angle))
  }

  static Tan(angle: number) {
    return tan(Angle.RadianFy(angle))
  }

  static ACos(angle: number) {
    return Angle.AngleFy(acos(Angle.RadianFy(angle)))
  }

  static ASin(angle: number) {
    return Angle.AngleFy(asin(Angle.RadianFy(angle)))
  }

  static ATan(angle: number) {
    return Angle.AngleFy(atan(Angle.RadianFy(angle)))
  }

  static ATan2(y: number, x: number) {
    return Angle.AngleFy(atan2(y, x))
  }

  static AngleFy(radians: number) {
    return radians * (180 / Math.PI)
  }

  static RadianFy(angle: number) {
    return angle * (Math.PI / 180)
  }

  static Normal(angle: number) {
    return (angle + 360) % 360
  }

  static Snap(angle: number, step = 90) {
    return Angle.Normal(Math.round(angle / step) * step)
  }

  static RotatePoint(ax: number, ay: number, ox: number, oy: number, angle: number) {
    const radian = Angle.RadianFy(angle)
    return {
      x: (ax - ox) * cos(radian) - (ay - oy) * sin(radian) + ox,
      y: (ax - ox) * sin(radian) + (ay - oy) * cos(radian) + oy,
    }
  }
}
