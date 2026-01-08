import React, { useEffect, useState, useRef } from 'react';
import { STATS } from '../constants';
import { ShieldCheck, Zap, Server, Activity, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import { SpotlightCard } from './SpotlightCard';

const WhyUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { lang, content } = useApp();

  const stats = STATS(lang);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="py-32 bg-transparent relative transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 1. Main Text Block (Span 6 on desktop) */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col justify-center mb-8 lg:mb-0">
            <Reveal width="100%">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold">
                  {content.whyUs.badge}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                {content.whyUs.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {content.whyUs.desc}
              </p>
            </Reveal>
          </div>

          {/* 2. Feature Cards (Span 3 each) */}
          <div className="md:col-span-6 lg:col-span-3">
            <Reveal delay={0.2} width="100%" className="h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 shadow-sm">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{content.whyUs.card1Title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{content.whyUs.card1Desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>

          <div className="md:col-span-6 lg:col-span-3">
            <Reveal delay={0.3} width="100%" className="h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/10 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{content.whyUs.card2Title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{content.whyUs.card2Desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* 3. Stats Row (Span 3 each) */}
          {stats.map((stat, idx) => (
            <div key={idx} className="md:col-span-6 lg:col-span-3">
              <Reveal delay={0.4 + (idx * 0.1)} width="100%">
                <SpotlightCard className="rounded-3xl p-6 group relative overflow-hidden">
                  {/* Decorative Background Icon */}
                  <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-white/5 opacity-50 rotate-12 group-hover:scale-110 transition-transform duration-500" />

                  <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
                    <div className="flex justify-between items-start mb-4">
                      <stat.icon className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
                      <ArrowUpRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 transition-colors" />
                    </div>

                    <div>
                      <div className="text-4xl font-black text-slate-900 dark:text-white mb-1 flex items-baseline gap-0.5">
                        {isVisible ? <Counter target={parseInt(stat.value)} /> : '0'}
                        <span className="text-cyan-600 dark:text-cyan-400 text-xl">{stat.suffix}</span>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

const Counter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

export default WhyUs;