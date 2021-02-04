import { ServiceBroker } from 'moleculer'

import { state } from '../../models/state'
import { Manager } from '../manager'

export default class OpenManager implements Manager {
  update(broker: ServiceBroker) : void {
    state.assign.computeAll(broker)
  }
}
