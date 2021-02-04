import { ServiceBroker } from 'moleculer'

import { GameStateMachine, GameStateMachineStatesMethods } from '../GameStateMachine'

export default class DummyManager extends GameStateMachine {
  statesMethods: GameStateMachineStatesMethods = {
    onStopped(broker: ServiceBroker): void {
      broker.logger.info('Stopped')
    },
    onHalted(broker: ServiceBroker): void {
      broker.logger.info('Halted')
    },

    onRunning(broker: ServiceBroker): void {
      broker.logger.info('Running')
    },

    onKickoffYellow(broker: ServiceBroker): void {
      broker.logger.info('Kickoff Yellow')
    },
    onKickoffBlue(broker: ServiceBroker): void {
      broker.logger.info('Kickoff Blue')
    },

    onPenaltyYellow(broker: ServiceBroker): void {
      broker.logger.info('Penalty Yellow')
    },
    onPenaltyBlue(broker: ServiceBroker): void {
      broker.logger.info('Penalty Blue')
    },

    onIndirectKickYellow(broker: ServiceBroker): void {
      broker.logger.info('Indirect Kick Yellow')
    },
    onIndirectKickBlue(broker: ServiceBroker): void {
      broker.logger.info('Indirect Kick Blue')
    },

    onDirectKickYellow(broker: ServiceBroker): void {
      broker.logger.info('Direct Kick Yellow')
    },
    onDirectKickBlue(broker: ServiceBroker): void {
      broker.logger.info('Direct Kick Blue')
    },

    onTimeoutYellow(broker: ServiceBroker): void {
      broker.logger.info('Timeout Yellow')
    },
    onTimeoutBlue(broker: ServiceBroker): void {
      broker.logger.info('Timeout Blue')
    },

    onBallPlacementYellow(broker: ServiceBroker): void {
      broker.logger.info('Ball Placement Yellow')
    },
    onBallPlacementBlue(broker: ServiceBroker): void {
      broker.logger.info('Ball Placement Blue')
    },
  }
}
