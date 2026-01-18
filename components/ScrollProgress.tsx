"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            if (windowHeight === 0) return;

            const scroll = totalScroll / windowHeight;

            // Use RAF to throttle updates
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setProgress(scroll);
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 origin-left z-[100] transition-transform duration-100 ease-out will-change-transform"
            style={{
                transform: `scaleX(${progress})`
            }}
        />
    );
}
