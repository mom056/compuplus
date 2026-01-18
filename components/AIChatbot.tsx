"use client";

import React, { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { useApp } from '@/app/providers';
import dynamic from 'next/dynamic';

// Heavy component lazy loaded ONLY when user initiates chat
const ChatDialog = dynamic(() => import('./ChatDialog'), {
  ssr: false,
  loading: () => <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20"><Loader2 className="animate-spin text-cyan-500" size={40} /></div>
});

const AIChatbot: React.FC = () => {
  const { isChatOpen, setChatOpen } = useApp();
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <>
      {/* Floating Button - Desktop Only */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-500 hidden lg:flex ${isChatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-violet-500 rounded-full animate-pulse opacity-20 delay-75"></div>
        <div className="relative bg-gradient-to-br from-navy-900 via-violet-900 to-slate-900 border border-cyan-500/50 text-cyan-400 p-4 rounded-full shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md">
          <Bot size={28} className="animate-pulse-slow" />

          {/* Status Dot */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </button>

      {/* Chat Dialog - Lazy Loaded */}
      {hasInteracted && (
        <ChatDialog isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
      )}
    </>
  );
};

export default AIChatbot;