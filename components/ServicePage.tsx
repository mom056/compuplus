"use client";

import React, { useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, ArrowRight, CheckCircle,
    Server, Shield, Smartphone, Globe, Code,
    Cpu, Database, Wifi, Layers, Zap, Activity
} from 'lucide-react';
import { SERVICES, PROCESS, Language } from '@/constants';
import { useApp } from '@/app/providers';
import { Reveal } from '@/components/Reveal';
import { SpotlightCard } from '@/components/SpotlightCard';

interface ServicePageProps {
    slug: string;
}

// Tech stack icons mapping based on category
const TECH_STACK = {
    software: [
        { name: 'Odoo', icon: Database },
        { name: 'React', icon: Code },
        { name: 'Node.js', icon: Server },
        { name: 'Flutter', icon: Smartphone },
        { name: 'AWS', icon: Globe },
        { name: 'Next.js', icon: Layers },
    ],
    network: [
        { name: 'Cisco', icon: Wifi },
        { name: 'Fiber', icon: Activity },
        { name: 'Servers', icon: Server },
        { name: 'Mikrotik', icon: Zap },
        { name: 'Ubiquiti', icon: Wifi },
    ],
    security: [
        { name: 'Hikvision', icon: Shield },
        { name: 'Biometrics', icon: Cpu },
        { name: 'Access', icon: Layers },
        { name: 'Sensors', icon: Activity },
        { name: 'AI', icon: Database },
    ],
};

