"use client";

import Hero from '@/components/Hero';
import { useApp } from './providers';
import dynamic from 'next/dynamic';

// Placeholder for loading states
const SectionPlaceholder = () => (
    <div className="min-h-[300px] animate-pulse bg-gradient-to-b from-transparent via-slate-200/10 to-transparent" />
);

// Critical path: load with SSR for fast LCP
const Services = dynamic(() => import('@/components/Services'), {
    loading: () => <SectionPlaceholder />
});

// Below-fold components: ssr:false reduces initial bundle
const Process = dynamic(() => import('@/components/Process'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});
const AboutTimeline = dynamic(() => import('@/components/AboutTimeline'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});
const WhyUs = dynamic(() => import('@/components/WhyUs'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});
const TechOrbit = dynamic(() => import('@/components/TechOrbit'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});
const Portfolio = dynamic(() => import('@/components/Portfolio'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});
const Clients = dynamic(() => import('@/components/Clients'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});
const CTA = dynamic(() => import('@/components/CTA'), {
    ssr: false
});
const Contact = dynamic(() => import('@/components/Contact'), {
    ssr: false,
    loading: () => <SectionPlaceholder />
});

// VideoShowcase is heavy and interactive, strictly client-side
const VideoShowcase = dynamic(() => import('@/components/VideoShowcase'), {
    ssr: false,
    loading: () => <div className="h-screen bg-black animate-pulse" />
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
