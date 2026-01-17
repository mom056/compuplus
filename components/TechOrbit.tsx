"use client";

import React from 'react';
import { Code, Database, Globe, Lock, Server, Cloud, Cpu, Smartphone, Zap } from 'lucide-react';
import { useApp } from '@/app/providers';

import { Reveal } from './Reveal';

const TechOrbit: React.FC = () => {
  const { lang, content } = useApp();
  const techs = [
    { icon: Code, label: 'React', color: 'text-cyan-600 dark:text-cyan-400', shadow: 'shadow-cyan-500/50' },
    { icon: Server, label: 'Node.js', color: 'text-green-600 dark:text-green-400', shadow: 'shadow-green-500/50' },
    { icon: Database, label: 'SQL', color: 'text-blue-600 dark:text-blue-400', shadow: 'shadow-blue-500/50' },
    { icon: Globe, label: 'Next.js', color: 'text-slate-800 dark:text-white', shadow: 'shadow-slate-500/50' },
    { icon: Lock, label: 'Security', color: 'text-red-600 dark:text-red-400', shadow: 'shadow-red-500/50' },
    { icon: Cloud, label: 'AWS', color: 'text-yellow-600 dark:text-yellow-400', shadow: 'shadow-yellow-500/50' },
    { icon: Smartphone, label: 'Mobile', color: 'text-violet-600 dark:text-violet-400', shadow: 'shadow-violet-500/50' },
    { icon: Cpu, label: 'IoT', color: 'text-orange-600 dark:text-orange-400', shadow: 'shadow-orange-500/50' },
  ];

  return (
    <section className="py-32 bg-transparent relative transition-colors duration-500 overflow-hidden">
      {/* Nebula Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/20 via-transparent to-transparent dark:from-violet-900/10 dark:via-transparent dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <Reveal width="100%">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-20">
            {content.techOrbit.title}
          </h2>
        </Reveal>

        {/* Mobile View: Grid Layout with Cascade Reveal */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {techs.map((Tech, idx) => (
            <Reveal key={idx} delay={idx * 0.1} width="100%">
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/60 dark:hover:bg-navy-800/60 hover:shadow-lg hover:shadow-cyan-500/10 group">
                <div className={`p-3 rounded-full bg-slate-50 dark:bg-navy-900/50 group-hover:bg-white dark:group-hover:bg-navy-800 transition-colors shadow-inner ${Tech.color.split(' ')[0].replace('text-', 'shadow-')}/20`}>
                  <Tech.icon size={32} className={`${Tech.color} duration-300 group-hover:scale-110`} />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{Tech.label}</span>
              </div>
            </Reveal>
          ))}
          {/* Central Stat Card for Mobile */}
          <Reveal delay={0.8} width="100%" className="col-span-2">
            <div className="glass-card p-6 rounded-2xl flex items-center justify-center gap-6 mt-4 border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-cyan-500/10">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 animate-pulse"></div>
                <Zap className="relative z-10 w-10 h-10 text-cyan-500 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="block text-4xl font-black text-slate-900 dark:text-white tracking-tighter">50+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">{content.techOrbit.center}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Desktop View: Advanced Orbit Animation */}
        <div className="hidden md:flex relative w-[700px] h-[700px] mx-auto items-center justify-center perspective-1000">

          {/* Central Hub with Pulse Waves */}
          <div className="absolute z-20 w-48 h-48 glass-card rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.15)] dark:shadow-[0_0_80px_rgba(139,92,246,0.25)] animate-pulse-slow border border-white/40 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-xl group cursor-pointer hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-ping-slow opacity-20"></div>
            <Zap className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mb-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            <span className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">50<span className="text-violet-600 dark:text-violet-400">+</span></span>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 font-bold opacity-80">
              {content.techOrbit.center}
            </span>
          </div>

          {/* Inner Orbit (Dashed, Fast Reverse) */}
          <div className="absolute inset-[28%] rounded-full border border-dashed border-cyan-500/30 dark:border-cyan-400/20 animate-spin-reverse-slow duration-[20s]"></div>

          {/* Middle Orbit (Solid, Slow Forward) - Icons reside here */}
          <div className="absolute inset-[10%] rounded-full border border-slate-200/60 dark:border-white/5 animate-spin-slow duration-[40s]">
            {techs.map((Tech, idx) => {
              const angle = (idx * 360) / techs.length;
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 left-1/2 -ml-10 -mt-10 w-20 h-20 glass-card rounded-full flex flex-col items-center justify-center gap-1 hover:scale-125 transition-transform duration-300 border hover:border-cyan-400/50 dark:hover:border-cyan-400/50 group bg-white/80 dark:bg-navy-950/80"
                  style={{
                    transform: `rotate(${angle}deg) translate(280px) rotate(-${angle}deg)`,
                  }}
                >
                  <Tech.icon size={24} className={`${Tech.color} transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                  <span className="text-[10px] text-slate-600 dark:text-slate-300 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50 pointer-events-none">
                    {Tech.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Outer Orbit (Thin, Very Slow Reverse) */}
          <div className="absolute inset-0 rounded-full border border-slate-100 dark:border-white/5 animate-spin-reverse-slow duration-[60s] opacity-50"></div>

          {/* Data Particles (Simulated) */}
          <div className="absolute inset-[10%] rounded-full animate-spin-slow duration-[40s] pointer-events-none">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_10px_cyan]"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-violet-400 rounded-full blur-[2px] shadow-[0_0_10px_violet]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechOrbit;