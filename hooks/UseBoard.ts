import { Field } from '../models/Field'
import { Direction } from '../models/Board'

type BoardLogicReturn = {
  fields: Field[]
  gameOver: boolean
  onReset: () => void
  onUpdate: () => void
  onMove: (dir: Direction) => void
}
export type UseBoard = (gridSize: number) => BoardLogicReturn

export const BoardLogic = Symbol('Board')
