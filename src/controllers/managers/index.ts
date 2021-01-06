import Config from '../../Config'
import { GameStateMachine } from '../GameStateMachine'

import DummyManager from './Dummy'

let stateMachine: GameStateMachine | undefined

export default ((): GameStateMachine => {
  if (!stateMachine) {
    if (Config.manager.name === 'dummy') {
      stateMachine = new DummyManager()
    } else {
      stateMachine = new DummyManager()
    }
  }
  return stateMachine
})()
