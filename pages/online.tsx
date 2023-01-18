import React from 'react'
import { Provider } from 'inversify-react'
import { Container } from 'inversify'
import { BoardLogic, UseBoard } from '../hooks/UseBoard'
import Game from '../components/Game'
import { useBoardOnline } from '../hooks/useBoardOnline'

const container = new Container()
container.bind<UseBoard>(BoardLogic).toFunction(useBoardOnline)

export default function () {
  return (
    <Provider container={container}>
      <Game title="Online game" />
    </Provider>
  )
}
