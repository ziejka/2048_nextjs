import React from 'react'
import { Provider } from 'inversify-react'
import { Container } from 'inversify'
import { BoardLogic, UseBoard } from '../hooks/UseBoard'
import Game from '../components/Game'
import { useBoardOffline } from '../hooks/useBoardOffline'

const container = new Container()
container.bind<UseBoard>(BoardLogic).toFunction(useBoardOffline)

export default function () {
  return (
    <Provider container={container}>
      <Game title="Offline game" />
    </Provider>
  )
}
