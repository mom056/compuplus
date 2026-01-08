"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import { Building2, Grid, Activity, Search, X, Zap, Database } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientImage {
    name: string;
    src: string;
}

const Clients: React.FC = () => {
    const { lang } = useApp();
    const [clients, setClients] = useState<ClientImage[]>([]);
    const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const title = lang === 'ar' ? 'شركاء النجاح' : 'Trusted By Industry Leaders';

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/clients');
                const data = await response.json();
                if (data.clients) {
                    setClients(data.clients);
                }
            } catch (error) {
                console.error('Failed to fetch clients', error);
            }
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Split for double marquee (Orbit Mode)
    const midpoint = Math.ceil(clients.length / 2);
    // Duplicate arrays for seamless infinite scroll
    const row1 = [...clients.slice(0, midpoint), ...clients.slice(0, midpoint), ...clients.slice(0, midpoint), ...clients.slice(0, midpoint)];
    const row2 = [...clients.slice(midpoint), ...clients.slice(midpoint), ...clients.slice(midpoint), ...clients.slice(midpoint)];

    // Ensure we have enough data even if small
    const orbitRow1 = clients.length < 5 ? [...clients, ...clients, ...clients, ...clients] : row1;
    const orbitRow2 = clients.length < 5 ? [...clients, ...clients, ...clients, ...clients] : row2;

    return (
        <section
            ref={containerRef}
            className="py-24 pb-16 relative overflow-hidden min-h-[700px] flex flex-col"
        >
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-transparent bg-[radial-gradient(circle_800px_at_50%_50%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 border-b border-slate-200 dark:border-white/10 pb-8">

                    {/* Header + Digital Badge */}
                    <div className="text-center lg:text-left flex-1">
                        <Reveal width="100%">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                                </span>
                                <span className="text-cyan-500 font-mono text-sm tracking-[0.2em] uppercase">
                                    {lang === 'ar' ? 'نظام الشركاء متصل' : 'PARTNER SYSTEM ONLINE'}
                                </span>
                            </div>
                        </Reveal>
                        <Reveal width="100%" delay={0.1}>
                            <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 dark:from-white to-slate-700 dark:to-white/50 tracking-tighter mb-2">
                                {title}
                            </h3>
                        </Reveal>
                        <Reveal width="100%" delay={0.2}>
                            <p className="text-slate-400 text-lg font-light tracking-wide">
                                {lang === 'ar' ? 'تحالفات إستراتيجية تصنع المستقبل' : 'Strategic alliances shaping the future.'}
                            </p>
                        </Reveal>
                    </div>

                    {/* Futuristic Controls */}
                    <div className="flex flex-col gap-4 items-end">
                        <div className="flex bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full p-1.5 border border-slate-200 dark:border-white/10 shadow-2xl">
                            {['orbit', 'grid'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode as any)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                                        ${viewMode === mode
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {mode === 'orbit' ? <Activity className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                                    <span className="uppercase tracking-wider">{mode}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search Bar (Auto-expands) */}
                        <AnimatePresence>
                            {viewMode === 'grid' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, width: 0 }}
                                    animate={{ opacity: 1, y: 0, width: 'auto' }}
                                    exit={{ opacity: 0, y: -10, width: 0 }}
                                    className="relative group w-full lg:w-80"
                                >
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50 group-focus-within:text-cyan-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder={lang === 'ar' ? 'بحث في قاعدة البيانات...' : 'Search database...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-cyan-50 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-slate-900/80 transition-all shadow-inner"
                                        autoFocus
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Display Area */}
            <div className="relative w-full flex-1 min-h-[400px]">

                {/* 1. ORBIT MODE (Improved Marquee) */}
                <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center gap-12 md:gap-20 ${viewMode === 'orbit' ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
                    {clients.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-cyan-500/50 gap-4">
                            <Activity className="w-12 h-12 animate-pulse" />
                            <span className="font-mono text-sm tracking-widest animate-pulse">
                                {lang === 'ar' ? 'جاري تحميل البيانات...' : 'INITIALIZING DATA STREAM...'}
                            </span>
                        </div>
                    ) : (
                        <>
                            {/* Row 1 */}
                            <div className="relative group/track">
                                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent top-1/2 -translate-y-1/2" />
                                <div className="flex animate-marquee gap-8 md:gap-16 min-w-full items-center py-4 group-hover/track:[animation-play-state:paused] transition-all">
                                    {orbitRow1.map((client, idx) => (
                                        <HoloCard key={`m1-${idx}`} client={client} index={idx} />
                                    ))}
                                </div>
                            </div>

                            {/* Row 2 (Reverse) */}
                            <div className="relative group/track">
                                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent top-1/2 -translate-y-1/2" />
                                <div className="flex animate-marquee-reverse gap-8 md:gap-16 min-w-full items-center py-4 group-hover/track:[animation-play-state:paused] transition-all">
                                    {orbitRow2.map((client, idx) => (
                                        <HoloCard key={`m2-${idx}`} client={client} index={idx + 100} reverse />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* 2. GRID MODE (Searchable) */}
                <div className={`max-w-[1400px] mx-auto px-6 pb-20 transition-all duration-700 ${viewMode === 'grid' ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 absolute inset-0 pointer-events-none translate-y-20'}`}>
                    {filteredClients.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {filteredClients.map((client, idx) => (
                                <SpotlightCard key={`g-${idx}`} className="rounded-xl border-white/5 bg-slate-900/40 hover:bg-slate-800/60 p-6 aspect-square flex flex-col items-center justify-center group gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30">
                                    <div className="relative w-full h-full p-2">
                                        <img
                                            src={client.src}
                                            alt={client.name}
                                            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="w-full text-center border-t border-white/5 pt-3">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono group-hover:text-cyan-400 transition-colors block truncate">
                                            {client.name}
                                        </span>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-slate-600">
                            <Database className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-xl font-light">No records found within sector "{searchQuery}"</p>
                            <button onClick={() => setSearchQuery('')} className="mt-4 text-cyan-500 hover:text-cyan-400 underline decoration-dashed underline-offset-4">Reset Parameters</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Live Data Bar (Footer HUD) */}
            <div className="mt-auto w-full h-12 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-6 md:px-12 text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest z-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-emerald-500">
                        <Zap className="w-3 h-3 filled" />
                        <span>SYSTEM OPTIMAL</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <span>LATENCY: 12ms</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden md:inline">INDEXED: {clients.length} PARTNERS</span>
                    <span className="text-cyan-500 animate-pulse">LIVE FEED ●</span>
                </div>
            </div>

        </section>
    );
};

const HoloCard = ({ client, index, reverse }: { client: ClientImage, index: number, reverse?: boolean }) => (
    <div className="relative group/card cursor-pointer perspective-1000">
        <div className={`
            relative w-48 h-32 md:w-64 md:h-40 
            rounded-tr-[2rem] rounded-bl-[2rem] 
            bg-slate-900/30 backdrop-blur-sm 
            border border-white/5 
            flex items-center justify-center p-8 
            transition-all duration-500 
            hover:scale-110 hover:z-50 hover:bg-slate-900/80 
            hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]
            origin-center
            ${reverse ? 'skew-x-[-12deg] hover:skew-x-0' : 'skew-x-[12deg] hover:skew-x-0'}
        `}>
            {/* Tech Markers */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </div>
            <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-tr-[2rem] rounded-bl-[2rem] opacity-0 group-hover/card:opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent translate-y-[-100%] group-hover/card:translate-y-[100%] transition-transform duration-1000" />
            </div>

            <img
                src={client.src}
                alt={client.name}
                className={`
                    w-full h-full object-contain 
                    opacity-90 
                    group-hover/card:opacity-100 
                    transition-all duration-500 
                    filter drop-shadow-lg
                    ${reverse ? 'skew-x-[12deg] group-hover/card:skew-x-0' : 'skew-x-[-12deg] group-hover/card:skew-x-0'}
                `}
                loading="lazy"
            />
        </div>

        {/* Holographic Tooltip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-2 group-hover/card:translate-y-0 pointer-events-none z-50 whitespace-nowrap">
            <div className="bg-cyan-950/90 text-cyan-400 text-[10px] font-mono tracking-widest px-3 py-1 rounded border border-cyan-500/30 shadow-xl backdrop-blur-md">
                {client.name}
            </div>
        </div>
    </div>
);

export default Clients;
