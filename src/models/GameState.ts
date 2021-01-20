// eslint-disable-next-line max-classes-per-file
import { Data } from '@nodetron/util/data'
import { ServiceBroker } from 'moleculer'
import { TaskManager } from '@nodetron/types/task-manager/task'
import Strategies from '@nodetron/types/task-manager/tasks/strategies'
import { Color } from '@nodetron/types/utils/utils'
import { DataMessage } from '@nodetron/types/data'
import { GameControllerEvent } from '@nodetron/types/league/game-controller'

export class StrategieManager implements TaskManager<Strategies> {
  private strategies = new Map<number, Strategies>()

  register(ids: Array<number>, elt: Strategies): void {
    ids.forEach((id) => this.strategies.set(id, elt))
  }

  computeAll(broker: ServiceBroker): void {
    this.strategies.forEach((elt, key, map) => {
      if (elt.compute(broker)) {
        map.delete(key)
      }
    })
  }
}
const initialData: DataMessage = {
  field: {
    width: 6,
    length: 9,
    boundaryWidth: 0.05,
    centerMark: {
      center: { x: 0, y: 0 },
      radius: 0.005,
    },
    goal: {
      width: 1.0,
      depth: 0.2,
    },
    penalty: {
      width: 2.0,
      depth: 1.0,
    },
  },
  robots: {
    allies: [],
    opponents: [],
  },
  ball: {
    position: { x: 0, y: 0 },
    radius: 0.05,
  },
  color: Color.YELLOW,
}

export const state = {
  data: new Data(initialData),
  gameController: { } as GameControllerEvent,
  assign: new StrategieManager(),
}
