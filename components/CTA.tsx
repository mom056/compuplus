import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/app/providers';

const CTA: React.FC = () => {
  const { lang, content } = useApp();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 to-cyan-900/90 dark:from-navy-950/90 dark:to-navy-900/90 z-0 backdrop-blur-sm" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('/patterns/cubes.png')] z-0 mix-blend-overlay" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/50 z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          {content.cta.title}
        </h2>
        <p className="text-xl text-cyan-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          {content.cta.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#contact"
            className="group px-10 py-5 bg-white text-slate-900 font-bold rounded-xl shadow-2xl hover:bg-cyan-50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            {content.cta.primary}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="px-10 py-5 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            {content.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;