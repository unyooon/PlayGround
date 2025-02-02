import pandas as pd
import numpy as np
import talib


class ParameterOptimizer:
    def __init__(self):
        # Initial parameters for strategies
        self.parameters = {
            'ma_short_period': 7,
            'ma_long_period': 14,
            'bb_period': 20,
            'bb_std_dev': 2,
            'rsi_period': 14,
            'breakout_window': 20
        }

    def optimize_parameters(self, market_data):
        """
        Optimize strategy parameters based on market volatility.
        This method adjusts parameters like moving average periods and
        Bollinger Bands settings using ATR as a measure of volatility.
        """
        if market_data is not None and len(market_data) > 0:
            # Calculate ATR for volatility measurement
            atr = talib.ATR(
                market_data['high'],
                market_data['low'],
                market_data['close'],
                timeperiod=14
            )
            current_atr = atr.iloc[-1]
            avg_atr = atr.mean()

            # Adjust parameters based on volatility
            if current_atr > avg_atr:
                # High volatility - make strategies more sensitive
                self.parameters['ma_short_period'] = max(
                    5, self.parameters['ma_short_period'] - 1)
                self.parameters['bb_std_dev'] = min(
                    2.5, self.parameters['bb_std_dev'] + 0.1)
                self.parameters['breakout_window'] = max(
                    10, self.parameters['breakout_window'] - 1)
            else:
                # Low volatility - make strategies less sensitive
                self.parameters['ma_short_period'] = min(
                    10, self.parameters['ma_short_period'] + 1)
                self.parameters['bb_std_dev'] = max(
                    1.5, self.parameters['bb_std_dev'] - 0.1)
                self.parameters['breakout_window'] = min(
                    30, self.parameters['breakout_window'] + 1)

            # Ensure parameters stay within reasonable bounds
            self.parameters['ma_short_period'] = int(
                self.parameters['ma_short_period'])
            self.parameters['bb_std_dev'] = round(
                self.parameters['bb_std_dev'], 2)
            self.parameters['breakout_window'] = int(
                self.parameters['breakout_window'])

    def get_parameters(self):
        """
        Return the current set of optimized parameters.
        """
        return self.parameters
