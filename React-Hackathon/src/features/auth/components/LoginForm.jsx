import React, { useState } from "react";
import { useAuthStore } from "../authStore";

export default function LoginForm() {
    const login = useAuthStore((s) => s.login);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const [email, setEmail] = useState("Filip");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <form onSubmit={submit} className='space-y-6 w-full max-w-sm'>
            {/* USERNAME */}
            <div>
                <label className='text-gray-400 text-sm'>User Name</label>
                <div className='relative mt-2'>
                    <span className='absolute left-3 top-3 text-gray-500 text-sm'>
                        📧
                    </span>
                    <input
                        className='w-full bg-black border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            {/* PASSWORD */}
            <div>
                <label className='text-gray-400 text-sm'>Password</label>
                <div className='relative mt-2'>
                    <span className='absolute left-3 top-3 text-gray-500 text-sm'>
                        🔒
                    </span>
                    <input
                        type='password'
                        className='w-full bg-black border border-gray-700 rounded-md pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {/* Forgot Password */}
            <button type='button' className='text-xs text-gray-500 underline'>
                FORGOT PASSWORD?
            </button>

            {/* Error */}
            {error && <div className='text-red-400 text-sm'>{error}</div>}

            {/* Sign In */}
            <button
                type='submit'
                disabled={loading}
                className='w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold tracking-wide transition-transform transform hover:-translate-y-1'
            >
                {loading ? "Signing in…" : "SIGN IN"}
            </button>
        </form>
    );
}
