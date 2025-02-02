import talib
import pandas as pd


class PositionManager:
    def __init__(self, account_balance=10000, risk_tolerance=0.01):
        self.account_balance = account_balance
        self.risk_tolerance = risk_tolerance  # 1% risk per trade

    def update_account_balance(self, new_balance):
        self.account_balance = new_balance

    def calculate_position_size(self, entry_price, stop_loss_price):
        # Calculate risk per unit
        risk_per_unit = abs(entry_price - stop_loss_price)
        # Calculate maximum risk amount
        max_risk_amount = self.account_balance * self.risk_tolerance
        # Calculate position size
        position_size = max_risk_amount / risk_per_unit
        return position_size

    def calculate_stop_loss(self, market_data, direction):
        # Use ATR to set stop loss
        atr = talib.ATR(
            market_data['high'],
            market_data['low'],
            market_data['close'],
            timeperiod=14
        )
        atr_value = atr.iloc[-1]
        entry_price = market_data['close'].iloc[-1]
        if direction == 'buy':
            stop_loss_price = entry_price - atr_value
        elif direction == 'sell':
            stop_loss_price = entry_price + atr_value
        else:
            stop_loss_price = None
        return stop_loss_price

    def calculate_take_profit(self, entry_price, stop_loss_price, direction):
        # Risk-reward ratio of 1:1.5
        risk_per_unit = abs(entry_price - stop_loss_price)
        reward = risk_per_unit * 1.5
        if direction == 'buy':
            take_profit_price = entry_price + reward
        elif direction == 'sell':
            take_profit_price = entry_price - reward
        else:
            take_profit_price = None
        return take_profit_price

    def manage_position(self, signal, market_data):
        if signal == 'buy' or signal == 'sell':
            entry_price = market_data['close'].iloc[-1]
            stop_loss_price = self.calculate_stop_loss(market_data, signal)
            take_profit_price = self.calculate_take_profit(
                entry_price, stop_loss_price, signal)
            # Calculate position size
            position_size = self.calculate_position_size(
                entry_price, stop_loss_price)
            return {
                'action': signal,
                'entry_price': entry_price,
                'stop_loss': stop_loss_price,
                'take_profit': take_profit_price,
                'position_size': position_size
            }
        else:
            # Hold position or no action
            return None
