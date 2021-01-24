// eslint-disable-next-line max-classes-per-file
import { ServiceBroker } from 'moleculer'
import { TaskManager } from '@nodetron/types/task-manager/task'
import Strategies from '@nodetron/types/task-manager/tasks/strategies'
import { World } from '@nodetron/util/world'

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

export const state = {
  world: {} as World,
  assign: new StrategieManager(),
}
