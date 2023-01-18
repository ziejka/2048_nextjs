import { useCallback, useMemo, useState } from 'react'
import { Board, Direction } from '../models/Board'
import { Field } from '../models/Field'
import { UseBoard } from './UseBoard'

export const useBoardOffline: UseBoard = (gridSize: number) => {
  const board = useMemo(() => new Board(gridSize), [gridSize])
  const [fields, setFields] = useState<Field[]>(board.fields)
  const [gameOver, setGameOver] = useState<boolean>(false)

  const onReset = useCallback(() => {
    board.restart()
    setFields([...board.fields])
    setGameOver(false)
  }, [])

  const onUpdate = useCallback(() => {
    const canMove = board.update()
    setFields([...board.fields])
    !canMove && setGameOver(true)
  }, [])

  const onMove = useCallback((dir: Direction) => {
    board.step(dir)
    setFields([...board.fields])
  }, [])

  return {
    fields,
    onReset,
    onUpdate,
    onMove,
    gameOver
  }
}
