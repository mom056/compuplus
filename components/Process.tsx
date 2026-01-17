"use client";

import React from 'react';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import { ClipboardList, PenTool, Code2, Rocket } from 'lucide-react';
import { PROCESS } from '../constants';
import { SpotlightCard } from './SpotlightCard';

const icons = [ClipboardList, PenTool, Code2, Rocket];

const Process: React.FC = () => {
  const { lang, content } = useApp();
  const processes = PROCESS(lang);

  return (
    <section className="py-32 bg-transparent backdrop-blur-none relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <Reveal width="100%">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full font-bold bg-white/50 dark:bg-navy-900/50">
              {content.process.badge}
            </span>
          </Reveal>
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-6 mb-6 tracking-tight">
              {content.process.title}
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {content.process.desc}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">

          {/* Continuous Connecting Line Background (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-slate-200 dark:bg-white/5 z-0"></div>

          {/* Pulse Animation Beam */}
          <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-0 opacity-50 animate-shimmer-fast"></div>

          {processes.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <Reveal key={idx} delay={idx * 0.2} width="100%" className="h-full">
                <div className="relative group h-full pt-8">

                  {/* Connecting Line (Mobile) - Vertical */}
                  {idx < processes.length - 1 && (
                    <div className="md:hidden absolute left-1/2 -ml-[1px] top-24 bottom-[-32px] w-0.5 bg-slate-200 dark:bg-white/5 z-0">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" />
                    </div>
                  )}

                  <SpotlightCard className="h-full rounded-3xl p-6 glass-card border border-slate-200/60 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden text-center flex flex-col items-center">

                    {/* Large Watermark Number */}
                    <span className="absolute -right-4 -top-6 text-[120px] font-black text-slate-100 dark:text-white/[0.02] select-none pointer-events-none leading-none z-0">
                      {idx + 1}
                    </span>

                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-500 shadow-lg">
                      <Icon size={32} className="text-slate-400 dark:text-slate-300 group-hover:text-white transition-colors" />

                      {/* Step Badge */}
                      <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400 shadow-sm z-20">
                        {idx + 1}
                      </div>
                    </div>

                    <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="relative z-10 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </SpotlightCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;