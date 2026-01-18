"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { LazyMotion, domAnimation } from 'framer-motion';
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

// Component to expose theme via context to match existing API
const AppContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [lang, setLang] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load saved language
        const savedLang = localStorage.getItem('lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLang(savedLang);
        }
    }, []);

    // Language Effect (Font & Dir)
    useEffect(() => {
        if (!mounted) return;
        const root = window.document.documentElement;

        // Keep LTR direction for all languages (as per previous logic)
        root.setAttribute('dir', 'ltr');
        root.setAttribute('lang', lang);

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
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const content = CONTENT[lang];
    // Use resolvedTheme (or 'dark' fallback) for context consumers
    const currentTheme = (mounted && resolvedTheme) ? resolvedTheme : 'dark';

    return (
        <AppContext.Provider value={{ lang, setLang, content, theme: currentTheme, toggleTheme }}>
            <LazyMotion features={domAnimation}>
                {children}
            </LazyMotion>
        </AppContext.Provider>
    );
};

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        // attribute="class" is crucial for Tailwind dark mode
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AppContentProvider>
                {children}
            </AppContentProvider>
        </ThemeProvider>
    );
}
