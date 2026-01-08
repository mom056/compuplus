"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { CONTENT, Language } from '../constants';

// Create Context
interface AppContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    content: typeof CONTENT['en'];
    theme: string;
    toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType>({
    lang: 'en',
    setLang: () => { },
    content: CONTENT.en,
    theme: 'dark',
    toggleTheme: () => { },
});

export const useApp = () => useContext(AppContext);

export function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState('dark');
    const [lang, setLang] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    // Mark as mounted after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Theme Initialization Effect
    useEffect(() => {
        if (!mounted) return;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }

        // Load saved language
        const savedLang = localStorage.getItem('lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLang(savedLang);
        }
    }, [mounted]);

    // Theme Effect
    useEffect(() => {
        if (!mounted) return;
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    // Language Effect (Keep LTR for all languages, just change font)
    useEffect(() => {
        if (!mounted) return;
        const root = window.document.documentElement;

        // Keep LTR direction for all languages
        root.setAttribute('dir', 'ltr');
        root.setAttribute('lang', lang);

        // Save language to localStorage
        localStorage.setItem('lang', lang);

        // Change font for Arabic
        if (lang === 'ar') {
            document.body.classList.add('font-cairo');
            document.body.classList.remove('font-sans');
        } else {
            document.body.classList.remove('font-cairo');
            document.body.classList.add('font-sans');
        }
    }, [lang, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const content = CONTENT[lang];

    // Prevent hydration mismatch by not rendering children until mounted
    if (!mounted) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <AppContext.Provider value={{ lang, setLang, content, theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
}
