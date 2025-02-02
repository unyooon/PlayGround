import bybit
import os
import logging


class TradeExecutor:
    def __init__(self):
        # Load API keys from environment variables
        api_key = os.getenv('BYBIT_API_KEY')
        api_secret = os.getenv('BYBIT_API_SECRET')

        if not api_key or not api_secret:
            raise Exception('Bybit API key and secret are required.')

        # Initialize Bybit REST API client
        self.client = bybit.bybit(
            test=False, api_key=api_key, api_secret=api_secret)
        self.logger = logging.getLogger('BybitBot.TradeExecutor')

    def execute_trade(self, position):
        if position is None:
            self.logger.info('No trade to execute.')
            return

        action = position['action']
        symbol = 'BTCUSDT'
        qty = position['position_size']
        stop_loss = position['stop_loss']
        take_profit = position['take_profit']

        try:
            if action == 'buy':
                order_side = 'Buy'
            elif action == 'sell':
                order_side = 'Sell'
            else:
                self.logger.info('Invalid action.')
                return

            # Place market order
            order = self.client.Order.Order_newV2(
                symbol=symbol,
                side=order_side,
                order_type='Market',
                qty=qty,
                time_in_force='GoodTillCancel',
                reduce_only=False,
                close_on_trigger=False
            ).result()
            self.logger.info(f'Placed {order_side} order: {order}')

            # Get order ID
            order_id = order[0]['result']['order_id']

            # Set stop loss and take profit
            sl_tp = self.client.LinearPositions.LinearPositions_tradingStop(
                symbol=symbol,
                side=order_side,
                stop_loss=stop_loss,
                take_profit=take_profit
            ).result()
            self.logger.info(f'Set Stop Loss and Take Profit: {sl_tp}')

        except Exception as e:
            self.logger.exception(f'Error executing trade: {e}')

    def cancel_all_orders(self, symbol='BTCUSDT'):
        try:
            result = self.client.Order.Order_cancelAll(symbol=symbol).result()
            self.logger.info(f'Canceled all orders: {result}')
        except Exception as e:
            self.logger.exception(f'Error canceling orders: {e}')

    def get_open_positions(self, symbol='BTCUSDT'):
        try:
            positions = self.client.Positions.Positions_myPosition(
                symbol=symbol).result()
            self.logger.info(f'Open positions: {positions}')
            return positions
        except Exception as e:
            self.logger.exception(f'Error fetching positions: {e}')
            return None
