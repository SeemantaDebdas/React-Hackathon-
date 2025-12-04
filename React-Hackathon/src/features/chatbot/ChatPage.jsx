import React, { useEffect, useRef, useState } from "react";
import {
    Send,
    Bot,
    User,
    MessageSquareText,
    Plus,
    Search,
    Trash2,
    Loader2,
} from "lucide-react";
import { useChatStore } from "./chatStore";
import { useAuthStore } from "../auth/authStore";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const chatEndRef = useRef(null);

    const {
        messages,
        sessions,
        currentChatId,
        isLoading,
        initChat,
        startNewChat,
        loadChat,
        sendMessage,
        deleteChat,
    } = useChatStore();

    const user = useAuthStore((state) => state.user);
    const userId = user?.id; // Get user ID from auth store

    useEffect(() => {
        console.log(user);
        if (userId) {
            initChat(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (userId && currentChatId === null) {
            console.log("No chat selected → auto starting new chat");
            startNewChat();
        }
    }, [userId, currentChatId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        console.log("Calling the chat page");
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSend();
            e.preventDefault();
        }
    };

    const handleNewChat = () => {
        startNewChat();
    };

    const handleChatClick = (chatId) => {
        loadChat(chatId);
    };

    const handleDeleteChat = (e, chatId) => {
        e.stopPropagation(); // Prevent chat from being loaded when deleting
        if (
            window.confirm("Are you sure you want to delete this conversation?")
        ) {
            deleteChat(chatId);
        }
    };

    const isUserMessage = (msg) => msg.from === "user";
    const isBotMessage = (msg) => msg.from === "bot";

    // Filter sessions based on search query
    const filteredSessions = sessions.filter((session) =>
        session.preview?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className='h-full w-full flex bg-app-bg text-text-main overflow-hidden'>
            {/* SIDEBAR */}
            <aside className='w-80 border-r-2 border-border/80 p-6 flex flex-col gap-6 bg-surface-base relative shadow-2xl'>
                <div className='absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent pointer-events-none'></div>

                {/* Search */}
                <div className='relative z-10'>
                    <input
                        type='text'
                        placeholder='Search conversations...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full p-3 pl-11 rounded-xl bg-surface-hover border border-border
                                   focus:outline-none focus:border-primary/50 focus:bg-surface-hover text-sm 
                                   placeholder:text-text-secondary transition-all duration-200'
                    />
                    <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary' />
                </div>

                {/* New Chat */}
                <button
                    onClick={handleNewChat}
                    className='bg-gradient-to-r from-primary to-primary-hover text-text-dark px-5 py-3.5 rounded-xl 
                               flex items-center justify-center gap-2 font-semibold text-sm 
                               transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 
                               hover:scale-[1.02] active:scale-[0.98] z-10 relative overflow-hidden group'
                >
                    <div
                        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'
                    ></div>
                    <Plus className='w-5 h-5 relative z-10' />
                    <span className='relative z-10'>New Conversation</span>
                </button>

                {/* Chats */}
                <h3
                    className='font-semibold text-[11px] text-text-secondary mt-2 pt-6 border-t border-border/30 
                               uppercase tracking-[0.15em] relative z-10'
                >
                    Recent Conversations
                </h3>

                {/* Loading State */}
                {isLoading && sessions.length === 0 && (
                    <div className='flex items-center justify-center p-8'>
                        <Loader2 className='w-6 h-6 text-primary animate-spin' />
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && sessions.length === 0 && (
                    <div className='text-center p-8 text-text-secondary text-sm'>
                        No conversations yet. Start a new one!
                    </div>
                )}

                {/* Chat List */}
                <div className='flex flex-col gap-2 overflow-y-auto flex-1 relative z-10 pr-2 custom-scrollbar'>
                    {filteredSessions.map((session) => (
                        <div
                            key={session.chat_id}
                            onClick={() => handleChatClick(session.chat_id)}
                            className={`flex items-center min-h-12 gap-3 p-3 rounded-xl text-sm transition-all duration-200 cursor-pointer group
                                relative overflow-hidden
                                ${
                                    currentChatId === session.chat_id
                                        ? "bg-primary/10 text-primary border border-primary/30 shadow-lg shadow-primary/5"
                                        : "hover:bg-surface-hover/80 text-text-secondary hover:text-text-main border border-transparent"
                                }`}
                        >
                            <div
                                className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                                    currentChatId === session.chat_id
                                        ? "bg-primary/20"
                                        : "bg-surface-hover group-hover:bg-surface-base"
                                }`}
                            >
                                <MessageSquareText className='w-4 h-4' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='truncate font-medium'>
                                    {session.preview || "New conversation"}
                                </div>
                                <div className='text-xs text-text-secondary mt-0.5'>
                                    {formatDate(session.last_update)}
                                </div>
                            </div>
                            <button
                                onClick={(e) =>
                                    handleDeleteChat(e, session.chat_id)
                                }
                                className='opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-500/10 rounded-lg'
                            >
                                <Trash2 className='w-3.5 h-3.5 text-red-400' />
                            </button>
                        </div>
                    ))}
                </div>
            </aside>

            {/* MAIN CHAT */}
            <main className='flex-1 flex flex-col relative bg-app-bg'>
                {/* Header */}
                <header className='p-5 border-b border-border/30 flex items-center justify-between bg-app-bg/50 backdrop-blur-sm relative z-10'>
                    <div className='flex items-center gap-3'>
                        {currentChatId !== null && (
                            <>
                                <div className='w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50'></div>
                                <h1 className='font-semibold text-lg text-text-main tracking-tight'>
                                    {currentChatId === 0
                                        ? "New Conversation"
                                        : `Chat #${currentChatId}`}
                                </h1>
                            </>
                        )}
                        {currentChatId === null && (
                            <h1 className='font-semibold text-lg text-text-secondary tracking-tight'>
                                Select a conversation or start a new one
                            </h1>
                        )}
                    </div>
                </header>

                {/* Messages */}
                <div className='flex-1 overflow-y-auto p-8 flex flex-col gap-8 bg-app-bg custom-scrollbar'>
                    {messages.length === 0 && currentChatId !== null && (
                        <div className='flex-1 flex items-center justify-center'>
                            <div className='text-center max-w-md'>
                                <div
                                    className='w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 
                                                border border-primary/30 flex items-center justify-center mx-auto mb-4'
                                >
                                    <Bot className='w-8 h-8 text-primary' />
                                </div>
                                <h3 className='text-xl font-semibold text-text-main mb-2'>
                                    Start a conversation
                                </h3>
                                <p className='text-text-secondary text-sm'>
                                    Ask me anything and I'll do my best to help
                                    you!
                                </p>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-4 items-start ${
                                isBotMessage(msg)
                                    ? "justify-start"
                                    : "justify-end"
                            }`}
                        >
                            {isBotMessage(msg) && (
                                <div
                                    className='w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 
                                                border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1
                                                shadow-lg shadow-primary/10'
                                >
                                    <Bot className='text-primary w-5 h-5' />
                                </div>
                            )}

                            <div
                                className={`px-5 py-4 rounded-2xl max-w-3xl text-base shadow-lg transition-all duration-300
                                    ${
                                        isBotMessage(msg)
                                            ? "bg-surface-base/90 border border-border/60 backdrop-blur-sm"
                                            : "bg-surface-hover/90 border border-border/40"
                                    }
                                    ${msg.thinking ? "animate-pulse" : ""}
                                `}
                            >
                                <div className='whitespace-pre-wrap leading-relaxed text-text-main/95'>
                                    {msg.text}
                                </div>
                            </div>

                            {isUserMessage(msg) && (
                                <div
                                    className='w-9 h-9 rounded-xl bg-surface-hover border border-border/50 
                                                flex items-center justify-center flex-shrink-0 mt-1'
                                >
                                    <User className='text-text-secondary w-4 h-4' />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className='p-6 border-t border-border/30 flex justify-center bg-app-bg/50 backdrop-blur-sm relative z-10'>
                    <div className='flex items-center w-full max-w-4xl gap-3 relative'>
                        <div className='flex-1 relative group'>
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={
                                    currentChatId !== null
                                        ? "Ask me anything..."
                                        : "Start a new conversation first..."
                                }
                                disabled={currentChatId === null}
                                className='w-full p-4 pr-12 rounded-2xl border border-border/50 bg-surface-hover/50 
                                           text-text-main focus:outline-none focus:border-primary/50 
                                           placeholder:text-text-secondary transition-all duration-200
                                           focus:bg-surface-hover focus:shadow-lg focus:shadow-primary/5
                                           disabled:opacity-50 disabled:cursor-not-allowed'
                            />
                            <div className='absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-xs font-medium opacity-0 group-focus-within:opacity-100 transition-opacity'>
                                ⏎
                            </div>
                        </div>

                        <button
                            className='p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-text-dark 
                                       transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 
                                       hover:scale-105 active:scale-95
                                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 
                                       disabled:hover:shadow-none relative overflow-hidden group'
                            onClick={handleSend}
                            disabled={!input.trim() || currentChatId === null}
                        >
                            <div
                                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'
                            ></div>
                            <Send className='w-5 h-5 relative z-10' />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
