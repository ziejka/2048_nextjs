// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import { Server, Socket } from 'socket.io'
import { Board, Direction } from '../../models/Board'
import { Field } from '../../models/Field'
import { SocketEvents } from '../../socket/SocketEvents'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

function mapToPayload(field: Field) {
  return {
    displayedValue: field.displayedValue,
    moveTo: field.moveTo,
    id: field.id,
    coordinates: field.coordinates,
    value: field.value
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  const onConnection = (socket: Socket) => {
    let board: Board

    const emmitFields = () =>
      socket.emit(SocketEvents.FIELDS, board?.fields.map(mapToPayload))

    socket.on(SocketEvents.INIT, ({ gridSize }: { gridSize: string }) => {
      const gs = parseInt(gridSize)
      board = new Board(gs)
      board.restart()

      emmitFields()
    })

    socket.on(SocketEvents.STEP, ({ dir }: { dir: Direction }) => {
      board?.step(dir)
      emmitFields()
    })

    socket.on(SocketEvents.UPDATE, () => {
      const canMove = board?.update()
      emmitFields()
      !canMove && socket.emit(SocketEvents.GAME_OVER)
    })

    socket.on(SocketEvents.RESET, () => {
      board?.restart()
      emmitFields()
    })
  }

  io.on(SocketEvents.CONNECTION, onConnection)
  res.end()
}
