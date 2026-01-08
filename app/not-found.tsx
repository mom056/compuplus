"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);
    const [lang, setLang] = useState('en');

    useEffect(() => {
        setMounted(true);
        // Simple client-side lang detection from localStorage or default
        const storedLang = localStorage.getItem('compuplus-lang');
        if (storedLang) setLang(storedLang);
        else if (navigator.language.startsWith('ar')) setLang('ar');
    }, []);

    if (!mounted) return null;

    const isAr = lang === 'ar';

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px] animate-blob" />
            </div>

            <div className="z-10 max-w-lg w-full">
                {/* 404 Glitch Text */}
                <div className="relative mb-8">
                    <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500 animate-pulse tracking-tighter">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center opacity-50 blur-sm text-9xl font-black text-cyan-400 animate-pulse" style={{ animationDelay: '0.1s' }}>
                        404
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-sm">
                        <AlertTriangle size={16} />
                        <span>{isAr ? 'خطأ في النظام: الصفحة غير موجودة' : 'SYSTEM ERROR: PAGE_NOT_FOUND'}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                        {isAr ? 'يبدو أنك ضللت الطريق في الفضاء الرقمي' : 'Lost in Cyberspace?'}
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400">
                        {isAr
                            ? 'الصفحة التي تحاول الوصول إليها قد تكون حُذفت أو تم تغيير اسمها أو غير متاحة مؤقتاً.'
                            : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
                        }
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25"
                    >
                        <Home size={20} />
                        {isAr ? 'العودة للرئيسية' : 'Return Home'}
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-navy-800 text-slate-700 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:text-cyan-500 transition-all shadow-md"
                    >
                        <RefreshCw size={20} />
                        {isAr ? 'تحديث الصفحة' : 'Reload System'}
                    </button>
                </div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-8 text-sm text-slate-400 dark:text-slate-600 font-mono">
                Error Code: 0x404_NOT_FOUND
            </div>
        </div>
    );
}
