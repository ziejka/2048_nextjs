import { Field } from './Field'
import { Board } from './Board'

export function getField(value: 0 | 2 | 4) {
  const field = new Field(0, 0)
  if (value >= 2) {
    field.spawn()
  }
  if (value >= 4) {
    field.add(field)
    field.update()
  }
  return field
}

export function getFieldAt(
  board: Board,
  x: number,
  y: number
): Field | undefined {
  return board.fields.find(
    (f) => f.coordinates.x === x && f.coordinates.y === y
  )
}
