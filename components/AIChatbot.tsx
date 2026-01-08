"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Sparkles } from 'lucide-react';
import { useApp } from '@/app/providers';
import { CONTENT, SERVICES, PROJECTS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatbot: React.FC = () => {
  const { lang, content } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatSession) {
      const initChat = async () => {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY || "" });

          // Prepare context from constants to feed the AI
          const websiteContext = JSON.stringify({
            companyInfo: CONTENT[lang],
            services: SERVICES(lang),
            projects: PROJECTS,
            philosophy: "CompuPlus merges Hardware Infrastructure with Software Intelligence."
          });

          const systemInstruction = `
            You are 'CompuBot', the advanced AI Assistant for CompuPlus.
            
            Your Persona:
            - Tone: Professional, Futuristic, Tech-savvy, Helpful, and Concise.
            - Identity: You represent a high-end tech company that merges Networking (Infrastructure) with Software (Odoo/Apps).
            
            Your Knowledge Base:
            ${websiteContext}
            
            Rules:
            1. Answer questions based strictly on the provided JSON context.
            2. If asked about pricing, suggest using the 'Get Quote' form on the site.
            3. Keep answers short (under 3 sentences) unless asked for details.
            4. Respond in the same language as the user (English or Arabic).
            5. Do NOT mention you are a Google AI. You are CompuPlus AI.
          `;

          const chat: Chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });

          setChatSession(chat);

          // Add welcome message
          setMessages([
            {
              role: 'model',
              text: lang === 'ar'
                ? 'مرحباً بك في CompuPlus. أنا مساعدك الذكي، كيف يمكنني دعم بنيتك الرقمية اليوم؟'
                : 'Welcome to CompuPlus. I am your Digital Assistant. How can I engineer your future today?'
            }
          ]);

        } catch (error) {
          console.error("Failed to init AI", error);
        }
      };
      initChat();
    }
  }, [isOpen, lang, chatSession]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Use sendMessageStream for faster perceived latency
      const resultStream = await chatSession.sendMessageStream({ message: userMsg });

      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); // Placeholder

      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          // Update the last message with the growing text
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].text = fullText;
            return newMsgs;
          });
        }
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: lang === 'ar' ? "عذراً، حدث خطأ في الاتصال بالنظام." : "System error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-violet-500 rounded-full animate-pulse opacity-20 delay-75"></div>
        <div className="relative bg-gradient-to-br from-navy-900 to-slate-900 border border-cyan-500/50 text-cyan-400 p-4 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md">
          <Bot size={32} className="animate-pulse-slow" />

          {/* Status Dot */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`
          fixed z-50 transition-all duration-500 ease-out-expo
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh]
          bg-white/80 dark:bg-navy-900/90 backdrop-blur-xl
          border border-slate-200 dark:border-cyan-500/30
          rounded-2xl shadow-2xl flex flex-col overflow-hidden
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-100 to-white dark:from-navy-950 dark:to-navy-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">CompuBot AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
          >
            <Minimize2 size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  ${msg.role === 'user' ? 'bg-violet-500 text-white' : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400'}
                `}
              >
                {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
              </div>
              <div
                className={`
                  max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-white/5'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                <Loader2 size={14} className="animate-spin" />
              </div>
              <div className="bg-slate-100 dark:bg-navy-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-navy-900/50 backdrop-blur flex gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'ar' ? "اسألني عن خدماتنا..." : "Ask about our services..."}
            className="flex-1 bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Send size={18} className="rtl:rotate-180" />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIChatbot;