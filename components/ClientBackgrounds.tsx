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
        // Defer heavy components to after LCP paint
        const timer = setTimeout(() => {
            setShouldMount(true);
        }, 1500); // Reduced from 2000 for better UX balance
        return () => clearTimeout(timer);
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
