import React from 'react';
import Image from 'next/image';
import { PARTNERS } from '../constants';
import { useApp } from '@/app/providers';

const Partners: React.FC = () => {
  const { content } = useApp();
  return (
    <section className="py-20 bg-transparent border-y border-slate-200/50 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm font-mono uppercase tracking-widest mb-10">
          {content.partners.text}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80">
          {PARTNERS.map((partner, idx) => (
            <div key={idx} className="group relative flex flex-col items-center">
              {/* Logo Area */}
              <div className="relative w-32 h-16 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                {/* 
                  Note: We are using a simple <img> tag with error handling for now 
                  to allow the user to easily drop files without Next.js Image strictness 
                  until they have actual files.
                */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.remove('h-16', 'w-32');
                    const textSpan = document.getElementById(`partner-text-${idx}`);
                    if (textSpan) textSpan.style.display = 'block';
                  }}
                />

                {/* Fallback Text (Hidden by default, shown via JS onerror above) */}
                <div id={`partner-text-${idx}`} className="hidden text-2xl font-bold text-slate-300 dark:text-slate-600 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                  {partner.name}
                </div>
              </div>

              <span className="absolute -bottom-6 left-0 w-full text-center text-[10px] text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-mono tracking-wider">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;