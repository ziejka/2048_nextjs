import { Board, Direction } from './Board'
import { Field } from './Field'
import { getFieldAt } from './testHelpers.spec'

const getCellsWithValue = (fields: Field[]) =>
  fields.filter((field) => !field.isEmpty())

describe('Board', function () {
  it('creates board with given size and proper coordinates', () => {
    const board = new Board(4)

    expect(board.fields.length).toEqual(16)

    expect(board.fields[0].coordinates.x).toEqual(0)
    expect(board.fields[0].coordinates.y).toEqual(0)

    expect(board.fields[15].coordinates.x).toEqual(3)
    expect(board.fields[15].coordinates.y).toEqual(3)

    expect(board.fields[15].coordinates.x).toEqual(3)
    expect(board.fields[15].coordinates.y).toEqual(3)

    expect(board.fields[6].coordinates.x).toEqual(2)
    expect(board.fields[6].coordinates.y).toEqual(1)
  })

  it('spawns random field value', () => {
    const board = new Board(4)

    expect(getCellsWithValue(board.fields).length).toEqual(0)

    board.spawnValue()

    expect(getCellsWithValue(board.fields).length).toEqual(1)
  })

  it('do not spawn value if all cells has value', () => {
    const boardSize = 2
    const board = new Board(boardSize)

    expect(getCellsWithValue(board.fields).length).toEqual(0)

    // try to spawn +1 more filed while it's no more possible
    for (let i = 0; i < boardSize * boardSize + 1; i++) {
      board.spawnValue()
    }

    expect(getCellsWithValue(board.fields).length).toEqual(4)
  })

  it.each`
    direction                            | position
    ${[Direction.UP, Direction.LEFT]}    | ${[0, 0]}
    ${[Direction.UP, Direction.RIGHT]}   | ${[3, 0]}
    ${[Direction.DOWN, Direction.LEFT]}  | ${[0, 3]}
    ${[Direction.DOWN, Direction.RIGHT]} | ${[3, 3]}
  `('moves fields $direction', ({ direction, position }) => {
    const board = new Board(4)
    board.spawnValue()
    let checkedField = getFieldAt(board, ...(position as [number, number]))

    // check first if field on position is empty as we need to move value there
    while (!checkedField?.isEmpty()) {
      board.restart()
      checkedField = getFieldAt(board, ...(position as [number, number]))
    }

    direction.forEach((d: Direction) => board.move(d))

    expect(checkedField.isEmpty()).toBeFalsy()
    expect(checkedField.value).toBeGreaterThanOrEqual(2)
  })
})
