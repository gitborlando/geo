import { AABB } from './aabb'
import { Angle } from './angle'
import { IRect, IXY } from './types'
import { XY } from './xy'

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
    this.aabb = AABB.fromOBB(this)
  }

  get xy() {
    return XY.$(this.x, this.y)
  }

  #calcCenter = () => {
    const center = XY.center(this)
    return center.rotate(this.xy, this.rotation)
  }

  #calcAxis = () => {
    const { cos, sin } = Angle.cosSin(this.rotation)
    const widthAxis = XY.$(cos, -sin)
    const heightAxis = XY.$(sin, cos)
    return (this.axis = { widthAxis, heightAxis })
  }

  calcVertexXY = () => {
    const cos = Angle.cos(this.rotation)
    const sin = Angle.sin(this.rotation)
    const cosWidth = cos * this.width
    const sinWidth = sin * this.width
    const cosHeight = cos * this.height
    const sinHeight = sin * this.height
    const TL = XY.$(this.x, this.y)
    const TR = XY.$(this.x + cosWidth, this.y + sinWidth)
    const BR = XY.$(this.x + cosWidth - sinHeight, this.y + sinWidth + cosHeight)
    const BL = XY.$(this.x - sinHeight, this.y + cosHeight)
    return (this.vertexes = [TL, TR, BR, BL])
  }

  clone = () => {
    return new OBB(this.x, this.y, this.width, this.height, this.rotation)
  }

  projectAt = (anotherAxis: IXY) => {
    const { widthAxis, heightAxis } = this.axis
    return (
      Math.abs(XY.dot(widthAxis, anotherAxis)) * this.width +
      Math.abs(XY.dot(heightAxis, anotherAxis)) * this.height
    )
  }

  collide = (another: OBB) => {
    const centerVector = XY.vector(this.center, another.center)
    if (
      this.projectAt(another.axis.widthAxis) + another.width <=
      2 * Math.abs(XY.dot(centerVector, another.axis.widthAxis))
    )
      return false
    if (
      this.projectAt(another.axis.heightAxis) + another.height <=
      2 * Math.abs(XY.dot(centerVector, another.axis.heightAxis))
    )
      return false
    if (
      another.projectAt(this.axis.widthAxis) + this.width <=
      2 * Math.abs(XY.dot(centerVector, this.axis.widthAxis))
    )
      return false
    if (
      another.projectAt(this.axis.heightAxis) + this.height <=
      2 * Math.abs(XY.dot(centerVector, this.axis.heightAxis))
    )
      return false
    return true
  }

  static identityOBB() {
    return new OBB(0, 0, 0, 0, 0)
  }

  static fromRect(rect: IRect, rotation = 0): OBB {
    const { x, y, width, height } = rect
    return new OBB(x, y, width, height, rotation)
  }

  static fromCenter(center: IXY, width: number, height: number, rotation = 0) {
    const dx = center.x - width / 2
    const dy = center.y - height / 2
    const xy = XY.from(dx, dy).rotate(center, rotation)
    return new OBB(xy.x, xy.y, width, height, rotation)
  }

  static fromAABB(aabb: AABB): OBB {
    const { minX, minY, maxX, maxY } = aabb
    return new OBB(minX, minY, maxX - minX, maxY - minY, 0)
  }
}
