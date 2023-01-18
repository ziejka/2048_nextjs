import { Field } from './Field'
import { Movable } from './Movable'

type GroupedField = Field[][]

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export class Board {
  private readonly _fields: Field[]
  private _boardSize: number
  private _movable: Movable
  public _fieldsByColumn: GroupedField
  public _fieldsByColumnReversed: GroupedField
  public _fieldsByRow: GroupedField
  public _fieldsByRowReversed: GroupedField
  private _isMoving: boolean = false

  constructor(boardSize: number) {
    this._boardSize = boardSize
    this._fields = this.generateFields(boardSize)
    this._fieldsByColumn = this.getFieldsByColumn()
    this._fieldsByColumnReversed = this.getReversed(this._fieldsByColumn)
    this._fieldsByRow = this.getFieldsByRow()
    this._fieldsByRowReversed = this.getReversed(this._fieldsByRow)

    this._movable = new Movable()
  }

  get fields(): Field[] {
    return this._fields
  }

  step(direction: Direction): void {
    if (this._isMoving) {
      return
    }
    this.move(direction)
    this._isMoving = this.hasMoved()
  }

  hasMoved(): boolean {
    return this._fields.some((field) => field.moveTo !== null)
  }

  update(): boolean {
    if (!this._isMoving) {
      return this.canMove()
    }
    this.spawnValue()
    this.fields.forEach((f) => f.update())
    this._isMoving = false

    return this.canMove()
  }

  move(direction: Direction): void {
    switch (direction) {
      case Direction.UP:
        this._movable.move(this._fieldsByColumn)
        break
      case Direction.DOWN:
        this._movable.move(this._fieldsByColumnReversed)
        break
      case Direction.LEFT:
        this._movable.move(this._fieldsByRow)
        break
      case Direction.RIGHT:
        this._movable.move(this._fieldsByRowReversed)
        break
      default:
        return
    }
  }

  restart(): void {
    this._fields.forEach((f) => f.clear())
    this.spawnValue()
    this.fields.forEach((f) => f.update())
    this._isMoving = false
  }

  spawnValue(): void {
    if (!this.hasEmptyField()) return
    const emptyFields = this.getEmptyFields()
    const idx = Math.round(Math.random() * (emptyFields.length - 1))
    emptyFields[idx].spawn()
  }

  private hasEmptyField(): boolean {
    return this.getEmptyFields().length > 0
  }

  private generateFields(boardSize: number): Field[] {
    const fields: Field[] = []
    for (let i = 0; i < Math.pow(boardSize, 2); i++) {
      const xPos = i % boardSize
      const yPos = Math.floor(i / boardSize)
      fields.push(new Field(xPos, yPos))
    }
    return fields
  }

  private getEmptyFields(): Field[] {
    return this._fields.filter((filed) => filed.isEmpty())
  }

  private getFieldsByColumn(): GroupedField {
    return this._fields.reduce((grouped, field) => {
      if (!grouped[field.coordinates.x]) {
        grouped[field.coordinates.x] = []
      }
      grouped[field.coordinates.x][field.coordinates.y] = field
      return grouped
    }, [] as GroupedField)
  }

  private getFieldsByRow() {
    return this._fields.reduce((grouped, field) => {
      if (!grouped[field.coordinates.y]) {
        grouped[field.coordinates.y] = []
      }
      grouped[field.coordinates.y][field.coordinates.x] = field
      return grouped
    }, [] as GroupedField)
  }

  private getReversed(grouped: GroupedField) {
    return grouped.map((arr) => [...arr].reverse())
  }

  private canMove(): boolean {
    return (
      this.hasEmptyField() ||
      [
        this._fieldsByColumn,
        this._fieldsByColumnReversed,
        this._fieldsByRow,
        this._fieldsByRowReversed
      ].some(this._movable.canMove)
    )
  }
}
