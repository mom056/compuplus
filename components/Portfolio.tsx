"use client";

import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Logo } from './Logo';
import { useApp } from '@/app/providers';
import { SpotlightCard } from './SpotlightCard';
import { Reveal } from './Reveal';

const Portfolio: React.FC = () => {
  const { lang, content } = useApp();
  // Duplicate projects for infinite loop smoothness
  const marqueeProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <section id="portfolio" className="py-32 bg-transparent backdrop-blur-none relative transition-colors duration-700 ease-out-expo overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-[80px] pointer-events-none transform-gpu will-change-transform translate-z-0" />

      {/* Massive Pulsing Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] opacity-[0.03] dark:opacity-[0.05] animate-pulse-slow">
          <Logo className="w-full h-full text-slate-900 dark:text-white" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <Reveal width="100%">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full font-bold bg-white/50 dark:bg-navy-900/50">
              {content.portfolio.badge}
            </span>
          </Reveal>
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-6 tracking-tight">
              {content.portfolio.title}
            </h2>
          </Reveal>
        </div>
        <Reveal width="fit-content" delay={0.2}>
          <button className="flex items-center gap-2 text-slate-600 dark:text-white border-b border-violet-500 pb-1 hover:text-violet-600 dark:hover:text-violet-400 transition-all group font-mono text-sm uppercase tracking-wider">
            {content.portfolio.viewAll} <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full overflow-y-visible py-10 z-10 group/gallery">
        {/* Fading Edges - Adjusted for transparency */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-60 bg-gradient-to-r from-slate-50 dark:from-navy-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-60 bg-gradient-to-l from-slate-50 dark:from-navy-950 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee gap-12 px-4 hover:[animation-play-state:paused] items-center" style={{ direction: 'ltr' }}>
          {marqueeProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="w-[350px] md:w-[600px] shrink-0 group perspective-1000 cursor-pointer relative z-10 hover:z-50 transition-all duration-700 hover:scale-105 group-hover/gallery:opacity-40 hover:!opacity-100 grayscale hover:grayscale-0"
            >
              <div className="relative">
                {/* Main Card */}
                <SpotlightCard className="relative rounded-3xl overflow-hidden aspect-[16/9] glass-card border border-slate-200/50 dark:border-white/10 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:group-hover:shadow-[0_0_50px_rgba(0,229,255,0.2)] transition-all duration-500">

                  {/* Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>

                  {/* Content Overlay */}
                  <div className={`relative z-10 h-full flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
                      <span className={`w-2 h-2 rounded-full ${project.category === 'Software' ? 'bg-violet-500' : 'bg-cyan-500'} shadow-[0_0_10px_currentColor]`} />
                      <span className="text-cyan-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md bg-black/30 px-2 py-1 rounded-md border border-cyan-500/30">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-black text-white mb-4 drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[11px] px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white backdrop-blur-md shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Reflection Effect */}
                <div className="absolute -bottom-[20px] left-0 right-0 h-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none transform scale-y-[-1] origin-top blur-[2px] mask-gradient-b">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;