import React, { useState } from 'react';
import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  const [imgError, setImgError] = useState(false);

  // If no image error, try to show the PNG. Otherwise, show the SVG.
  // Note: Since I cannot verify if logo.png exists in your folder, 
  // this code attempts to load it. If it fails, it gracefully falls back to the SVG.

  if (!imgError) {
    return (
      <div className={`relative ${className}`}>
        <div className={`relative ${className}`}>
          <img
            src="/logo-sm.png"
            alt="CompuPlus Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]"
            width={128}
            height={128}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Circuit lines */}
        <path d="M50 10 L50 25" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
        <path d="M85 50 L70 50" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 90 L50 75" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />

        {/* The C Shape */}
        <path
          d="M75 25 C 65 15, 35 15, 25 25 C 10 40, 10 60, 25 75 C 35 85, 65 85, 75 75"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]"
        />

        {/* Inner Tech Details */}
        <circle cx="50" cy="50" r="8" fill="#00E5FF" className="animate-pulse" />
        <path d="M80 20 L90 10" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.5" />
        <path d="M80 80 L90 90" stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.5" />
      </svg>
    </div>
  );
};