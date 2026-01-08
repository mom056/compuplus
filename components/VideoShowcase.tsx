"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/app/providers';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { Reveal } from './Reveal';

const VideoShowcase: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { lang } = useApp();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(true);
    const [showControls, setShowControls] = React.useState(false);

    // Initial Autoplay via Intersection Observer (Muted)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && videoRef.current && !isExpanded) {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch(() => { });
                } else if (!entry.isIntersecting && videoRef.current && !isExpanded) {
                    videoRef.current.pause();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isExpanded]);

    // Keyboard support (Escape to close)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isExpanded) {
                closeVideo();
            }
            if (e.key === ' ' && isExpanded) {
                e.preventDefault();
                togglePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isExpanded, isPlaying]);

    // Lock body scroll when expanded
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isExpanded]);

    const openVideo = useCallback(() => {
        if (!videoRef.current || !containerRef.current) return;

        // Scroll to video first (smooth scroll to center)
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Small delay to allow scroll to complete before expanding
        setTimeout(() => {
            setIsExpanded(true);
            setIsMuted(false);
            if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
            setIsPlaying(true);
        }, 300);
    }, []);

    const closeVideo = useCallback(() => {
        if (!videoRef.current) return;
        setIsExpanded(false);
        setIsMuted(true);
        videoRef.current.muted = true;
        setShowControls(false);
    }, []);

    const togglePlayPause = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }, []);

    return (
        <section
            className={`py-12 px-4 md:px-8 transition-all duration-500 ease-out relative
                ${isExpanded ? 'fixed inset-0 z-[100] p-0 bg-black' : 'z-40'}`}
            onClick={isExpanded ? closeVideo : undefined}
        >
            {/* Close Button (Only when expanded) */}
            {isExpanded && (
                <button
                    onClick={(e) => { e.stopPropagation(); closeVideo(); }}
                    className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110"
                    aria-label="Close"
                >
                    <X size={28} />
                </button>
            )}

            <div
                ref={containerRef}
                onMouseEnter={() => { setIsHovered(true); if (isExpanded) setShowControls(true); }}
                onMouseLeave={() => { setIsHovered(false); if (isExpanded) setShowControls(false); }}
                onClick={(e) => { e.stopPropagation(); if (!isExpanded) openVideo(); }}
                className={`relative mx-auto overflow-hidden flex items-center justify-center transition-all duration-500 ease-out group
                    ${isExpanded
                        ? 'w-full h-full max-w-[95%] max-h-[90%] rounded-2xl bg-black shadow-2xl'
                        : 'w-full max-w-[95%] h-[400px] md:h-[70vh] rounded-[2rem] border border-cyan-500/20 shadow-[0_0_60px_rgba(0,229,255,0.1)] cursor-pointer hover:shadow-[0_0_100px_rgba(139,92,246,0.25)] hover:scale-[1.01]'
                    }`}
            >
                {/* Ambilight Glow (Behind) */}
                {!isExpanded && (
                    <div className="absolute inset-4 bg-gradient-to-r from-cyan-500 to-violet-600 blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow -z-10" />
                )}

                {/* Video Element */}
                <video
                    ref={videoRef}
                    className={`w-full h-full transition-all duration-500 ease-out
                        ${isExpanded ? 'object-contain' : 'object-cover'}
                        ${!isExpanded && isHovered ? 'scale-105' : 'scale-100'}`}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onClick={(e) => { if (isExpanded) { e.stopPropagation(); togglePlayPause(); } }}
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Holographic Scanline Overlay (Bezel) */}
                <div className={`absolute inset-0 border-[2px] border-white/5 rounded-[2rem] z-20 pointer-events-none transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-white/0 via-cyan-400/5 to-white/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[1.5s] ease-in-out" />
                </div>

                {/* Dark Gradient Overlay for Text Visibility */}
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent transition-opacity duration-300 pointer-events-none ${isExpanded ? 'opacity-0' : 'opacity-100 group-hover:opacity-70'}`} />

                {/* Preview Play Button & Text Content */}
                <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500
                    ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

                    {/* Play Button */}
                    <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping-slow" />
                        <div className="absolute inset-[-10px] rounded-full border border-violet-500/20 animate-ping-slower" />

                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors duration-300">
                            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-1" />
                        </div>
                    </div>

                    <Reveal width="100%">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl text-center px-4">
                            {lang === 'ar' ? 'مستقبل التكنولوجيا' : 'THE FUTURE OF TECH'}
                        </h2>
                    </Reveal>

                    <p className="text-base md:text-lg text-cyan-100/70 font-mono tracking-wider uppercase">
                        {lang === 'ar' ? 'اضغط للمشاهدة' : 'Click to Play'}
                    </p>
                </div>

                {/* Expanded Controls */}
                {isExpanded && (
                    <div
                        className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={togglePlayPause}
                            className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
                        >
                            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                        </button>
                        <button
                            onClick={toggleMute}
                            className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
                        >
                            {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default VideoShowcase;
