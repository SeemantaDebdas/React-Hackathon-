import { create } from "zustand";
import ChatService, { chatApi } from "./chatService";

export const useChatStore = create((set, get) => ({
    messages: [],
    service: null,
    sessions: [],
    currentChatId: null,
    userId: null,
    isLoading: false,
    error: null,

    initChat: (userId) => {
        set({ userId });
        get().loadSessions(userId);
    },

    loadSessions: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const sessions = await chatApi.getSessions(userId);
            set({ sessions, isLoading: false });
        } catch (err) {
            console.error("Failed to load sessions:", err);
            set({ error: err.message, isLoading: false });
        }
    },

    startNewChat: () => {
        const { service, userId } = get();

        if (service) service.close();

        const newService = new ChatService(
            userId,
            0,
            get().handleIncomingMessage
        );

        set({
            service: newService,
            currentChatId: 0,
            messages: [],
        });
    },

    loadChat: async (chatId) => {
        const { userId, service } = get();
        set({ isLoading: true });

        try {
            const data = await chatApi.getChatHistory(chatId, userId);

            const messages = data.messages.map((m) => ({
                from: m.message_type === "user" ? "user" : "bot",
                text: m.content,
                id: m.id,
                created_at: m.created_at,
                thinking: false,
            }));

            if (service) {
                service.updateChatId(chatId);
            } else {
                const newService = new ChatService(
                    userId,
                    chatId,
                    get().handleIncomingMessage
                );
                set({ service: newService });
            }

            set({
                messages,
                currentChatId: chatId,
                isLoading: false,
            });
        } catch (err) {
            console.error("Failed loading chat:", err);
            set({ error: err.message, isLoading: false });
        }
    },

    /** -------------------------------
     * 🔥 UNIFIED INCOMING WS HANDLER
     --------------------------------*/
    handleIncomingMessage: (msg) => {
        const state = get();

        // Remove the thinking bubble
        const base = state.messages.filter((m) => !m.thinking);

        /* ------------------------------------------------
       CASE 1: FIRST BOT MESSAGE OF A NEW CHAT
       chat_id = actual ID from backend
    --------------------------------------------------*/
        if (state.currentChatId === 0 && msg.from === "bot" && msg.chat_id) {
            console.log("🎉 New chat ID assigned:", msg.chat_id);

            // update websocket connection to new chat_id
            if (state.service) {
                state.service.updateChatId(msg.chat_id);
            }

            // update sessions list (prepend new chat)
            const newSession = {
                chat_id: msg.chat_id,
                preview: msg.text,
                last_update: msg.timestamp,
            };

            set({
                currentChatId: msg.chat_id,
                sessions: [newSession, ...state.sessions],
            });
        }

        /* ------------------------------------------------
       CASE 2: Normal message handling
    --------------------------------------------------*/
        set({
            messages: [
                ...base,
                {
                    from: msg.from,
                    text: msg.text,
                    id: msg.id,
                    chat_id: msg.chat_id,
                    created_at: msg.timestamp,
                    thinking: false,
                },
            ],
        });
    },

    sendMessage: (text) => {
        const { service, messages } = get();

        if (!service) return console.error("Chat service not initialized");

        // Local user message
        const userMessage = {
            from: "user",
            text,
            thinking: false,
        };

        // Thinking placeholder
        const thinking = {
            from: "bot",
            text: "...",
            thinking: true,
        };

        // Insert into UI
        set({ messages: [...messages, userMessage, thinking] });

        // Send to backend
        service.send(
            JSON.stringify({
                type: "human",
                content: text,
            })
        );
    },

    clearChat: () => {
        const { service } = get();
        if (service) service.close();
        set({ messages: [], currentChatId: null, service: null });
    },

    deleteChat: async (chatId) => {
        const { userId } = get();
        await chatApi.deleteChat(chatId, userId);

        get().loadSessions(userId);

        if (get().currentChatId === chatId) {
            get().clearChat();
        }
    },
}));
