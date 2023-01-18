import React, { useCallback, useEffect } from 'react'
import { Direction } from '../models/Board'
import debounce from '../utils/debounce'
import { useInjection } from 'inversify-react'
import { BoardLogic, UseBoard } from './UseBoard'

const keyMap = new Map([
  ['ArrowUp', Direction.UP],
  ['ArrowDown', Direction.DOWN],
  ['ArrowLeft', Direction.LEFT],
  ['ArrowRight', Direction.RIGHT]
])

export function useGameLogic(gridSize: number) {
  const useBoard = useInjection<UseBoard>(BoardLogic)
  const { fields, gameOver, onUpdate, onReset, onMove } = useBoard(gridSize)

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    const dir = keyMap.get(event.code)
    if (dir === undefined) return

    onMove(dir)
  }, [])

  // Debounce to limit update calls
  const debouncedUpdate = useCallback(debounce(onUpdate, 0), [])

  const onTransitionEnded = useCallback((event: TransitionEvent) => {
    if (event.propertyName !== 'transform') return

    debouncedUpdate()
  }, [])

  useEffect(() => {
    onReset()
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('transitionend', onTransitionEnded)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('transitionend', onTransitionEnded)
    }
  }, [])

  return {
    onReset,
    fields,
    gameOver
  }
}
