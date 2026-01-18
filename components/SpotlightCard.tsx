"use client";

import React, { useRef, useEffect, useCallback } from "react";

export const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Use CSS variables for performance - no React re-renders
        ref.current.style.setProperty('--mouse-x', `${x}px`);
        ref.current.style.setProperty('--mouse-y', `${y}px`);
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={`group relative border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-navy-900/40 overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(650px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(14, 165, 233, 0.15), transparent 80%)`
                }}
            />
            {children}
        </div>
    );
};
