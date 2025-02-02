import websocket
import json
import threading
import time


class DataFetcher:
    def __init__(self, symbol='BTCUSDT'):
        self.symbol = symbol
        self.data = []
        self.ws = None
        self.url = "wss://stream.bybit.com/realtime_public"
        self._connect()

    def _connect(self):
        websocket.enableTrace(False)
        self.ws = websocket.WebSocketApp(
            self.url,
            on_open=self._on_open,
            on_message=self._on_message,
            on_error=self._on_error,
            on_close=self._on_close
        )
        ws_thread = threading.Thread(target=self.ws.run_forever)
        ws_thread.daemon = True
        ws_thread.start()
        # Wait for connection to establish
        time.sleep(1)

    def _on_open(self, ws):
        print("WebSocket connection opened.")
        # Subscribe to trade data for the specified symbol
        params = {
            "op": "subscribe",
            "args": [f"trade.{self.symbol}"]
        }
        ws.send(json.dumps(params))

    def _on_message(self, ws, message):
        data = json.loads(message)
        if 'topic' in data and 'data' in data:
            # Process incoming trade data
            self.data.append(data['data'][-1])
            # For debugging purposes
            # print(f"Received data: {data['data'][-1]}")

    def _on_error(self, ws, error):
        print(f"WebSocket error: {error}")
        # Attempt to reconnect
        time.sleep(5)
        self._connect()

    def _on_close(self, ws, close_status_code, close_msg):
        print(f"WebSocket connection closed: {close_status_code}, {close_msg}")
        # Attempt to reconnect
        time.sleep(5)
        self._connect()

    def fetch_market_data(self):
        # Return the latest trade data
        return self.data[-1] if self.data else None
