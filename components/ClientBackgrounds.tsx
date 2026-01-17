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
    return (
        <>
            <ParticleBackground />
            <AIChatbot />
        </>
    );
}
