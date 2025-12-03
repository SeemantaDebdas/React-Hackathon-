import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className='min-h-screen flex bg-black text-white'>
            {/* Left Panel */}
            <div className='w-full md:w-1/2 flex flex-col justify-center px-12 lg:px-24 py-20 bg-black'>
                <h1 className='text-4xl font-semibold mb-10'>Sign In</h1>
                <LoginForm />

                <p className='mt-10 text-sm text-gray-400'>
                    Don’t have an account?{" "}
                    <span className='text-white underline cursor-pointer'>
                        Sign up
                    </span>
                </p>
            </div>

            {/* Right Panel */}
            <div className='hidden md:flex w-1/2 relative items-center justify-center overflow-hidden'>
                <img
                    src='/assets/login-hero.jpg'
                    className='absolute inset-0 w-full h-full object-cover opacity-60'
                    alt='hero'
                />

                <div className='relative z-10 max-w-md text-center px-10'>
                    <p className='text-lg leading-relaxed text-gray-200'>
                        A new way to experience real estate
                        <br />
                        in the infinite virtual space.
                    </p>
                    <button className='mt-4 text-xs tracking-wide underline text-gray-300'>
                        LEARN MORE
                    </button>
                </div>

                {/* Right bottom arrow */}
                <div className='absolute bottom-10 right-10 opacity-70'>
                    <div className='w-24 h-px bg-white mb-2'></div>
                    <div className='text-3xl'>→</div>
                </div>
            </div>
        </div>
    );
}
