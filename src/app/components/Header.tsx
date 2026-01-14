import React, { useState } from 'react';
import { useFirebase } from '@/app/context/FirebaseContext';

interface HeaderProps {
    onBack?: () => void;
    onHome: () => void;
    isMobile: boolean;
}

export function Header({ onBack, onHome, isMobile }: HeaderProps) {
    const { currentUser, logout } = useFirebase();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState<'EN' | 'TA'>('EN');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLanguage = () => setLanguage(prev => prev === 'EN' ? 'TA' : 'EN');

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const handleEditProfile = () => {
        alert("Edit Profile Feature coming soon!");
        setIsMenuOpen(false);
    };

    const handleSwitchMode = () => {
        alert("Switch Role Feature coming soon!");
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left: Navigation */}
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-[#1A2238]">
                            {/* Back Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    <button onClick={onHome} className="p-2 hover:bg-gray-100 rounded-full text-[#1A2238]">
                        {/* Home Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </button>

                    {!isMobile && (
                        <span className="text-xl font-bold text-[#1A2238]">V Serve U</span>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 rounded-lg border border-gray-200 text-sm font-medium text-[#1A2238] hover:bg-gray-50 bg-white"
                    >
                        {language}
                    </button>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={toggleMenu}
                            className="flex items-center md:gap-2 p-1 md:pr-4 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            {!isMobile && currentUser && (
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-medium text-[#1A2238] leading-none">{currentUser.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                                </div>
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                                    <p className="text-sm font-medium text-[#1A2238]">{currentUser?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
                                </div>
                                <button onClick={handleEditProfile} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <span>Edit Profile</span>
                                </button>
                                {currentUser?.role === 'worker' && (
                                    <button onClick={handleSwitchMode} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <span>Switch to User</span>
                                    </button>
                                )}
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
