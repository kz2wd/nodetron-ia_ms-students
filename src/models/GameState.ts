// eslint-disable-next-line max-classes-per-file
import { Data } from '@ssl/types/internal/data'
import { ServiceBroker } from 'moleculer'
import { TaskManager } from '@ssl/types/internal/task-manager/task'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'

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
  data: {} as Data,
  assign: new StrategieManager(),
}
