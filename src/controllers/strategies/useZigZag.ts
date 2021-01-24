/* eslint-disable operator-assignment */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { Control } from '@nodetron/types/internal/control'
import { Vector2D } from '@nodetron/types/utils/math'
import Strategies from '@nodetron/types/internal/task-manager/tasks/strategies'

import { state } from '../../models/GameState'

/**
 * It is basic and needs to be improved !
 * call "MSB.useZigZag" '{"id":0}'
 */

export default class UseZigZag extends Strategies {
  name = 'useZigZag';

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
      state.assign.register([ctx.params.id], new UseZigZag(ctx.params.id))
    },
  }

  public Translation(Vecteur:Vector2D, Points:Array <{x:number, y:number}>):Array <{x:number, y:number}> {
    // (P,P')=Vecteur
    // OP'-OP=Vecteur
    // P'.x=Vecteur.x+P.x
    // P'.y=Vecteur.y+P.y
    // console.debug('Translation:Points',Points)
    // var P:Array <{x:number;y:number}>=Array.from(Points)
    const P:Array <{x:number, y:number}> = []
    let i = 0
    while (i < Points.length) {
      // P[i]=Points[i]
      P.push({ x: Points[i].x, y: Points[i].y })
      i++
    }
    // Points[0].x=333
    // P[0].y=666

    //    console.debug('Au milieu de Translation :P:',P)
    //    console.debug('Au milieu de Translation :Points:',Points)

    // console.debug('Translation:P',P)
    for (let j = 0; j < P.length; i++) {
      P[j].x = P[j].x + Vecteur.x
      P[j].y = P[j].y + Vecteur.y
    }
    //    console.debug('A la fin de Translation :P:',P)
    //    console.debug('A la fin de Translation :Points:',Points)
    return P
  }

  compute(broker: ServiceBroker): boolean {
    broker.logger.debug(state.data.ball)
    const robot = state.data.robots.allies[this.id]
    const { orientation } = robot
    broker.logger.info(`${this.name}: id<${this.id.toString()}> orientation<${orientation.toString()}>`)

    let DemiTerrain1:[{x:0, y:-0.5},
      {x:0, y:-3},
      {x:4.5, y:-3},
      {x:4.5, y:-1},
      {x:3.5, y:-1},
      {x:3.5, y:1},
      {x:4.5, y:1},
      {x:4.5, y:3},
      {x:0, y:3},
      {x:0, y:0.5},
    ]
    const DemiTerrain: Array <{x:number, y:number}> = [
      { x: 0, y: -0.5 },
      { x: 0, y: -3 },
      { x: 4.5, y: -3 },
      { x: 4.5, y: -1 },
      { x: 3.5, y: -1 },
      { x: 3.5, y: 1 },
      { x: 4.5, y: 1 },
      { x: 4.5, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 0.5 },
    ]
    const A: Array<Vector2D> = [
      { x: 0, y: 0 },
      { x: 0.75, y: 1.5 },
      { x: 1, y: 0 },
      { x: 0.66, y: 0.33 },
      { x: 0.33, y: 0.33 },
      { x: -0, y: 0 },
    ]
    const N: Array<Vector2D> = [ // un caractère doit prendfre 0.9 m Ici il prend 1
      { x: 0, y: 0 },
      { x: 0, y: 1.5 },
      { x: 1, y: 0 },
      { x: 1, y: 1.5 },
      { x: 0.9, y: 0 },
      { x: -0.1, y: 1 },
      { x: -0, y: 0 },
    ]
    const O: Array<Vector2D> = [ // un caractère doit prendfre 0.9 m Ici il prend 1
      { x: 0, y: 0 },
      { x: 0.5, y: 0 },
      { x: 1, y: 0.2 },
      { x: 1, y: 1.3 },
      { x: 0.5, y: 1.5 },
      { x: 0, y: 1.3 },
      { x: 0, y: 0.2 },
      { x: 0.5, y: 0 },
    ]
    const E: Array<Vector2D> = [ // un caractère doit prendfre 0.9 m Ici il prend 1
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 0.2 },
      { x: 0.1, y: 0.2 },
      { x: 0.2, y: 0.6 },
      { x: 0.8, y: 0.6 },
      { x: 0.8, y: 0.8 },
      { x: 0.1, y: 0.8 },
      { x: 0.1, y: 1.5 },
      { x: 1, y: 1.5 },
      { x: 1, y: 1.7 },
      { x: -0.1, y: 1.7 },
      { x: 0, y: 0 },
    ]
    const B: Array<Vector2D> = [
      { x: 0, y: 0 },
      { x: 0, y: 1.5 },
      { x: 1, y: 1.5 },
      { x: 1, y: 0.8 },
      { x: 0.3, y: 0.7 },
      { x: 1, y: 0.6 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]

    void broker.call('MSB.zigZag', {
      id: 0,
      points: this.Translation({ x: -4.5, y: -3 }, B),
    })
    void broker.call('MSB.zigZag', {
      id: 1,
      points: this.Translation({ x: -3.5, y: -3 }, O),
    })
    void broker.call('MSB.zigZag', {
      id: 2,
      points: this.Translation({ x: -2.5, y: -3 }, N),
    })
    void broker.call('MSB.zigZag', {
      id: 3,
      points: this.Translation({ x: -1.5, y: -3 }, N),
    })
    void broker.call('MSB.zigZag', {
      id: 4,
      points: this.Translation({ x: -0.5, y: -3 }, E),
    })

    const X = this.Translation({ x: -2.5, y: -3 }, N)
    broker.logger.info(`${this.name}: id<${this.id.toString()}> Premier point de la lettre X:<${X[0].x},${X[0].y}>`)

    // void broker.call('MSB.zigZag',{
    //   id:0,
    //   points:N,
    // } as Control)

    // void broker.call('MSB.turnUntilTargetInSight', { // return false :OK && return true : sans effet
    //     id: this.id,
    // } as Control)

    // void broker.call('MSB.turn', { // return false :OK && return true : sans effet
    //   id: this.id,
    // } as Control)
    // void broker.call('MSB.turn', { // return false :OK && return true : sans effet
    //   id: this.id+1,
    // } as Control)

    // void broker.call('bots-control.moveTo', { // return true :OK
    //     id: this.id,
    //     target: { x: -0.75, y: -0.75 },
    //     orientation: -3.14,
    //     expectedReachTime: 10,
    //   } as MoveToPacket)

    // void broker.call('bots-gateway.control', { // return true :OK
    //     id: this.id,
    //   yellow: true,
    //   velocity:{
    //       normal:0,
    //       angular:0,
    //       tangent:1,
    //   },
    // } as Control)

    return false
  }
}
