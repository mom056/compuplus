"use client";

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook, Sparkles } from 'lucide-react';
import { useApp } from '@/app/providers';
import { Reveal } from '@/components/Reveal';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/constants/blog';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { lang } = useApp();
    const isAr = lang === 'ar';

    // Unwrap params
    const { slug } = use(params);
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Find related posts (same tags, excluding current)
    const relatedPosts = BLOG_POSTS
        .filter(p => p.slug !== slug && p.tags.some(t => post.tags.includes(t)))
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

            {/* Scroll Progress Bar (Simple Implementation) */}
            <div className="fixed top-0 left-0 h-1 bg-cyan-500 z-50 w-full origin-left scale-x-0 animate-scroll-progress" />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.coverImage}
                        alt={isAr ? post.titleAr : post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/60 dark:via-slate-950/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
                    <Reveal>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
                            {isAr ? 'العودة للمدونة' : 'Back to Blog'}
                        </Link>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {post.tags.map((tag) => (
                                <span key={tag} className="text-xs px-4 py-1.5 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 shadow-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                            {isAr ? post.titleAr : post.title}
                        </h1>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <div className="flex flex-wrap items-center gap-6 text-slate-300 font-mono text-sm border-t border-white/10 pt-6">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-cyan-500" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} className="text-violet-500" />
                                {post.readTime}
                            </span>
                            <span className="flex items-center gap-2">
                                <User size={16} className="text-slate-500" />
                                {post.author}
                            </span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative z-10 -mt-10">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Main Article */}
                        <div className="flex-1">
                            <Reveal>
                                <article className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                    {/* Subtle Grid in Bg */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />

                                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-strong:text-cyan-600 dark:prose-strong:text-cyan-400 prose-a:text-cyan-600 dark:prose-a:text-cyan-500 hover:prose-a:text-cyan-500 dark:hover:prose-a:text-cyan-400 relative z-10">
                                        <div
                                            style={{ whiteSpace: 'pre-line' }}
                                        >
                                            {isAr ? post.contentAr : post.content}
                                        </div>
                                    </div>

                                    {/* Share Footer */}
                                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                                        <span className="text-slate-400 font-mono text-sm">
                                            {isAr ? 'شارك هذا المقال:' : 'Share this article:'}
                                        </span>
                                        <div className="flex gap-4">
                                            {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                                                <button key={idx} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all hover:scale-110">
                                                    <Icon size={18} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        </div>

                        {/* Sidebar / Related (Desktop only for now layout-wise, spreads on mobile) */}
                    </div>

                    {/* Related Posts Section */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-20">
                            <Reveal>
                                <div className="flex items-center gap-3 mb-10">
                                    <Sparkles className="text-cyan-500" />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                                    </h3>
                                </div>
                            </Reveal>

                            <div className="grid md:grid-cols-2 gap-8">
                                {relatedPosts.map((related, idx) => (
                                    <Reveal key={related.slug} delay={idx * 0.1}>
                                        <Link href={`/blog/${related.slug}`} className="group block h-full">
                                            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all flex items-center gap-6 p-4 h-full hover:bg-slate-50 dark:hover:bg-white/5">
                                                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                                    <Image
                                                        src={related.coverImage}
                                                        alt={isAr ? related.titleAr : related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                                                        {isAr ? related.titleAr : related.title}
                                                    </h4>
                                                    <span className="text-xs text-slate-500 flex items-center gap-2">
                                                        <Clock size={12} /> {related.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
