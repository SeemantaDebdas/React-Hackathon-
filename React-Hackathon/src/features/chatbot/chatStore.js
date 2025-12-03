import { create } from "zustand";
import ChatService from "./chatService";

export const useChatStore = create((set) => ({
    messages: [],
    service: null,

    initChat: () =>
        set((state) => {
            if (state.service) return state; // already initialized

            const svc = new ChatService((msg) => {
                set((s) => ({
                    messages: [...s.messages, { from: "server", text: msg }],
                }));
            });

            return { service: svc };
        }),

    sendMessage: (text) =>
        set((state) => {
            state.service?.send(text);
            return { messages: [...state.messages, { from: "me", text }] };
        }),
}));
