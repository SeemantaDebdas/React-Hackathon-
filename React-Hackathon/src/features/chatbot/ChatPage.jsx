import React, { useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { useChatStore } from "./chatStore";

export default function ChatPage() {
    const [input, setInput] = React.useState("");
    const { messages, initChat, sendMessage } = useChatStore();

    useEffect(() => {
        initChat();
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className='h-screen w-full flex bg-var-bg text-var-text'>
            <aside className='w-64 border-r border-var-border p-4 flex flex-col gap-4 bg-var-sidebar-bg'>
                <h2 className='font-semibold text-lg'>Chat History</h2>
                <button className='bg-var-primary text-white px-4 py-2 rounded-lg'>
                    New Chat
                </button>
            </aside>

            <main className='flex-1 flex flex-col'>
                <header className='p-4 border-b border-var-border font-semibold text-xl bg-var-header-bg'>
                    Chatbot
                </header>

                <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4'>
                    {messages.map((msg, i) => (
                        <div key={i} className='flex gap-3 items-start'>
                            {msg.from === "user" ? (
                                <User className='text-var-primary' />
                            ) : (
                                <Bot className='text-var-primary' />
                            )}

                            <div
                                className={`p-3 rounded-lg max-w-xl ${
                                    msg.from === "user"
                                        ? "bg-var-msg-user-bg"
                                        : "bg-var-msg-ai-bg"
                                } ${msg.thinking ? "animate-pulse" : ""}`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='p-4 border-t border-var-border flex gap-3 bg-var-footer-bg'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='flex-1 p-3 rounded-lg border border-var-border bg-var-input-bg focus:outline-none focus:border-var-primary'
                        placeholder='Ask something...'
                    />
                    <button
                        className='p-3 rounded-lg bg-var-primary text-white'
                        onClick={handleSend}
                    >
                        <Send />
                    </button>
                </div>
            </main>
        </div>
    );
}
