"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Bot, User, Loader2, Minimize2, Sparkles, RotateCcw } from 'lucide-react';
import { useApp } from '@/app/providers';
import { SUGGESTED_QUESTIONS, WELCOME_MESSAGE } from '@/constants/chatbot';

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface ChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const STORAGE_KEY = 'compubot_chat_history';

const ChatDialog: React.FC<ChatDialogProps> = ({ isOpen, onClose }) => {
    const { lang } = useApp();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasInitialized, setHasInitialized] = useState(false);

    // Load chat history from LocalStorage
    useEffect(() => {
        if (!hasInitialized) {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setMessages(parsed);
                        setShowSuggestions(false);
                    } else {
                        // Add welcome message if no history
                        setMessages([{ role: 'model', text: WELCOME_MESSAGE(lang) }]);
                    }
                } else {
                    setMessages([{ role: 'model', text: WELCOME_MESSAGE(lang) }]);
                }
            } catch {
                setMessages([{ role: 'model', text: WELCOME_MESSAGE(lang) }]);
            }
            setHasInitialized(true);
        }
    }, [lang, hasInitialized]);

    // Save to LocalStorage whenever messages change
    useEffect(() => {
        if (hasInitialized && messages.length > 0) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            } catch (e) {
                console.warn('Failed to save chat history', e);
            }
        }
    }, [messages, hasInitialized]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = useCallback(async (messageText?: string) => {
        const userMsg = (messageText || input).trim();
        if (!userMsg) return;

        setInput('');
        setShowSuggestions(false);
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Call our secure API route
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.filter(m => m.text.length > 0),
                }),
            });

            if (!response.ok) {
                throw new Error('API error');
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No reader');

            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) {
                                fullText += parsed.text;
                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    newMsgs[newMsgs.length - 1].text = fullText;
                                    return newMsgs;
                                });
                            }
                        } catch {
                            // Skip invalid JSON
                        }
                    }
                }
            }

        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, {
                role: 'model',
                text: lang === 'ar'
                    ? "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى."
                    : "Sorry, connection error. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, messages, lang]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend();
    };

    const handleSuggestionClick = (question: string) => {
        handleSend(question);
    };

    const clearHistory = () => {
        localStorage.removeItem(STORAGE_KEY);
        setMessages([{ role: 'model', text: WELCOME_MESSAGE(lang) }]);
        setShowSuggestions(true);
    };

    const suggestedQuestions = SUGGESTED_QUESTIONS(lang);

    return (
        <div
            className={`
                fixed z-50 transition-all duration-500 ease-out-expo
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
                bottom-6 right-6 w-[90vw] md:w-[420px] h-[650px] max-h-[85vh]
                bg-white/90 dark:bg-navy-900/95 backdrop-blur-xl
                border border-slate-200 dark:border-cyan-500/30
                rounded-2xl shadow-2xl flex flex-col overflow-hidden
            `}
        >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-100 to-white dark:from-navy-950 dark:to-navy-900 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">CompuBot AI</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">
                                {lang === 'ar' ? 'متصل' : 'Online'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={clearHistory}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                        title={lang === 'ar' ? 'مسح المحادثة' : 'Clear chat'}
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                    >
                        <Minimize2 size={18} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
                    >
                        <div
                            className={`
                                w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                ${msg.role === 'user'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white'}
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

                {/* Suggested Questions */}
                {showSuggestions && messages.length <= 1 && !isLoading && (
                    <div className="pt-2 space-y-2 animate-fade-in">
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-3">
                            {lang === 'ar' ? 'أسئلة شائعة:' : 'Quick questions:'}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {suggestedQuestions.map((q) => (
                                <button
                                    key={q.id}
                                    onClick={() => handleSuggestionClick(q.text)}
                                    className="p-3 text-xs text-start bg-slate-50 dark:bg-navy-800/50 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:scale-[1.02] hover:border-cyan-500/50"
                                >
                                    <span className="text-base mr-1">{q.icon}</span>
                                    <span className="text-slate-700 dark:text-slate-300">{q.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="flex gap-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white shrink-0">
                            <Loader2 size={14} className="animate-spin" />
                        </div>
                        <div className="bg-slate-100 dark:bg-navy-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-navy-900/50 backdrop-blur flex gap-2 shrink-0">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={lang === 'ar' ? "اكتب سؤالك هنا..." : "Type your question..."}
                    className="flex-1 bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
                >
                    <Send size={18} className="rtl:rotate-180" />
                </button>
            </form>
        </div>
    );
};

export default ChatDialog;
