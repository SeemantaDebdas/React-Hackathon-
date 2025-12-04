import React, { useEffect, useState } from "react";
import {
    PanelLeftClose,
    PanelLeft,
    LayoutDashboard,
    MessageSquare,
    FileText,
    Settings,
    Users,
    BarChart3,
    ChevronDown,
    User,
    Bell,
    LogOut,
    Shield,
    Palette,
    Lock,
    List,
} from "lucide-react";

import { useAuthStore } from "../features/auth/authStore";
import { useNavigate } from "react-router-dom";
import ChatPage from "../features/chatbot/ChatPage";
import Dashboard from "../features/dashboard/Dashboard";
import DocumentUploadPage from "../features/upload/DocumentUploadPage";
import DataList from "../features/list/DataList";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "conversations", icon: MessageSquare, label: "Conversations" },
        { id: "documents", icon: FileText, label: "Documents" },
        { id: "list", icon: List, label: "Data List" },
    ];

    const dropdownItems = [
        { id: "profile", icon: User, label: "Profile" },
        { id: "preferences", icon: Palette, label: "Preferences" },
        { id: "security", icon: Lock, label: "Security" },
        { id: "notifications", icon: Bell, label: "Notifications" },
        { id: "logout", icon: LogOut, label: "Logout", danger: true },
    ];

    const handleDropdownClick = (itemId) => {
        if (itemId === "logout") {
            logout(); // Zustand logout
            navigate("/login"); // Redirect to login screen
            return;
        }

        console.log(`Clicked: ${itemId}`);
        setDropdownOpen(false);
    };

    const renderContent = () => {
        switch (activeMenu) {
            case "dashboard":
                return <Dashboard />;
            case "conversations":
                return <ChatPage />;
            case "documents":
                return <DocumentUploadPage />;
            case "list":
                return <DataList />;
            default:
                return null;
        }
    };

    return (
        <div className='h-screen w-full flex flex-col bg-app-bg text-text-main overflow-hidden'>
            {/* HEADER */}
            <header className='h-16 border-b border-border/50 flex items-center justify-between px-6 bg-surface-base/80 backdrop-blur-xl z-20'>
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='p-2 rounded-lg hover:bg-surface-hover transition-colors'
                    >
                        {sidebarOpen ? (
                            <PanelLeftClose className='w-5 h-5 text-text-secondary' />
                        ) : (
                            <PanelLeft className='w-5 h-5 text-text-secondary' />
                        )}
                    </button>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20'>
                            <span className='text-text-dark font-bold text-sm'>
                                V
                            </span>
                        </div>
                        <span className='text-xl font-bold tracking-tight text-text-main'>
                            VOXA
                        </span>
                    </div>
                </div>

                {/* User Avatar & Dropdown */}
                <div className='relative'>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className='flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-surface-hover transition-all duration-200 group'
                    >
                        <div className='w-9 h-9 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center'>
                            <User className='w-4 h-4 text-primary' />
                        </div>
                        <div className='text-left hidden md:block'>
                            <div className='text-sm font-semibold text-text-main'>
                                {user?.username || "Username"}
                            </div>
                            <div className='text-xs text-text-secondary flex items-center gap-1'>
                                <Shield className='w-3 h-3' />
                                {user?.role.toUpperCase() || "Admin"}
                            </div>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                                dropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <>
                            <div
                                className='fixed inset-0 z-30'
                                onClick={() => setDropdownOpen(false)}
                            ></div>
                            <div className='absolute right-0 mt-2 w-56 rounded-xl bg-surface-base border border-border/50 shadow-2xl shadow-black/50 z-40 overflow-hidden'>
                                {dropdownItems.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            handleDropdownClick(item.id)
                                        }
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                            item.danger
                                                ? "text-red-400 hover:bg-red-500/10"
                                                : "text-text-main hover:bg-surface-hover"
                                        } ${
                                            index === dropdownItems.length - 1
                                                ? "border-t border-border/50"
                                                : ""
                                        }`}
                                    >
                                        <item.icon className='w-4 h-4' />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </header>

            <div className='flex-1 flex overflow-hidden'>
                {/* SIDEBAR */}
                <aside
                    className={`${
                        sidebarOpen ? "w-64" : "w-20"
                    } border-r border-border/50 bg-surface-base/80 backdrop-blur-xl transition-all duration-300 flex flex-col`}
                >
                    <nav className='flex-1 p-4 space-y-2'>
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveMenu(item.id);

                                    // close sidebar only once, safely
                                    if (item.id === "conversations") {
                                        setSidebarOpen(false);
                                    }
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                                    activeMenu === item.id
                                        ? "bg-primary/10 text-primary border border-primary/30 shadow-lg shadow-primary/5"
                                        : "text-text-secondary hover:text-text-main hover:bg-surface-hover"
                                }`}
                            >
                                <item.icon className='w-5 h-5 flex-shrink-0' />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-200 ${
                                        sidebarOpen
                                            ? "opacity-100"
                                            : "opacity-0 w-0 overflow-hidden"
                                    }`}
                                >
                                    {item.label}
                                </span>

                                {/* Tooltip for collapsed state */}
                                {!sidebarOpen && (
                                    <div className='absolute left-full ml-2 px-3 py-2 bg-surface-base border border-border/50 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-xl'>
                                        {item.label}
                                    </div>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className='flex-1 flex flex-col overflow-hidden'>
                    {/* Content Area */}
                    <div className='flex-1 overflow-y-auto bg-gradient-to-b from-app-bg via-app-bg to-surface-base/20'>
                        {renderContent()}
                    </div>

                    {/* FOOTER */}
                    <footer className='h-14 border-t border-border/50 bg-surface-base/80 backdrop-blur-xl flex items-center justify-between px-8'>
                        <div className='flex items-center gap-6 text-xs text-text-secondary'>
                            <span>© 2025 VOXA</span>
                            <a
                                href='#'
                                className='hover:text-text-main transition-colors'
                            >
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='hover:text-text-main transition-colors'
                            >
                                Terms of Service
                            </a>
                        </div>
                        <div className='text-xs text-text-secondary'>
                            Version 1.0.0
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
