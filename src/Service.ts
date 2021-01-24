/* eslint-disable object-shorthand */
import {
  Context,
  Service,
  ServiceBroker,
} from 'moleculer'
import { World } from '@nodetron/util/world'
import { WorldMessage } from '@nodetron/types/world'

import strategiesSet from './controllers/strategies/index'
import Config from './Config'
import manager from './controllers/managers'
import { state } from './models/GameState'

export default class GameDataService extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker)
    this.parseServiceSchema({
      name: Config.name,
      dependencies: ['world'],
      actions: strategiesSet,
      events: {
        'world.state'(ctx: Context<WorldMessage>): void {
          state.world = new World(ctx.params)
          manager.update(broker)
          state.assign.computeAll(broker)
        },
      },
    })
  }
}
