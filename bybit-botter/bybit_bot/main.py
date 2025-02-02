#!/usr/bin/env python3

import logging
import time
from data_fetch.data_fetcher import DataFetcher
from signal_generation.signals import SignalGenerator
from parameter_optimization.optimizer import ParameterOptimizer
from position_management.position_manager import PositionManager
from trade_execution.executor import TradeExecutor


def setup_logger():
    logger = logging.getLogger('BybitBot')
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


def main():
    logger = setup_logger()
    logger.info('Starting Bybit Trading Bot')

    # Initialize modules
    data_fetcher = DataFetcher()
    optimizer = ParameterOptimizer()
    signal_generator = SignalGenerator(optimizer)
    position_manager = PositionManager()
    trade_executor = TradeExecutor()

    try:
        while True:
            # Fetch data
            market_data = data_fetcher.fetch_market_data()

            # Optimize parameters
            optimizer.optimize_parameters(market_data)

            # Generate signals
            signal = signal_generator.generate_signal(market_data)

            # Manage positions
            position = position_manager.manage_position(signal)

            # Execute trades
            trade_executor.execute_trade(position)

            # Logging
            logger.info('Cycle complete')

            # Sleep or wait for next tick
            time.sleep(60)  # Wait for 60 seconds

    except KeyboardInterrupt:
        logger.info('Stopping Bybit Trading Bot')
    except Exception as e:
        logger.exception(f'An error occurred: {e}')


if __name__ == '__main__':
    main()
