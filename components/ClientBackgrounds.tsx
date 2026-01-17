"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
    ssr: false,
});

const AIChatbot = dynamic(() => import('@/components/AIChatbot'), {
    ssr: false,
});

export default function ClientBackgrounds() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Defer loading of heavy background elements to prioritize LCP content
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <ParticleBackground />
            <AIChatbot />
        </>
    );
}
