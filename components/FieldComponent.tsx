import React, { useCallback } from 'react'
import { Field } from '../models/Field'

function getStyle(field: Field) {
  const COLORS = [
    '#5D6C89',
    '#465572',
    '#35476b',
    '#1b315b',
    '#36D6E7',
    '#23b6c5',
    '#17a3b2',
    '#1696a8',
    '#FEB06A',
    '#e39854',
    '#cd803b',
    '#a15a1a'
  ]

  const getBg = useCallback(
    (value: number) => (value ? COLORS[Math.log2(value)] : COLORS[0]),
    []
  )

  const getGetTransformValue = useCallback((field: Field) => {
    if (!field.moveTo) {
      return 'translateX(0)'
    }

    const xDiff = field.moveTo.x - field.coordinates.x
    const yDiff = field.moveTo.y - field.coordinates.y

    return xDiff !== 0
      ? `translateX(${6 * xDiff + xDiff * 0.25}rem)`
      : yDiff !== 0
      ? `translateY(${6 * yDiff + yDiff * 0.25}rem)`
      : 'translateX(0)'
  }, [])

  const bg = {
    backgroundColor: getBg(field.displayedValue)
  }
  const transform = field.moveTo
    ? {
        transform: getGetTransformValue(field),
        transitionProperty: 'transform',
        transitionDuration: '.25s',
        zIndex: 100
      }
    : {}
  Object.assign(bg, transform)

  return bg
}

type PropTypes = {
  field: Field
}

export const FieldComponent: React.FC<PropTypes> = ({ field }) => (
  <div className="relative w-24 h-24">
    <div
      className={`w-24 h-24 flex items-center justify-center font-bold text-2xl rounded-xl z-1 absolute z-10
              ease-in-expo text-slate-50`}
      style={getStyle(field)}
    >
      {!!field.displayedValue && field.displayedValue}
    </div>
    <div className="w-24 h-24 rounded-xl bg-base absolute top-0 left-0 z-0" />
  </div>
)
