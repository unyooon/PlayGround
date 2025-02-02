import pandas as pd
import talib
import numpy as np


class SignalGenerator:
    def __init__(self, optimizer):
        self.optimizer = optimizer

    def generate_signal(self, market_data):
        """
        Generate trading signals based on multiple strategies.
        """
        if market_data is None:
            return None

        parameters = self.optimizer.get_parameters()
        signals = []

        # Prepare data
        df = pd.DataFrame(market_data)
        close = df['close']
        high = df['high']
        low = df['low']

        # Swing Trading Strategy (Moving Averages)
        ma_short_period = parameters['ma_short_period']
        ma_long_period = parameters['ma_long_period']
        ma_short = talib.SMA(close, timeperiod=ma_short_period)
        ma_long = talib.SMA(close, timeperiod=ma_long_period)
        if ma_short.iloc[-1] > ma_long.iloc[-1]:
            signals.append(1)  # Buy signal
        elif ma_short.iloc[-1] < ma_long.iloc[-1]:
            signals.append(-1)  # Sell signal
        else:
            signals.append(0)

        # Breakout Strategy
        breakout_window = parameters['breakout_window']
        highest_high = high.rolling(window=breakout_window).max()
        lowest_low = low.rolling(window=breakout_window).min()
        if close.iloc[-1] > highest_high.iloc[-2]:
            signals.append(1)  # Buy signal
        elif close.iloc[-1] < lowest_low.iloc[-2]:
            signals.append(-1)  # Sell signal
        else:
            signals.append(0)

        # Bollinger Bands Reversal Strategy
        bb_period = parameters['bb_period']
        bb_std_dev = parameters['bb_std_dev']
        upperband, middleband, lowerband = talib.BBANDS(
            close,
            timeperiod=bb_period,
            nbdevup=bb_std_dev,
            nbdevdn=bb_std_dev,
            matype=0
        )
        if close.iloc[-1] < lowerband.iloc[-1]:
            signals.append(1)  # Buy signal
        elif close.iloc[-1] > upperband.iloc[-1]:
            signals.append(-1)  # Sell signal
        else:
            signals.append(0)

        # RSI Oscillator Strategy
        rsi_period = parameters['rsi_period']
        rsi = talib.RSI(close, timeperiod=rsi_period)
        if rsi.iloc[-1] < 30:
            signals.append(1)  # Buy signal
        elif rsi.iloc[-1] > 70:
            signals.append(-1)  # Sell signal
        else:
            signals.append(0)

        # Aggregate signals
        total_signal = sum(signals)

        # Decide final signal based on threshold
        if total_signal >= 2:
            return 'buy'
        elif total_signal <= -2:
            return 'sell'
        else:
            return 'hold'
