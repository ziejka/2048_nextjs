import { Movable } from './Movable'
import { Field } from './Field'
import { getField } from './testHelpers.spec'

describe('Movable', () => {
  it('should move', () => {
    const movable = new Movable()
    const given: Field[][] = [
      [getField(0), getField(2), getField(2), getField(2)],
      [getField(0), getField(0), getField(2)],
      [getField(0), getField(2), getField(4)],
      [getField(4), getField(0), getField(4)],
      [getField(4), getField(0), getField(4)],
    ]

    movable.move(given)

    const expected = [
      [4, 2, 0, 0],
      [2, 0, 0],
      [2, 4, 0],
      [8, 0, 0],
      [8, 0, 0],
    ]

    const received = given.map((group) => group.map((f) => f.value))

    expect(received).toEqual(expected)
  })
})
