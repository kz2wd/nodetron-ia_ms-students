import Config from '../../Config'
import { Manager } from '../manager'

import DummyManager from './Dummy'
import OpenManager from './open'

let stateMachine: Manager | undefined

export default ((): Manager => {
  if (!stateMachine) {
    if (Config.manager.name === 'dummy') {
      stateMachine = new DummyManager()
    } else if (Config.manager.name === 'open') {
      stateMachine = new OpenManager()
    } else {
      stateMachine = new OpenManager()
    }
  }
  return stateMachine
})()
