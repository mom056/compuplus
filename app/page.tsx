import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const Services = dynamic(() => import('@/components/Services'));
const Process = dynamic(() => import('@/components/Process'));
const AboutTimeline = dynamic(() => import('@/components/AboutTimeline'));
const WhyUs = dynamic(() => import('@/components/WhyUs'));
const TechOrbit = dynamic(() => import('@/components/TechOrbit'));
const Portfolio = dynamic(() => import('@/components/Portfolio'));
const Clients = dynamic(() => import('@/components/Clients'));
const CTA = dynamic(() => import('@/components/CTA'));
const Contact = dynamic(() => import('@/components/Contact'));

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
