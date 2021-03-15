import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToMessage } from '@nodetron/types/control/moveTo'
import Strategies from '@nodetron/types/task-manager/tasks/strategies'
import { Kick } from '@nodetron/types/enum'

import { state } from '../../models/state'

/**
 * call "MSB.TestShoot" '{ "id" : 5, "goalId" : 1}'
 */
export default class TestShoot extends Strategies {
  name = 'testShoot';

  public constructor(public id: number, public goalId: number) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      id: {
        type: 'number', min: 0, max: 15,
      },
      // 0 = left side / 1 = right side
      goalId: {
        type: 'number', min: 0, max: 1,
      }
    },
    handler(ctx: Context<{ id: number , goalId: number}>): void {
      state.assign.register([ctx.params.id, ctx.params.goalId], new TestShoot(ctx.params.id, ctx.params.goalId))
    },
  }

  compute(broker: ServiceBroker): boolean {

    // just to have them near
    state.world.ball.position;
    state.world.robots.allies[this.id].position;

    let halfFieldSize: number = state.world.field.length / 2;
 
    let goalPos: {x: number, y: number} = {x: this.goalId == 1 ? - halfFieldSize : halfFieldSize, y: 0};

    let shootPos: {x: number, y: number} = state.world.ball.position;  // is a shift needed ?

    let epsilon: number = 0.1;

    let isDone: boolean = false;

    let shootAngle: number = Math.atan2(shootPos.y - goalPos.y, shootPos.x - goalPos.x); // to do

    let dstToBall = Math.sqrt((shootPos.x - state.world.robots.allies[this.id].position.x) ** 2 + (shootPos.y - state.world.robots.allies[this.id].position.y) ** 2);

    console.log(shootAngle);

    if (dstToBall > epsilon){
      void broker.call('control.moveTo', {
        id: this.id,
        target: shootPos,
        orientation: shootAngle, // shootAngle,
        kick: Kick.NO,
      } as MoveToMessage)

    } else {
      void broker.call('control.moveTo', {
        id: this.id,
        target: shootPos,
        orientation: shootAngle, // shootAngle,  
        kick: Kick.FLAT,
        power: 1,
      } as MoveToMessage)

      console.log("Shooting!");

      isDone = true;
    }

    return isDone;
  }
}
