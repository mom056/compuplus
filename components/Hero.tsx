"use client";

import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Dynamically import Hero3D - only on desktop for performance
const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-cyan-500 animate-spin" />
    </div>
  )
});

// Hardcoded defaults for instant SSR (no JS wait) - improves LCP
const DEFAULTS = {
  badge: 'PIONEERING SINCE 1997',
  title: 'FUSING INFRASTRUCTURE WITH SOFTWARE INTELLIGENCE',
  subtitle: 'A unified technology powerhouse providing turnkey solutions: Network Infrastructure, Odoo ERP Implementation, Custom Software, and Security Systems.',
  ctaPrimary: 'Start Your Project',
  ctaSecondary: 'View Our Work',
  scroll: 'Scroll to explore',
};

const Hero: React.FC = () => {
  const { content } = useApp();

  // Use context values if available, otherwise use SSR defaults
  const badge = content?.hero?.badge || DEFAULTS.badge;
  const title = content?.hero?.title || DEFAULTS.title;
  const subtitle = content?.hero?.subtitle || DEFAULTS.subtitle;
  const ctaPrimary = content?.hero?.ctaPrimary || DEFAULTS.ctaPrimary;
  const ctaSecondary = content?.hero?.ctaSecondary || DEFAULTS.ctaSecondary;
  const scroll = content?.hero?.scroll || DEFAULTS.scroll;

  // Typing animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => title.slice(0, latest));
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    count.set(0);
    const controls = animate(count, title.length, {
      type: "tween",
      duration: 3,
      ease: "easeInOut",
      delay: 0.5,
    });
    return controls.stop;
  }, [title, count]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-x-clip bg-transparent pt-20 transition-colors duration-700">

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-white/40 to-violet-50/30 dark:from-navy-950/80 dark:via-navy-900/80 dark:to-violet-950/20 transition-colors duration-700" />

      {/* Moving Blobs - Reduced on mobile for performance */}
      <div className="absolute top-[5%] left-[5%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-violet-400 to-fuchsia-300 dark:from-violet-600/30 dark:to-fuchsia-600/20 rounded-full filter blur-[40px] md:blur-[60px] opacity-50 dark:opacity-30 transform-gpu will-change-transform pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[200px] h-[200px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-cyan-400 to-blue-300 dark:from-cyan-500/30 dark:to-blue-500/20 rounded-full filter blur-[40px] md:blur-[60px] opacity-50 dark:opacity-30 transform-gpu will-change-transform pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-gradient-to-br from-pink-300 to-rose-200 dark:from-pink-600/25 dark:to-rose-600/15 rounded-full filter blur-[50px] opacity-40 dark:opacity-20 transform-gpu will-change-transform pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Content - SSR Optimized for LCP */}
        <div className="space-y-8 pt-10 lg:pt-0 text-center lg:text-start">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-violet-500/30 bg-white/50 dark:bg-violet-900/10 backdrop-blur-md shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-mono text-slate-700 dark:text-cyan-200 uppercase tracking-widest font-bold">
              {badge}
            </span>
          </div>

          {/* Title - Animated with Typing Effect */}
          {/* Title - Animated with Typing Effect - CLS OPTIMIZED */}
          {/* We render a hidden copy of the text to reserve vertical space (Fixing CLS) */}
          {/* The animated text is absolutely positioned over it */}
          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-slate-900 dark:text-white tracking-tight">
            {/* Invisible placeholder for Layout Stability */}
            <span className="invisible select-none" aria-hidden="true">{title}</span>

            {/* Actual Animated Text Overlay */}
            <span className="absolute inset-0 top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-cyan-600 to-violet-600 dark:from-white dark:via-cyan-400 dark:to-violet-400">
              <motion.span>{displayText}</motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[0.9em] bg-violet-600 dark:bg-violet-400 ml-1 align-middle"
              />
            </span>
          </h1>

          {/* Subtitle - Critical for LCP */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 border-l-4 border-violet-500 pl-6">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={scrollToContact}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 shadow-lg shadow-cyan-500/20 active:scale-95"
              aria-label="Start Your Project"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {ctaPrimary} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={scrollToPortfolio}
              className="px-8 py-4 border border-violet-500/50 hover:border-violet-400 text-slate-700 dark:text-white rounded-lg hover:bg-violet-500/10 transition-colors duration-200 font-mono tracking-wide active:scale-95"
              aria-label="View Our Work"
            >
              {ctaSecondary}
            </button>
          </div>
        </div>

        {/* Right: 3D Visualization - Hidden on Mobile for Performance */}
        <div className="hidden lg:block relative z-20 mt-10 lg:mt-0 min-h-[500px]">
          {mounted && window.innerWidth >= 1024 && (
            <Reveal delay={0.2} direction="left">
              <Hero3D />
            </Reveal>
          )}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 animate-bounce">
        <span className="text-xs font-mono uppercase tracking-widest">{scroll}</span>
        <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;