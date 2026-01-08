"use client";

import React from 'react';
import { useApp } from '../providers';
import { Scale, FileText, AlertTriangle, Handshake, Gavel, Mail } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function TermsPage() {
    const { lang, content } = useApp();
    const isAr = lang === 'ar';

    const sections = isAr ? [
        {
            icon: FileText,
            title: 'قبول الشروط',
            content: 'باستخدامك لموقعنا وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.'
        },
        {
            icon: Handshake,
            title: 'الخدمات المقدمة',
            content: 'نقدم حلول تقنية شاملة تشمل تطوير البرمجيات، أنظمة ERP، البنية التحتية للشبكات، وأنظمة الأمان. جميع الخدمات تخضع لاتفاقيات منفصلة توضح النطاق والتكلفة والجدول الزمني.'
        },
        {
            icon: AlertTriangle,
            title: 'حدود المسؤولية',
            content: 'نسعى جاهدين لتقديم خدمات عالية الجودة، لكننا لا نضمن نتائج محددة. لن نكون مسؤولين عن أي أضرار غير مباشرة أو خاصة أو عرضية ناتجة عن استخدام خدماتنا.'
        },
        {
            icon: Scale,
            title: 'الملكية الفكرية',
            content: 'جميع المحتويات على هذا الموقع، بما في ذلك النصوص والشعارات والتصاميم، هي ملكية حصرية لـ CompuPlus ومحمية بموجب قوانين حقوق النشر. تنتقل ملكية المشاريع المطورة للعميل بعد السداد الكامل.'
        },
        {
            icon: Gavel,
            title: 'القانون الواجب التطبيق',
            content: 'تخضع هذه الشروط للقوانين المصرية. أي نزاعات تنشأ عن استخدام خدماتنا سيتم حلها في المحاكم المصرية المختصة.'
        },
    ] : [
        {
            icon: FileText,
            title: 'Acceptance of Terms',
            content: 'By using our website and services, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use our services.'
        },
        {
            icon: Handshake,
            title: 'Services Provided',
            content: 'We offer comprehensive technology solutions including software development, ERP systems, network infrastructure, and security systems. All services are subject to separate agreements detailing scope, cost, and timeline.'
        },
        {
            icon: AlertTriangle,
            title: 'Limitation of Liability',
            content: 'We strive to provide high-quality services, but we do not guarantee specific outcomes. We shall not be liable for any indirect, special, or incidental damages arising from the use of our services.'
        },
        {
            icon: Scale,
            title: 'Intellectual Property',
            content: 'All content on this website, including text, logos, and designs, is the exclusive property of CompuPlus and protected under copyright laws. Ownership of developed projects transfers to the client upon full payment.'
        },
        {
            icon: Gavel,
            title: 'Governing Law',
            content: 'These terms are governed by Egyptian law. Any disputes arising from the use of our services will be resolved in the competent Egyptian courts.'
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-transparent">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-6">
                            <Scale size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {isAr ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed text-center">
                        {isAr
                            ? 'يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا. تحدد هذه الشروط الإطار القانوني لعلاقتنا معك.'
                            : 'Please read these terms and conditions carefully before using our services. These terms define the legal framework of our relationship with you.'
                        }
                    </p>
                </Reveal>

                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <Reveal key={idx} delay={0.15 + idx * 0.1}>
                            <div className="glass-card p-8 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex-shrink-0">
                                        <section.icon size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                            {section.title}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.7}>
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center">
                        <Mail className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            {isAr ? 'لديك استفسارات؟' : 'Have Questions?'}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {isAr
                                ? 'تواصل معنا للاستفسار عن شروط الخدمة أو الاتفاقيات.'
                                : 'Contact us for questions about our terms of service or agreements.'
                            }
                        </p>
                        <a
                            href="mailto:legal@compuplus.cc"
                            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
                        >
                            legal@compuplus.cc
                        </a>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
