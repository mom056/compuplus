"use client";

import React from 'react';
import { useApp } from '../providers';
import { Shield, Lock, Eye, FileCheck, Mail } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function PrivacyPage() {
    const { lang, content } = useApp();
    const isAr = lang === 'ar';

    const sections = isAr ? [
        {
            icon: Eye,
            title: 'المعلومات التي نجمعها',
            content: 'نحن نجمع المعلومات التي تقدمها لنا مباشرة، مثل الاسم والبريد الإلكتروني ورقم الهاتف عند التواصل معنا أو طلب خدماتنا. كما نجمع بيانات الاستخدام تلقائياً مثل عنوان IP ونوع المتصفح.'
        },
        {
            icon: Lock,
            title: 'كيف نستخدم معلوماتك',
            content: 'نستخدم المعلومات المجمعة لتقديم خدماتنا وتحسينها، والتواصل معك بشأن طلباتك، وإرسال تحديثات مهمة حول خدماتنا. لن نبيع أو نشارك معلوماتك مع أطراف ثالثة لأغراض تسويقية.'
        },
        {
            icon: Shield,
            title: 'حماية البيانات',
            content: 'نطبق إجراءات أمنية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح أو التدمير. نستخدم تشفير SSL/TLS لجميع عمليات نقل البيانات.'
        },
        {
            icon: FileCheck,
            title: 'حقوقك',
            content: 'لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. يمكنك أيضاً طلب نسخة من البيانات التي نحتفظ بها عنك أو الاعتراض على معالجة بياناتك.'
        },
    ] : [
        {
            icon: Eye,
            title: 'Information We Collect',
            content: 'We collect information you provide directly, such as your name, email, and phone number when contacting us or requesting our services. We also automatically collect usage data like IP address and browser type.'
        },
        {
            icon: Lock,
            title: 'How We Use Your Information',
            content: 'We use the collected information to provide and improve our services, communicate with you about your requests, and send important updates about our services. We will never sell or share your information with third parties for marketing purposes.'
        },
        {
            icon: Shield,
            title: 'Data Protection',
            content: 'We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use SSL/TLS encryption for all data transfers.'
        },
        {
            icon: FileCheck,
            title: 'Your Rights',
            content: 'You have the right to access, correct, or delete your personal data. You can also request a copy of the data we hold about you or object to the processing of your data.'
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-transparent">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-6">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {isAr ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed text-center">
                        {isAr
                            ? 'في CompuPlus، نحن ملتزمون بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.'
                            : 'At CompuPlus, we are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.'
                        }
                    </p>
                </Reveal>

                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <Reveal key={idx} delay={0.15 + idx * 0.1}>
                            <div className="glass-card p-8 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex-shrink-0">
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

                <Reveal delay={0.6}>
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-center">
                        <Mail className="w-8 h-8 text-violet-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            {isAr ? 'لديك أسئلة؟' : 'Have Questions?'}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {isAr
                                ? 'تواصل معنا للاستفسار عن سياسة الخصوصية أو بياناتك الشخصية.'
                                : 'Contact us for questions about our privacy policy or your personal data.'
                            }
                        </p>
                        <a
                            href="mailto:privacy@compuplus.cc"
                            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium hover:underline"
                        >
                            privacy@compuplus.cc
                        </a>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
