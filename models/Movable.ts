import { Field } from './Field'

export class Movable {
  move(groupedFields: Field[][]): void {
    groupedFields.forEach((group) => {
      for (let i = 1; i < group.length; i++) {
        const field = group[i]
        if (field.isEmpty()) continue

        let lastValid: Field | null = null
        for (let j = i - 1; j >= 0; j--) {
          const moveTo = group[j]

          if (!moveTo.canAdd(field)) break
          lastValid = moveTo
        }
        if (lastValid === null) continue
        lastValid.add(field)
        field.clear()
      }
    })
  }

  canMove(groupedFields: Field[][]): boolean {
    return groupedFields.some((group) =>
      group.some((f, i) => {
        if (i === 0) return false
        if (f.value === 0) return false
        const moveTo = group[i - 1]
        return moveTo.canAdd(f)
      })
    )
  }
}
