import React, { useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "../hooks/useChat";

export default function MessageInput() {
    const [value, setValue] = useState("");
    const { sendMessage } = useChat();

    const onSend = async (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        await sendMessage(value.trim());
        setValue("");
    };

    return (
        <form
            onSubmit={onSend}
            className='p-4 border-t border-[var(--color-alabaster-grey-100)] bg-white'
        >
            <div className='flex gap-3'>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='flex-1 p-3 rounded-lg border border-[var(--color-alabaster-grey-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-powder-blue-200)]'
                    placeholder='Ask anything...'
                />
                <button
                    type='submit'
                    className='px-4 py-2 rounded-lg bg-[var(--color-ink-black-500)] text-white flex items-center gap-2'
                >
                    <Send className='w-4 h-4' /> Send
                </button>
            </div>
        </form>
    );
}
