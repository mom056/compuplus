"use client";

import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValue } from 'framer-motion';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import { SpotlightCard } from './SpotlightCard';

const AboutTimeline = () => {
  const { lang, content } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
              {lang === 'ar' ? 'شفرة' : 'The'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 animate-gradient-x">{lang === 'ar' ? 'التطور' : 'Evolution'}</span> {lang === 'en' && 'Code'}
            </h2>
          </Reveal>

          <Reveal width="100%" delay={0.2}>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">
              {lang === 'ar' ? 'من جذور الهاردوير إلى قوة رقمية شاملة.' : 'From pure hardware roots to a digital powerhouse.'}
            </p>
          </Reveal>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Central Circuit Line Background (Dashed/Techy) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent" />

          {/* Active Lit Circuit Line */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-400 via-violet-500 to-cyan-400 shadow-[0_0_20px_rgba(139,92,246,0.8)] rounded-full z-10 origin-top"
            style={{ scaleY: scaleY, height: "100%" }}
          />

          <div className="space-y-32 py-10">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <TimelineItem
                  key={index}
                  event={event}
                  index={index}
                  isEven={isEven}
                  total={timelineEvents.length}
                  mainProgress={scaleY}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component to handle individual scroll logic performantly
interface TimelineItemProps {
  event: { year: string; title: string; description: string; type: string };
  index: number;
  isEven: boolean;
  total: number;
  mainProgress: any; // Using 'any' briefly to fix type complexity with useSpring return type
}

const TimelineItem = ({ event, index, isEven, total, mainProgress }: TimelineItemProps) => {
  // For the first item (index 0), we want it visible immediately
  // For others, calculate based on scroll progress
  const rangeStart = index === 0 ? -0.1 : (index / total) - 0.1;

  const isActiveValue = useTransform(mainProgress, (value: number) => value >= rangeStart ? 1 : 0);

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Content Box */}
      <div className={`flex-1 w-full ${isEven ? 'md:text-right md:rtl:text-left' : 'md:text-left md:rtl:text-right'} relative perspective-1000`}>

        {/* Mega Year (Background Layer) */}
        <motion.span
          className={`absolute top-1/2 -translate-y-1/2 text-[100px] md:text-[140px] font-black text-slate-100 dark:text-white/[0.02] select-none pointer-events-none z-0
                    ${isEven ? 'right-0 md:-right-20' : 'left-0 md:-left-20'}
                `}
          style={{
            WebkitTextStroke: '1px rgba(128,128,128,0.1)',
            opacity: isActiveValue,
            scale: useTransform(isActiveValue, [0, 1], [0.9, 1]),
            x: useTransform(isActiveValue, [0, 1], [0, 0]),
            y: useTransform(isActiveValue, [0, 1], [40, 0])
          }}
        >
          {event.year}
        </motion.span>

        <motion.div
          className="relative z-10"
          style={{
            opacity: isActiveValue,
            y: useTransform(isActiveValue, [0, 1], [80, 0])
          }}
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
        </motion.div>
      </div>

      {/* Center Node (Circuit Breaker) */}
      <div className="relative flex items-center justify-center shrink-0 w-12 h-12 z-20">
        {/* Outer Rings - using motion for opacity/scale */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-slate-300 dark:border-white/20"
          style={{
            borderColor: useTransform(isActiveValue, (v: number) => v > 0.5 ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.2)'),
            rotate: useTransform(mainProgress, [0, 1], [0, 360])
          }}
        />

        {/* Core Node */}
        <motion.div
          className="w-6 h-6 rounded-full z-10 bg-slate-200 dark:bg-navy-700"
          style={{
            backgroundColor: useTransform(isActiveValue, (v: number) => v > 0.5 ? 'rgb(34,211,238)' : 'rgb(51,65,85)'),
            scale: useTransform(isActiveValue, [0, 1], [1, 1.2]),
            boxShadow: useTransform(isActiveValue, (v: number) => v > 0.5 ? '0 0 20px cyan' : 'none')
          }}
        />

        {/* Connecting Arms */}
        <motion.div
          className={`absolute h-0.5 bg-cyan-500/50 ${isEven ? 'right-1/2' : 'left-1/2'}`}
          style={{
            width: useTransform(isActiveValue, [0, 1], ['0%', '200%']),
            opacity: isActiveValue
          }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1 w-full hidden md:block" />
    </div>
  );
};

export default AboutTimeline;