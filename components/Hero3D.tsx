"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Database, Wifi } from 'lucide-react';
import { useApp } from '@/app/providers';
import type { LucideIcon } from 'lucide-react';

const Hero3D = () => {
    const { content } = useApp();
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    // Cache dimensions to prevent forced reflows on every mouse move
    const dimensionsRef = useRef({ width: 0, height: 0, left: 0, top: 0 });

    // Update cached dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                dimensionsRef.current = {
                    width: rect.width,
                    height: rect.height,
                    left: rect.left,
                    top: rect.top
                };
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        window.addEventListener('scroll', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('scroll', updateDimensions);
        };
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = dimensionsRef.current;

        if (width === 0 || height === 0 || !innerRef.current) return;

        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        // Apply rotation directly to DOM - avoids React re-renders
        const rotateX = y * -15;
        const rotateY = x * 15;
        innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (innerRef.current) {
            innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={innerRef}
                className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] transform-style-3d transition-transform duration-150 ease-out"
            >
                {/* --- Interactive Network Lines (SVG) --- */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(0, 229, 255, 0.1)" />
                            <stop offset="50%" stopColor="rgba(0, 229, 255, 0.5)" />
                            <stop offset="100%" stopColor="rgba(0, 229, 255, 0.1)" />
                        </linearGradient>
                    </defs>
                    {/* Lines connecting center to nodes - Animated */}
                    <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-slow" />
                    <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-slow" style={{ animationDelay: '2s' }} />
                </svg>

                {/* --- Gyroscope Rings --- */}
                {/* Ring 1: Vertical */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/10 dark:border-cyan-500/30 border-t-cyan-500 dark:border-t-cyan-400 border-b-transparent animate-spin-slow transform-gpu will-change-transform shadow-lg shadow-cyan-500/5 dark:shadow-[0_0_20px_rgba(0,229,255,0.05)] pointer-events-none"></div>

                {/* Ring 2: Tilted */}
                <div className="absolute inset-8 md:inset-12 rounded-full border border-violet-500/10 dark:border-violet-500/30 border-r-violet-500 dark:border-r-violet-400 border-l-transparent animate-spin-reverse-slow duration-[15s] transform-gpu will-change-transform shadow-lg shadow-violet-500/5 dark:shadow-[0_0_20px_rgba(139,92,246,0.05)] pointer-events-none" style={{ transform: 'rotateX(60deg) rotateY(10deg)' }}></div>

                {/* --- Central Core --- */}
                <div className="absolute inset-0 m-auto w-32 h-32 md:w-48 md:h-48 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-2xl shadow-cyan-500/20 dark:shadow-cyan-500/10 z-20 hover:scale-105 transition-transform duration-300 cursor-pointer group/core will-change-transform" style={{ transform: 'translateZ(20px)' }}>
                    <div className="absolute inset-0 rounded-full bg-cyan-400/5 animate-ping-slow group-hover/core:animate-none pointer-events-none" />
                    <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                        {/* Using Next.js Image for automatic optimization */}
                        <Image
                            src="/logo-sm.png"
                            alt="CompuPlus Logo"
                            width={112}
                            height={112}
                            quality={75}
                            className="object-contain drop-shadow-lg w-full h-full"
                            priority
                        />
                    </div>
                </div>

                {/* --- Floating Service Nodes --- */}
                <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 perspective-500" style={{ transform: 'translateZ(60px)' }}>
                    <ServiceNode icon={Wifi} color="cyan" title="Infrastructure" />
                </div>

                <div className="absolute bottom-[10%] right-[-10%] md:right-[0%] z-30 perspective-500" style={{ transform: 'translateZ(90px)' }}>
                    <ServiceNode icon={Database} color="violet" title="ERP Solutions" />
                </div>

                <div className="absolute bottom-[10%] left-[-10%] md:left-[0%] z-30 perspective-500" style={{ transform: 'translateZ(90px)' }}>
                    <ServiceNode icon={ShieldCheck} color="indigo" title="Security" />
                </div>

            </div>
        </div>
    );
};

interface ServiceNodeProps {
    icon: LucideIcon;
    color: string;
    title: string;
}
const ServiceNode = ({ icon: Icon, color, title }: ServiceNodeProps) => {
    const bgClass = color === 'cyan' ? 'bg-cyan-500/10' : color === 'violet' ? 'bg-violet-500/10' : 'bg-indigo-500/10';
    const textClass = color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' : color === 'violet' ? 'text-violet-600 dark:text-violet-400' : 'text-indigo-600 dark:text-indigo-400';

    return (
        <div className={`glass-card p-3 rounded-2xl flex items-center gap-3 border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-navy-800/80 hover:ring-2 hover:ring-cyan-500/20`}>
            <div className={`p-2 rounded-xl ${bgClass} ${textClass}`}>
                <Icon size={24} />
            </div>
            <span className="font-bold text-slate-800 dark:text-white text-sm whitespace-nowrap">{title}</span>
        </div>
    )
}

export default Hero3D;
