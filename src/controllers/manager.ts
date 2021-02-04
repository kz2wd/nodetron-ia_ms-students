import { ServiceBroker } from 'moleculer'

export interface Manager {
    update(broker: ServiceBroker): void,
}
