/* eslint-disable object-shorthand */
import {
  Context,
  Service,
  ServiceBroker,
} from 'moleculer'
import { Data } from '@nodetron/util/data'
import { DataMessage } from '@nodetron/types/data'

import strategiesSet from './controllers/strategies/index'
import Config from './Config'
import manager from './controllers/managers'
import { state } from './models/GameState'

export default class GameDataService extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker)
    this.parseServiceSchema({
      name: Config.name,
      dependencies: ['data'],
      actions: strategiesSet,
      events: {
        'data.state'(ctx: Context<DataMessage>): void {
          state.data = new Data(ctx.params)
          manager.update(broker)
          state.assign.computeAll(broker)
        },
      },
    })
  }
}
