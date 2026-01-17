"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio, ArrowRight, Check, Layers, Shield, Cpu, Zap } from 'lucide-react';
import { useApp } from '@/app/providers';
import { SERVICES } from '../constants';
import { Reveal } from './Reveal';
import { SpotlightCard } from './SpotlightCard';

const Services: React.FC = () => {
  const { lang, content } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'software' | 'network' | 'security'>('all');

  // Filter Services
  const allServices = SERVICES(lang);
  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: content.services.filterAll, icon: Layers },
    { id: 'software', label: content.services.filterSoft, icon: Cpu },
    { id: 'network', label: content.services.filterNet, icon: Radio },
    { id: 'security', label: content.services.filterSec, icon: Shield },
  ];

  return (
    <section id="services" className="py-32 bg-transparent backdrop-blur-none relative transition-colors duration-700 ease-out-expo content-visibility-auto">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header - Clean & Minimal */}
        <div className="mb-20 text-center">
          <Reveal width="100%">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-600 dark:text-violet-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={12} className="fill-current" />
              {content.services.badge}
            </span>
          </Reveal>

          <Reveal width="100%" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400">{content.services.titleStart}</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 relative">
                {content.services.titleMiddle}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400">{content.services.titleEnd}</span>
            </h2>
          </Reveal>

          <Reveal width="100%" delay={0.2}>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {content.services.desc}
            </p>
          </Reveal>
        </div>

        {/* Filter Tabs - Floating Pill Design */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((cat, idx) => (
            <Reveal key={cat.id} delay={0.3 + (idx * 0.05)}>
              <button
                onClick={() => setActiveCategory(cat.id as any)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border
                  ${activeCategory === cat.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xl shadow-slate-900/20 dark:shadow-white/10 scale-105'
                    : 'bg-white/50 dark:bg-navy-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-white hover:border-slate-300 dark:hover:bg-navy-800 dark:hover:border-white/20'}
                `}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            </Reveal>
          ))}
        </div>

        {/* Premium Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            // Elegant Gradients
            let gradientAccent = "from-cyan-400 to-blue-500";
            if (service.category === 'software') gradientAccent = "from-violet-400 to-fuchsia-500";
            if (service.category === 'security') gradientAccent = "from-emerald-400 to-teal-500";

            return (
              <Reveal key={service.id} delay={idx * 0.1} width="100%">
                <SpotlightCard className="h-[480px] rounded-3xl group shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-500">
                  <div className="relative h-full p-8 flex flex-col z-20">

                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientAccent} text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500`}>
                        <service.icon size={32} />
                      </div>
                      <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors">
                        {service.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-4 mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm group-hover:opacity-10 transition-opacity duration-500">
                        {service.description}
                      </p>

                      {/* Slidedown Details */}
                      <div className="absolute top-16 left-0 right-0 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <ul className="space-y-3">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                              <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradientAccent}`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between group/btn cursor-pointer">
                      <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={`View ${service.title}`}></Link>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover/btn:text-cyan-600 dark:group-hover/btn:text-cyan-400 transition-colors">
                        {content.services.explore}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover/btn:bg-cyan-500 group-hover/btn:text-white transition-all duration-300">
                        <ArrowRight size={14} className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;