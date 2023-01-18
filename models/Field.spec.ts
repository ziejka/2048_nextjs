import { Field } from './Field'
import { getField } from './testHelpers.spec'

describe('Field', () => {
  it('can update value', () => {
    const field = new Field(0, 0)
    field.spawn()

    expect(field.value).toEqual(2)
  })

  it('should check if has value', () => {
    const field = new Field(0, 0)

    expect(field.isEmpty()).toBeTruthy()

    field.spawn()

    expect(field.isEmpty()).toBeFalsy()
  })

  it('should clear value', () => {
    const field = new Field(0, 0)

    field.spawn()
    expect(field.isEmpty()).toBeFalsy()

    field.clear()
    expect(field.isEmpty()).toBeTruthy()
  })

  it('should add value', () => {
    const field = new Field(0, 0)

    field.spawn()
    field.add(field)
    expect(field.value).toEqual(4)
  })

  it.each`
    canAdd   | baseField      | movedField     | name
    ${true}  | ${getField(0)} | ${getField(2)} | ${'empty'}
    ${true}  | ${getField(2)} | ${getField(2)} | ${'same values'}
    ${false} | ${getField(2)} | ${getField(4)} | ${'different values'}
  `(
    'should return canAdd if $name for canAccept',
    ({ baseField, movedField, canAdd }) => {
      expect(baseField.canAdd(movedField)).toEqual(canAdd)
    }
  )
})
