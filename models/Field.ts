export type Coordinates = { x: number; y: number }

export class Field {
  private readonly _id: string
  private readonly _coordinates: Coordinates
  private _value: number = 0
  private _displayedValue: number = 0
  private _moveTo: Coordinates | null
  private _merged: boolean = false

  constructor(x: number, y: number) {
    this._coordinates = { x, y }
    this._id = `${x}${y}`
    this._moveTo = null
  }

  get displayedValue(): number {
    return this._displayedValue
  }

  get moveTo(): Coordinates | null {
    return this._moveTo
  }

  get id(): string {
    return this._id
  }

  get coordinates(): Coordinates {
    return this._coordinates
  }

  get value(): number {
    return this._value
  }

  spawn(): void {
    this._value = 2
  }

  isEmpty(): boolean {
    return this._value === 0
  }

  clear(): void {
    this._value = 0
  }

  canAdd(field: Field): boolean {
    return this.isEmpty() || (!this._merged && this.value === field.value)
  }

  add(field: Field): void {
    if (!this.isEmpty()) {
      this._merged = true
    }
    field.setMoveTo(this.coordinates)
    this._value += field.value
  }

  update(): void {
    this._moveTo = null
    this._merged = false
    this._displayedValue = this.value
  }

  setMoveTo(moveTo: Coordinates) {
    this._moveTo = moveTo
  }
}
