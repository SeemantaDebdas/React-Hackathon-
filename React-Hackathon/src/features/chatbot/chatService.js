const WS_URL = "wss://ws.ifelse.io/"; // public echo websocket

class ChatService {
    constructor(onMessage) {
        this.ws = new WebSocket(WS_URL);

        this.ws.onopen = () => {
            console.log("WebSocket connected");
        };

        this.ws.onmessage = (event) => {
            onMessage(event.data);
        };

        this.ws.onerror = (err) => {
            console.error("WebSocket error", err);
        };
    }

    send(msg) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(msg);
        }
    }
}

export default ChatService;
