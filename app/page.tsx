"use client";

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import AboutTimeline from '@/components/AboutTimeline';
import WhyUs from '@/components/WhyUs';
import TechOrbit from '@/components/TechOrbit';
import Portfolio from '@/components/Portfolio';
import { useApp } from './providers';
import Clients from '@/components/Clients';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import dynamic from 'next/dynamic';

const VideoShowcase = dynamic(() => import('@/components/VideoShowcase'), {
    ssr: false, // Video player is client-heavy and doesn't need SSR
    loading: () => <div className="h-screen bg-black animate-pulse" /> // Placeholder
});

export default function Home() {
    return (
        <>
            {/* Content Wrapper - relative to sit on top of fixed background */}
            <div className="relative z-10 flex flex-col">
                <Hero />
                <Services />
                <WhyUs />
                <Process />
                <TechOrbit />
                <AboutTimeline />
                <Portfolio />
                {/* <Testimonials />Replaced with Video */}
                <VideoShowcase />
                <CTA />
                <Clients />
                <Contact />
            </div>
        </>
    );
}
