import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@nodetron/types/internal/control/packet'
import Strategies from '@nodetron/types/internal/task-manager/tasks/strategies'

import { state } from '../../models/GameState'

export default class Template extends Strategies {
  name = 'template';

  public constructor(public id: number) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      id: {
        type: 'number', min: 0, max: 15,
      },
    },
    handler(ctx: Context<{ id: number }>): void {
      state.assign.register([ctx.params.id], new Template(ctx.params.id))
    },
  }

  compute(broker: ServiceBroker): boolean {
    broker.logger.debug(state.data.ball)

    void broker.call('control.moveTo', {
      id: this.id,
      target: { x: 0, y: 0 },
      orientation: 0,
      expectedReachTime: 1,
    } as MoveToPacket)

    return false
  }
}
