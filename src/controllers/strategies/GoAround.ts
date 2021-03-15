import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToMessage } from '@nodetron/types/control/moveTo'
import Strategies from '@nodetron/types/task-manager/tasks/strategies'

import { state } from '../../models/state'


/**
 * call "MSB.GoAround" '{ "robots_amount" : 5, "opponent_id" : 0, "radius" : 1}'
 */
export default class GoAround extends Strategies {
  name = 'GoAround';

  public constructor(public robots_amount: number, public opponent_id:number, public radius: number) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      robots_amount: {
        type: 'number', min: 1, max: 10,
      },
      opponent_id: {
        type: 'number', min: 0, max: 15,
      },
      radius: {
        type: 'number', min: 0.1, max: 10,
      },
    },
    handler(ctx: Context<{robots_amount: number, opponent_id: number, radius: number}>): void {

        state.assign.register([ctx.params.robots_amount, ctx.params.opponent_id, ctx.params.radius], 
            new GoAround(ctx.params.robots_amount, ctx.params.opponent_id, ctx.params.radius))
    },
  }

  compute(broker: ServiceBroker): boolean {

      for (let i = 0; i < this.robots_amount; i++){
        void broker.call('control.moveTo', {
            id: i,
            target: {x: Math.cos(2 * Math.PI / this.robots_amount * i) * this.radius + state.world.robots.opponents[this.opponent_id].position.x, 
                y: Math.sin(2 * Math.PI / this.robots_amount * i) * this.radius + state.world.robots.opponents[this.opponent_id].position.y},
            orientation: 0,
        } as MoveToMessage)
    }

    return true
  }
}