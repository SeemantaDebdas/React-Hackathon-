import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Globe } from "lucide-react";
import { useAuthStore } from "../authStore";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();

        const success = await login(email, password);
        console.log(success);

        if (success) {
            navigate("/chat"); // redirect after login
        }
    };

    const handleGoogleLogin = () => {
        // Handle Google login
        console.log("Google login");
    };

    return (
        <div className='h-screen w-full flex bg-app-bg text-text-main overflow-hidden'>
            {/* LEFT SIDE - Login Form */}
            <div className='w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 relative z-10'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20'>
                            <span className='text-text-dark font-bold text-xl'>
                                V
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='text-sm text-text-secondary'>
                            Don't have an account?
                        </span>
                        <button className='px-4 py-2 rounded-lg border border-border/50 text-sm font-medium text-text-main hover:bg-surface-hover transition-colors'>
                            Register
                        </button>
                    </div>
                </div>

                {/* Login Form */}
                <div className='max-w-md w-full mx-auto'>
                    <div className='mb-10'>
                        <h1 className='text-3xl font-bold text-text-main mb-2'>
                            Login to your account
                        </h1>
                        <p className='text-text-secondary text-sm'>
                            Enter your details to login.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className='space-y-5'>
                        {/* Google Login */}
                        <button
                            type='button'
                            onClick={handleGoogleLogin}
                            className='w-full p-3.5 rounded-xl border border-border/50 bg-surface-base 
                                     hover:bg-surface-hover transition-all duration-200 flex items-center 
                                     justify-center gap-3 text-text-main font-medium group'
                        >
                            <svg className='w-5 h-5' viewBox='0 0 24 24'>
                                <path
                                    fill='#4285F4'
                                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                />
                                <path
                                    fill='#34A853'
                                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                />
                                <path
                                    fill='#FBBC05'
                                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                                />
                                <path
                                    fill='#EA4335'
                                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        {/* Divider */}
                        <div className='flex items-center gap-4'>
                            <div className='flex-1 h-px bg-border/50'></div>
                            <span className='text-sm text-text-secondary'>
                                or
                            </span>
                            <div className='flex-1 h-px bg-border/50'></div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className='block text-sm font-medium text-text-main mb-2'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary' />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='johndoe@gmail.com'
                                    className='w-full p-3.5 pl-11 rounded-xl border border-border/50 bg-surface-base 
                                             text-text-main placeholder:text-text-secondary
                                             focus:outline-none focus:border-primary/50 focus:bg-surface-hover 
                                             transition-all duration-200'
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className='block text-sm font-medium text-text-main mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary' />
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder='••••••••'
                                    className='w-full p-3.5 pl-11 rounded-xl border border-border/50 bg-surface-base 
                                             text-text-main placeholder:text-text-secondary
                                             focus:outline-none focus:border-primary/50 focus:bg-surface-hover 
                                             transition-all duration-200'
                                    required
                                />
                            </div>
                        </div>

                        {/* Keep Logged In & Forgot Password */}
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center gap-2 cursor-pointer group'>
                                <input
                                    type='checkbox'
                                    checked={keepLoggedIn}
                                    onChange={(e) =>
                                        setKeepLoggedIn(e.target.checked)
                                    }
                                    className='w-4 h-4 rounded border-border/50 bg-surface-base 
                                             text-primary focus:ring-2 focus:ring-primary/20 
                                             cursor-pointer'
                                />
                                <span className='text-sm text-text-secondary group-hover:text-text-main transition-colors'>
                                    Keep me logged in
                                </span>
                            </label>
                            <button
                                type='button'
                                className='text-sm text-text-secondary hover:text-primary transition-colors'
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type='submit'
                            className='w-full p-4 rounded-xl bg-gradient-to-r from-primary to-primary-hover 
                                     text-text-dark font-semibold transition-all duration-200 
                                     hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] 
                                     active:scale-[0.98] relative overflow-hidden group mt-6
                                     cursor-pointer
                                     '
                        >
                            <div
                                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'
                            ></div>
                            <span className='relative z-10 '>Login</span>
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between text-sm text-text-secondary'>
                    <div className='flex items-center gap-1'>
                        <span>©</span>
                        <span>2025 VOXA</span>
                    </div>
                    <button className='flex items-center gap-2 hover:text-text-main transition-colors'>
                        <Globe className='w-4 h-4' />
                        <span>ENG</span>
                        <svg
                            className='w-4 h-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE - Gradient Visual */}
            <div className='hidden lg:block lg:w-1/2 relative overflow-hidden'>
                {/* Background Image */}
                <img
                    src='https://cdn.pixabay.com/photo/2017/01/22/20/51/space-2000945_1280.jpg'
                    alt='Background'
                    className='absolute inset-0 w-full h-full object-cover'
                />
                {/* Gradient Overlays */}
                <div className='absolute inset-0 bg-linear-to-br from-app-bg/10 via-app-bg/10 to-transparent'></div>
                <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-primary/5 to-transparent'></div>
                <div className='absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent'></div>
                <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
            </div>
        </div>
    );
}