export default function ServicePageContent({ slug }: ServicePageProps) {
    const { lang } = useApp();
    const isAr = lang === 'ar';
    const services = SERVICES(lang);
    const processSteps = PROCESS(lang);

    const service = services.find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    // Get related services
    const relatedServices = services
        .filter(s => s.category === service.category && s.slug !== slug)
        .slice(0, 2);

    const Icon = service.icon;
    const techStack = TECH_STACK[service.category as keyof typeof TECH_STACK] || TECH_STACK.software;

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Hero Section */}
            <section className="relative py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal delay={0.1}>
                        <Link
                            href="/#services"
                            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-500 hover:text-cyan-400 transition-colors mb-8 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
                            {isAr ? 'العودة للخدمات' : 'Back to Services'}
                        </Link>
                    </Reveal>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Hero Content */}
                        <div className="flex-1">
                            <Reveal delay={0.2}>
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8">
                                    <Icon className="w-5 h-5 text-violet-500" />
                                    <span className="text-sm font-mono text-violet-400 uppercase tracking-widest">
                                        {service.category === 'software' ? (isAr ? 'تطوير وبرمجيات' : 'Development') :
                                            service.category === 'network' ? (isAr ? 'بنية تحتية' : 'Infrastructure') :
                                                (isAr ? 'حلول أمنية' : 'Security Solutions')}
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={0.3}>
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
                                    {service.title}
                                </h1>
                            </Reveal>

                            <Reveal delay={0.4}>
                                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl border-l-4 border-cyan-500 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
                                    {service.longDescription}
                                </p>
                            </Reveal>

                            <Reveal delay={0.5}>
                                <div className="flex flex-wrap gap-4 mt-10">
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
                                    >
                                        {isAr ? 'ابدأ المشروع' : 'Start Project'}
                                        <ArrowRight size={20} className="rtl:rotate-180" />
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        {/* Hero Graphic / Stats */}
                        <Reveal delay={0.4} className="w-full lg:w-1/3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-3xl blur-3xl -z-10" />
                                <div className="relative bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Icon size={120} />
                                    </div>

                                    <div className="grid gap-8 relative z-10">
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-500 text-sm font-mono mb-1">{isAr ? 'مستوى الخدمة' : 'Service Level'}</p>
                                            <p className="text-slate-900 dark:text-white font-bold text-lg">{isAr ? 'مؤسسات وشركات' : 'Enterprise Grade'}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-500 text-sm font-mono mb-1">{isAr ? 'الدعم الفني' : 'Support'}</p>
                                            <p className="text-slate-900 dark:text-white font-bold text-lg">24/7 SLA</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-500 text-sm font-mono mb-1">{isAr ? 'التنفيذ' : 'Implementation'}</p>
                                            <p className="text-slate-900 dark:text-white font-bold text-lg">{isAr ? 'فوري وسريع' : 'Agile & Fast'}</p>
                                        </div>

                                        <div className="h-px bg-white/10 my-2" />

                                        <div>
                                            <p className="text-slate-500 dark:text-slate-500 text-sm font-mono mb-4">{isAr ? 'التقنيات المستخدمة' : 'Powered By'}</p>
                                            <div className="flex flex-wrap gap-3">
                                                {techStack.slice(0, 4).map((tech, i) => {
                                                    const TechIcon = tech.icon;
                                                    return (
                                                        <div key={i} className="flex flex-col items-center gap-2 p-3 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 w-20 text-center">
                                                            <TechIcon size={20} className="text-cyan-400" />
                                                            <span className="text-[10px] text-slate-400">{tech.name}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="flex items-center gap-4 mb-2">
                            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center">
                                {isAr ? 'مميزات الخدمة' : 'Key Features'}
                            </h2>
                            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                        </div>
                        <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
                            {isAr ? 'اكتشف كيف يمكننا الارتقاء بعملك من خلال حلولنا المتقدمة' : 'Discover how we can elevate your business with our advanced solutions'}
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.features.map((feature: string, index: number) => (
                            <Reveal key={index} delay={0.1 * index}>
                                <SpotlightCard className="h-full rounded-2xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1120] hover:border-cyan-500/50 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-500">
                                        <CheckCircle size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-500">
                                        {isAr
                                            ? 'نضمن لك أفضل أداء وجودة عالية لتحقيق أهدافك بفاعلية.'
                                            : 'Ensuring top performance and high quality to effectively achieve your goals.'}
                                    </p>
                                </SpotlightCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-20 relative bg-slate-50/50 dark:bg-[#0B1120]/50 border-y border-slate-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-16">
                            {isAr ? 'كيف نعمل؟' : 'How We Work'}
                        </h2>
                    </Reveal>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 hidden lg:block" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <Reveal key={index} delay={index * 0.1}>
                                    <div className="relative flex flex-col items-center text-center group">
                                        {/* Number Bubble */}
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-2xl font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all duration-500 mb-6 z-10 relative shadow-xl shadow-slate-200/50 dark:shadow-black">
                                            {index + 1}
                                            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed px-4">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <Reveal>
                        <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-12 md:p-16 text-center group">
                            {/* Animated Gradients in CTA */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/30 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-cyan-500/30 transition-colors" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                    {isAr ? 'هل أنت مستعد لنقل عملك للمرحلة التالية؟' : 'Ready to Scale Your Business?'}
                                </h2>
                                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                                    {isAr
                                        ? 'فريقنا جاهز لمساعدتك في تحقيق أهدافك التقنية بأعلى معايير الجودة.'
                                        : 'Our team is ready to help you achieve your technical goals with the highest quality standards.'}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/#contact"
                                        className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all hover:scale-105 shadow-xl hover:shadow-cyan-400/20"
                                    >
                                        {isAr ? 'تواصل معنا' : 'Get Started'}
                                    </Link>
                                    <a
                                        href="https://wa.me/20222728010"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-10 py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold rounded-xl hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="py-20 border-t border-slate-200 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <Reveal>
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {isAr ? 'قد يهمك أيضاً' : 'You Might Also Like'}
                                </h2>
                                <Link href="/#services" className="text-sm text-cyan-500 hover:text-white transition-colors">
                                    {isAr ? 'عرض كل الخدمات' : 'View All Services'}
                                </Link>
                            </div>
                        </Reveal>

                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedServices.map((related, index) => {
                                const RelatedIcon = related.icon;
                                return (
                                    <Reveal key={related.slug} delay={0.1 * index}>
                                        <Link
                                            href={`/services/${related.slug}`}
                                            className="group flex flex-col md:flex-row items-center gap-6 p-8 rounded-3xl bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 h-full"
                                        >
                                            <div className="p-5 rounded-2xl bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                                                <RelatedIcon size={32} />
                                            </div>
                                            <div className="flex-1 text-center md:text-start">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-2">
                                                    {related.title}
                                                </h3>
                                                <p className="text-sm text-slate-400 line-clamp-2">
                                                    {related.description}
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-all">
                                                <ArrowRight size={18} className="rtl:rotate-180" />
                                            </div>
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
