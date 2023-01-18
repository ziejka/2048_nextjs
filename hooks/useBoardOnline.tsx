import { useCallback, useEffect, useState } from 'react'
import { Direction } from '../models/Board'
import { Field } from '../models/Field'
import { UseBoard } from './UseBoard'
import io, { Socket } from 'socket.io-client'
import { SocketEvents } from '../socket/SocketEvents'

let socket: Socket

export const useBoardOnline: UseBoard = (gridSize: number) => {
  const [fields, setFields] = useState<Field[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)

  const socketInitializer = async () => {
    socket?.close()
    await fetch(`/api/socket`)
    socket = io()

    socket.on(SocketEvents.FIELDS, (payload: Field[]) => {
      setFields(payload)
    })

    socket.on(SocketEvents.GAME_OVER, () => {
      setGameOver(true)
    })

    socket?.emit(SocketEvents.INIT, { gridSize })
  }
  useEffect(() => {
    socketInitializer().then((_) => {})
  }, [])

  const onReset = useCallback(() => {
    setGameOver(false)
    socket?.emit(SocketEvents.RESET)
  }, [])

  const onUpdate = useCallback(() => {
    socket?.emit(SocketEvents.UPDATE)
  }, [])

  const onMove = useCallback((dir: Direction) => {
    socket?.emit(SocketEvents.STEP, { dir })
  }, [])

  return {
    fields,
    onReset,
    onUpdate,
    onMove,
    gameOver
  }
}
