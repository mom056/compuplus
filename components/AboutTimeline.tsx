"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import { SpotlightCard } from './SpotlightCard';

const AboutTimeline = () => {
  const { lang, content } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use Intersection Observer + scroll listener instead of framer-motion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = container.offsetHeight;

      // Calculate progress: 0 when top enters viewport, 1 when bottom leaves
      const progress = Math.min(
        Math.max(
          (windowHeight - rect.top) / (containerHeight + windowHeight),
          0
        ),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    {
      year: "1997",
      title: lang === 'ar' ? "التأسيس والبنية التحتية" : "Inception & Infrastructure",
      description: lang === 'ar'
        ? "البداية كخبراء في الشبكات والبنية التحتية، وضعنا الأساس للأنظمة القوية التي نعتمد عليها اليوم."
        : "Launched as network architecture specialists. We didn't just run cables; we engineered the nervous systems of modern enterprises.",
      type: "hardware"
    },
    {
      year: "2005",
      title: lang === 'ar' ? "عصر البرمجيات المخصصة" : "The Software Pivot",
      description: lang === 'ar'
        ? "توسعنا لتطوير البرمجيات المخصصة، سد الفجوة بين الأجهزة والحلول الرقمية الذكية."
        : "Recognized that hardware needs a soul. Expanded into custom software development, bridging the gap between silicon and logic.",
      type: "software"
    },
    {
      year: "2012",
      title: lang === 'ar' ? "ثورة الأمن والأنظمة" : "Security & Systems Integration",
      description: lang === 'ar'
        ? "دمجنا أنظمة الأمن المتقدمة مع حلولنا، لنقدم حماية متكاملة للمؤسسات."
        : "Integrated advanced security systems. Because in a connected world, a robust network must also be a fortress.",
      type: "hardware"
    },
    {
      year: "2018",
      title: lang === 'ar' ? "شراكة Odoo الرسمية" : "Odoo Official Partnership",
      description: lang === 'ar'
        ? "أصبحنا شركاء معتمدين لـ Odoo، مما مكننا من تقديم حلول ERP عالمية المستوى."
        : "Achieved Odoo Official Partner status. We started deploying world-class ERP solutions that run businesses on autopilot.",
      type: "software"
    },
    {
      year: "2024",
      title: lang === 'ar' ? "التحول الرقمي 360" : "360° Digital Transformation",
      description: lang === 'ar'
        ? "اليوم، نقدم حلولاً شاملة من الكابل إلى الكلاود، نغطي كل جانب من جوانب التكنولوجيا."
        : "From Cable to Cloud. We now deliver end-to-end tech ecosystems where infrastructure, software, and security operate as one unified intelligence.",
      type: "hybrid"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-slate-50 dark:bg-navy-950 transition-colors duration-700">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32 relative">
          <Reveal width="100%">
            <div className="inline-block relative">
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 opacity-20 blur-lg animate-pulse"></span>
              <span className="relative text-cyan-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-[0.2em] border border-cyan-500/30 px-4 py-2 rounded-lg font-bold bg-white/50 dark:bg-navy-900/50 backdrop-blur-md">
                {lang === 'ar' ? 'رحلة' : 'Timeline'}
              </span>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mt-8 mb-6 tracking-tighter">
              {lang === 'ar' ? 'شفرة' : 'The'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600">{lang === 'ar' ? 'التطور' : 'Evolution'}</span> {lang === 'en' && 'Code'}
            </h2>
          </Reveal>

          <Reveal width="100%" delay={0.2}>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">
              {lang === 'ar' ? 'من جذور الهاردوير إلى قوة رقمية شاملة.' : 'From pure hardware roots to a digital powerhouse.'}
            </p>
          </Reveal>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Central Circuit Line Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent" />

          {/* Active Lit Circuit Line - CSS animated with scroll progress */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-400 via-violet-500 to-cyan-400 shadow-[0_0_20px_rgba(139,92,246,0.8)] rounded-full z-10 origin-top transition-transform duration-100"
            style={{
              height: '100%',
              transform: `scaleY(${scrollProgress})`,
              transformOrigin: 'top'
            }}
          />

          <div className="space-y-32 py-10">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const itemProgress = (index / timelineEvents.length);
              const isActive = scrollProgress >= itemProgress - 0.1;

              return (
                <TimelineItem
                  key={index}
                  event={event}
                  index={index}
                  isEven={isEven}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Simplified sub-component using CSS animations
interface TimelineItemProps {
  event: { year: string; title: string; description: string; type: string };
  index: number;
  isEven: boolean;
  isActive: boolean;
}

const TimelineItem = ({ event, index, isEven, isActive }: TimelineItemProps) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Content Box */}
      <div className={`flex-1 w-full ${isEven ? 'md:text-right md:rtl:text-left' : 'md:text-left md:rtl:text-right'} relative`}>

        {/* Mega Year (Background Layer) */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 text-[100px] md:text-[140px] font-black text-slate-100 dark:text-white/[0.02] select-none pointer-events-none z-0 transition-all duration-700
                    ${isEven ? 'right-0 md:-right-20' : 'left-0 md:-left-20'}
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
          style={{ WebkitTextStroke: '1px rgba(128,128,128,0.1)' }}
        >
          {event.year}
        </span>

        <div
          className={`relative z-10 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <SpotlightCard className="h-full p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-colors duration-500 group-hover:border-cyan-500/30">
            <div className="flex flex-col gap-2">
              <span className={`text-4xl font-bold font-mono px-4 py-1 w-fit rounded-full bg-slate-100 dark:bg-white/5 mb-4 ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                {event.year}
              </span>
              <h3 className={`text-3xl font-bold mb-3 ${event.type === 'software' ? 'text-violet-600 dark:text-violet-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                {event.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{event.description}</p>
            </div>

            {/* Circuit Decor corners */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-slate-300 dark:border-white/20" />
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-slate-300 dark:border-white/20" />
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-slate-300 dark:border-white/20" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-slate-300 dark:border-white/20" />
          </SpotlightCard>
        </div>
      </div>

      {/* Center Node (Circuit Breaker) */}
      <div className="relative flex items-center justify-center shrink-0 w-12 h-12 z-20">
        {/* Outer Ring */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-500 ${isActive ? 'border-cyan-500/50 rotate-180' : 'border-slate-300 dark:border-white/20 rotate-0'}`}
        />

        {/* Core Node */}
        <div
          className={`w-6 h-6 rounded-full z-10 transition-all duration-500 ${isActive ? 'bg-cyan-400 scale-125 shadow-[0_0_20px_cyan]' : 'bg-slate-400 dark:bg-navy-700 scale-100'}`}
        />

        {/* Connecting Arms */}
        <div
          className={`absolute h-0.5 bg-cyan-500/50 transition-all duration-500 ${isEven ? 'right-1/2' : 'left-1/2'} ${isActive ? 'w-[200%] opacity-100' : 'w-0 opacity-0'}`}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1 w-full hidden md:block" />
    </div>
  );
};

export default AboutTimeline;