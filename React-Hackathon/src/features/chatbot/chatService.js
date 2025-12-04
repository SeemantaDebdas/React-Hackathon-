import axiosClient from "../../axiosClient";

const WS_BASE_URL = "ws://127.0.0.1:8001/api/v1/chat/ws";

class ChatService {
    constructor(userId, chatId = 0, onMessage, onStatusChange) {
        this.userId = userId;
        this.chatId = chatId;

        this.ws = null;
        this.onMessage = onMessage; // handles parsed messages
        this.onStatusChange = onStatusChange; // optional connection status updater

        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;

        this.partialMessage = ""; // for streaming chunks

        this.connect();
    }

    connect() {
        const wsUrl = `${WS_BASE_URL}/${this.userId}/${this.chatId}`;
        console.log("Connecting to WebSocket:", wsUrl);

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log("WebSocket connected");

            this.reconnectAttempts = 0;

            if (this.onStatusChange) this.onStatusChange("connected");
        };

        this.ws.onmessage = (event) => {
            const raw = event.data;

            try {
                const data = JSON.parse(raw);

                // Validate structure
                if (!data.type || !data.content) {
                    console.warn("Ignoring malformed WS message:", raw);
                    return;
                }

                // HUMAN MESSAGE (echo from backend)
                if (data.type === "human") {
                    this.onMessage({
                        type: "final",
                        from: "user",
                        text: data.content,
                        chat_id: data.chat_id,
                        id: data.message_id,
                        timestamp: data.timestamp,
                    });
                    return;
                }

                // BOT RESPONSE
                if (data.type === "response") {
                    this.onMessage({
                        type: "final",
                        from: "bot",
                        text: data.content,
                        chat_id: data.chat_id,
                        id: data.message_id,
                        timestamp: data.timestamp,
                    });
                    return;
                }

                // Unknown type
                console.warn("Unknown message type:", data.type);
            } catch (err) {
                console.warn("Invalid JSON from WebSocket:", raw);
            }
        };

        this.ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        this.ws.onclose = () => {
            console.log("WebSocket closed");

            if (this.onStatusChange) this.onStatusChange("disconnected");

            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++;
                console.log(
                    `Reconnecting... Attempt ${this.reconnectAttempts}`
                );
                setTimeout(() => this.connect(), 1500);
            }
        };
    }

    send(msg) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(typeof msg === "string" ? msg : JSON.stringify(msg));
        } else {
            console.warn("WebSocket is not ready, retrying send...");

            // retry sending after small wait
            setTimeout(() => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(msg);
                }
            }, 500);
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    updateChatId(newChatId) {
        this.chatId = newChatId;
        this.close();
        this.connect();
    }
}

export const chatApi = {
    async getSessions(userId) {
        const response = await axiosClient.get(
            `/chat/sessions?user_id=${userId}`
        );
        return response.data;
    },

    async getChatHistory(chatId, userId) {
        const response = await axiosClient.get(
            `/chat/${chatId}/history?user_id=${userId}`
        );
        return response.data;
    },

    async deleteChat(chatId, userId) {
        const response = await axiosClient.delete(
            `/chat/${chatId}?user_id=${userId}`
        );
        return response.data;
    },
};

export default ChatService;
