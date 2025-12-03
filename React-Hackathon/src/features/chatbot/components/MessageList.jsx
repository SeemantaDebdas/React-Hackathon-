import React from "react";
import { useChat } from "../hooks/useChat";

function Avatar({ role }) {
    if (role === "ai")
        return (
            <div className='w-8 h-8 rounded-full bg-[var(--color-glaucous-500)] flex items-center justify-center text-white'>
                AI
            </div>
        );
    return (
        <div className='w-8 h-8 rounded-full bg-[var(--color-alabaster-grey-500)] flex items-center justify-center text-white'>
            U
        </div>
    );
}

export default function MessageList() {
    const { messages } = useChat();

    return (
        <div className='flex-1 p-4 overflow-auto space-y-4 bg-[var(--color-alabaster-grey-50)]'>
            {messages.map((m) => (
                <div
                    key={m.id}
                    className={`flex gap-3 ${
                        m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                    {m.role === "ai" && <Avatar role='ai' />}
                    <div
                        className={`max-w-[70%] p-3 rounded-xl shadow ${
                            m.role === "user"
                                ? "bg-white border border-[var(--color-alabaster-grey-100)]"
                                : "bg-[var(--color-powder-blue-50)]"
                        } `}
                    >
                        {m.isThinking ? (
                            <div className='flex items-center gap-2'>
                                <div className='typing-dots'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className='text-sm text-[var(--color-ink-black-200)]'>
                                    Thinking...
                                </div>
                            </div>
                        ) : (
                            <div className='whitespace-pre-wrap'>{m.text}</div>
                        )}
                    </div>
                    {m.role === "user" && <Avatar role='user' />}
                </div>
            ))}
        </div>
    );
}
