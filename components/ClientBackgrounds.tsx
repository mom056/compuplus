"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
    ssr: false,
});

const AIChatbot = dynamic(() => import('@/components/AIChatbot'), {
    ssr: false,
});

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
    ssr: false,
});

export default function ClientBackgrounds() {
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        // Use requestIdleCallback for efficient deferred loading
        // Falls back to setTimeout on browsers without support
        const scheduleMount = () => {
            if ('requestIdleCallback' in window) {
                (window as typeof window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
                    .requestIdleCallback(() => setShouldMount(true), { timeout: 2000 });
            } else {
                setTimeout(() => setShouldMount(true), 1500);
            }
        };
        scheduleMount();
    }, []);

    if (!shouldMount) {
        return null; // Render nothing initially
    }

    return (
        <>
            <ScrollProgress />
            <ParticleBackground />
            <AIChatbot />
        </>
    );
}
