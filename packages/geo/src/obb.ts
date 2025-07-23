import { AABB } from './aabb'
import { Angle } from './angle'
import { IRect, IXY } from './types'
import { xy_, xy_dot, xy_minus, xy_rotate } from './xy'

type IAxis = { widthAxis: IXY; heightAxis: IXY }

export class OBB {
  center: IXY
  axis: IAxis
  aabb: AABB
  vertexes: [IXY, IXY, IXY, IXY]

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public rotation: number,
  ) {
    this.center = this.#calcCenter()
    this.axis = this.#calcAxis()
    this.vertexes = this.calcVertexXY()
    this.aabb = AABB.FromOBB(this)
  }

  get xy() {
    return xy_(this.x, this.y)
  }

  #calcCenter = () => {
    const center = xy_(this.x + this.width / 2, this.y + this.height / 2)
    return xy_rotate(center, xy_(this.x, this.y), this.rotation)
  }

  #calcAxis = () => {
    const cos = Angle.Cos(this.rotation)
    const sin = Angle.Sin(this.rotation)
    const widthAxis = xy_(cos, -sin)
    const heightAxis = xy_(sin, cos)
    return (this.axis = { widthAxis, heightAxis })
  }

  calcVertexXY = () => {
    const cos = Angle.Cos(this.rotation)
    const sin = Angle.Sin(this.rotation)
    const cosWidth = cos * this.width
    const sinWidth = sin * this.width
    const cosHeight = cos * this.height
    const sinHeight = sin * this.height
    const TL = xy_(this.x, this.y)
    const TR = xy_(this.x + cosWidth, this.y + sinWidth)
    const BR = xy_(this.x + cosWidth - sinHeight, this.y + sinWidth + cosHeight)
    const BL = xy_(this.x - sinHeight, this.y + cosHeight)
    return (this.vertexes = [TL, TR, BR, BL])
  }

  clone = () => {
    return new OBB(this.x, this.y, this.width, this.height, this.rotation)
  }

  projectionLengthAt = (anotherAxis: IXY) => {
    const { widthAxis, heightAxis } = this.axis
    return (
      Math.abs(xy_dot(widthAxis, anotherAxis)) * this.width +
      Math.abs(xy_dot(heightAxis, anotherAxis)) * this.height
    )
  }

  collide = (another: OBB) => {
    const centerVector = xy_minus(this.center, another.center)
    if (
      this.projectionLengthAt(another.axis.widthAxis) + another.width <=
      2 * Math.abs(xy_dot(centerVector, another.axis.widthAxis))
    )
      return false
    if (
      this.projectionLengthAt(another.axis.heightAxis) + another.height <=
      2 * Math.abs(xy_dot(centerVector, another.axis.heightAxis))
    )
      return false
    if (
      another.projectionLengthAt(this.axis.widthAxis) + this.width <=
      2 * Math.abs(xy_dot(centerVector, this.axis.widthAxis))
    )
      return false
    if (
      another.projectionLengthAt(this.axis.heightAxis) + this.height <=
      2 * Math.abs(xy_dot(centerVector, this.axis.heightAxis))
    )
      return false
    return true
  }

  static IdentityOBB() {
    return new OBB(0, 0, 0, 0, 0)
  }

  static FromRect(rect: IRect, rotation = 0): OBB {
    const { x, y, width, height } = rect
    return new OBB(x, y, width, height, rotation)
  }

  static FromAABB(aabb: AABB): OBB {
    const { minX, minY, maxX, maxY } = aabb
    return new OBB(minX, minY, maxX - minX, maxY - minY, 0)
  }
}
