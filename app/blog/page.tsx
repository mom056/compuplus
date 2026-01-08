"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Clock, Search, Sparkles, Filter } from 'lucide-react';
import { useApp } from '@/app/providers';
import { Reveal } from '@/components/Reveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { BLOG_POSTS } from '@/constants/blog';

export default function BlogPage() {
    const { lang } = useApp();
    const isAr = lang === 'ar';
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags)));

    // Filter Logic
    const featuredPost = BLOG_POSTS.find(post => post.featured);
    const regularPosts = BLOG_POSTS.filter(post => !post.featured);

    const filteredPosts = regularPosts.filter(post => {
        const matchesSearch = (isAr ? post.titleAr : post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Hero Section */}
            <section className="relative py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
                        <div>
                            <Reveal>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
                                    <Sparkles className="w-4 h-4 text-violet-500" />
                                    <span className="text-sm font-mono text-violet-500 uppercase tracking-widest">
                                        {isAr ? 'المدونة التقنية' : 'Tech Blog'}
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                                    {isAr ? 'أحدث الرؤى التقنية' : 'Latest Tech Insights'}
                                </h1>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <p className="text-lg text-slate-400 max-w-lg">
                                    {isAr
                                        ? 'استكشف عالم التكنولوجيا من ERP إلى المنازل الذكية والأمن السيبراني.'
                                        : 'Exploring the tech universe from ERPs to Smart Homes and Cybersecurity.'}
                                </p>
                            </Reveal>
                        </div>

                        {/* Search & Filter */}
                        <Reveal delay={0.3}>
                            <div className="flex flex-col gap-4 w-full lg:w-96">
                                <div className="relative w-full">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder={isAr ? 'بحث في المقالات...' : 'Search articles...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Tag Cloud */}
                    <Reveal delay={0.4}>
                        <div className="flex flex-wrap gap-2 mb-16">
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${selectedTag === null
                                    ? 'bg-cyan-500 text-white border-cyan-500'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-cyan-500/50'
                                    }`}
                            >
                                {isAr ? 'الكل' : 'All'}
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                    className={`px-4 py-1.5 rounded-full text-sm border transition-all ${selectedTag === tag
                                        ? 'bg-cyan-500 text-white border-cyan-500'
                                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-cyan-500/50'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    {/* Featured Post */}
                    {featuredPost && !searchQuery && !selectedTag && (
                        <Reveal>
                            <Link href={`/blog/${featuredPost.slug}`} className="group block mb-16">
                                <SpotlightCard className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative h-64 md:h-[450px] overflow-hidden">
                                            <Image
                                                src={featuredPost.coverImage}
                                                alt={isAr ? featuredPost.titleAr : featuredPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/90 hidden md:block" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:hidden" />
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 bg-violet-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-violet-600/20">
                                                    {isAr ? 'مميز' : 'Featured'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center relative">
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {featuredPost.tags.map(tag => (
                                                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-cyan-400 transition-colors leading-tight">
                                                {isAr ? featuredPost.titleAr : featuredPost.title}
                                            </h2>

                                            <p className="text-slate-400 mb-8 line-clamp-3 text-lg leading-relaxed">
                                                {isAr ? featuredPost.excerptAr : featuredPost.excerpt}
                                            </p>

                                            <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-white/5 pt-6 mt-auto">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-cyan-500" />
                                                    {featuredPost.date}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-violet-500" />
                                                    {featuredPost.readTime}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-slate-500" />
                                                    {featuredPost.author}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </Reveal>
                    )}

                    {/* Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <Reveal key={post.slug} delay={0.1 * index}>
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <article className="h-full bg-white dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5">
                                        {/* Cover Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <Image
                                                src={post.coverImage}
                                                alt={isAr ? post.titleAr : post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />

                                            {/* Read Time Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className="flex items-center gap-1.5 text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white border border-white/10">
                                                    <Clock className="w-3 h-3 text-cyan-400" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                                                {isAr ? post.titleAr : post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                                                {isAr ? post.excerptAr : post.excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-xs text-slate-500 pt-5 border-t border-slate-200 dark:border-white/5 mt-auto">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {post.date}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                                    {isAr ? 'اقرأ المزيد' : 'Read More'}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-32">
                            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-slate-600" />
                            </div>
                            <p className="text-slate-500 text-lg mb-4">
                                {isAr ? `لا توجد نتائج لـ "${searchQuery}"` : `No results found for "${searchQuery}"`}
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                                className="text-cyan-500 hover:text-cyan-400 font-mono text-sm border-b border-cyan-500/30 hover:border-cyan-500 pb-0.5 transition-all"
                            >
                                {isAr ? 'عرض كل المقالات' : 'View all articles'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 border-t border-slate-200 dark:border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <Reveal>
                        <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-12 md:p-16 text-center group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                            <div className="relative z-10">
                                <Sparkles className="w-12 h-12 text-cyan-500 mx-auto mb-6" />
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                                    {isAr ? 'هل أنت مستعد للمستقبل؟' : 'Ready for the Future?'}
                                </h2>
                                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                                    {isAr
                                        ? 'سواء كنت بحاجة إلى ERP، أو تطبيق جوال، أو تأمين منزلك، نحن هنا لتحويل رؤيتك إلى واقع.'
                                        : 'Whether you need an ERP, a mobile app, or smart home automation, we are here to turn your vision into reality.'}
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all hover:scale-105 shadow-xl hover:shadow-cyan-400/20"
                                >
                                    {isAr ? 'ابدأ مشروعك الآن' : 'Start Your Project'}
                                    <ArrowRight size={20} className="rtl:rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
