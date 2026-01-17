"use client";

import React, { useState } from 'react';
import { Send, MapPin, Mail, Terminal, ShieldCheck, CheckCircle, Phone, MessageCircle, Facebook, Linkedin, Instagram, ExternalLink, Clock, Headphones } from 'lucide-react';
import { useApp } from '@/app/providers';
import { Reveal } from './Reveal';
import { SpotlightCard } from './SpotlightCard';

// Company Info
const COMPANY_INFO = {
  address: {
    en: '128, Mostafa ElNahas, Nasr City',
    ar: '128، مصطفى النحاس، مدينة نصر'
  },
  mapsLink: 'https://maps.app.goo.gl/mhFpozETm5NqcuYP7',
  postalCode: '4441597',
  phone: '+20 2 2272 8010',
  whatsapp: '+20 2 2272 8010',
  email: 'info@compuplus.cc',
  workingHours: {
    en: 'Sun - Thu: 9:00 AM - 6:00 PM',
    ar: 'الأحد - الخميس: 9:00 ص - 6:00 م'
  }
};

const SOCIAL_LINKS = [
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/20222728010', icon: MessageCircle, color: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500' },
  { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/Compuplusc', icon: Facebook, color: 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/raafat-girgis-a4a91674', icon: Linkedin, color: 'bg-gradient-to-br from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700' },
  { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/compuplus', icon: Instagram, color: 'bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500' },
];

const Contact: React.FC = () => {
  const { lang, content } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(lang === 'ar' ? 'فشل إرسال الرسالة. حاول مرة أخرى.' : 'Failed to send. Please try again.');
      }
    } catch (error) {
      // Error handled via alert
      alert(lang === 'ar' ? 'حدث خطأ. حاول مرة أخرى.' : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_0%,rgba(6,182,212,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <Reveal width="100%">
            <div className="inline-flex items-center gap-2 mb-6 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 px-5 py-2.5 rounded-full">
              <Headphones className="w-4 h-4 text-cyan-500" />
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-widest">
                {lang === 'ar' ? 'نحن هنا لمساعدتك' : 'We\'re Here to Help'}
              </span>
            </div>
          </Reveal>
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              {content.contact.title}
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {content.contact.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left Column - Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">

            {/* Location Card */}
            <SpotlightCard className="rounded-2xl p-6 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs text-cyan-600 dark:text-cyan-400 uppercase font-mono tracking-widest mb-2">
                    {content.contact.locationTitle}
                  </h4>
                  <p className="text-slate-900 dark:text-white font-semibold text-lg mb-1">
                    {lang === 'ar' ? COMPANY_INFO.address.ar : COMPANY_INFO.address.en}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {lang === 'ar' ? 'الرمز البريدي: ' : 'Postal Code: '}{COMPANY_INFO.postalCode}
                  </p>
                  <a
                    href={COMPANY_INFO.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-500 hover:text-cyan-400 mt-3 font-mono uppercase"
                  >
                    <span>{lang === 'ar' ? 'عرض على الخريطة' : 'View on Map'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </SpotlightCard>

            {/* Phone Card */}
            <SpotlightCard className="rounded-2xl p-6 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs text-green-600 dark:text-green-400 uppercase font-mono tracking-widest mb-2">
                    {content.contact.phoneTitle}
                  </h4>
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} className="text-slate-900 dark:text-white font-semibold text-lg hover:text-green-500 transition-colors block" dir="ltr">
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {content.contact.phoneDesc}
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Email Card */}
            <SpotlightCard className="rounded-2xl p-6 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs text-violet-600 dark:text-violet-400 uppercase font-mono tracking-widest mb-2">
                    {content.contact.emailTitle}
                  </h4>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-900 dark:text-white font-semibold text-lg hover:text-violet-500 transition-colors block">
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {content.contact.emailDesc}
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Working Hours Card */}
            <SpotlightCard className="rounded-2xl p-6 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs text-amber-600 dark:text-amber-400 uppercase font-mono tracking-widest mb-2">
                    {lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </h4>
                  <p className="text-slate-900 dark:text-white font-semibold text-lg">
                    {lang === 'ar' ? COMPANY_INFO.workingHours.ar : COMPANY_INFO.workingHours.en}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {lang === 'ar' ? 'الجمعة والسبت: إجازة' : 'Friday & Saturday: Closed'}
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-xs text-center text-slate-500 uppercase font-mono mb-5 tracking-widest">
                {lang === 'ar' ? 'تابعنا على' : 'Follow Us On'}
              </p>
              <div className="flex justify-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color}`}
                    title={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <SpotlightCard className="rounded-3xl p-8 md:p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {isSuccess ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl border border-green-500/20">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-pulse">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{content.contact.successTitle}</h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-sm">{content.contact.successMsg}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mb-2.5 block group-focus-within:text-cyan-500 transition-colors">
                          {content.contact.formName}
                        </label>
                        <div className="relative">
                          <Terminal size={18} className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-100 dark:bg-slate-900/30 border border-slate-300 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 rtl:pr-12 rtl:pl-4 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600"
                            placeholder={content.contact.placeholderID}
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mb-2.5 block group-focus-within:text-cyan-500 transition-colors">
                          {content.contact.formEmail}
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-100 dark:bg-slate-900/30 border border-slate-300 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 rtl:pr-12 rtl:pl-4 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600"
                            placeholder={content.contact.placeholderEmail}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mb-2.5 block group-focus-within:text-cyan-500 transition-colors">
                        {content.contact.formMsg}
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-slate-900/30 border border-slate-300 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600 resize-none"
                        placeholder={content.contact.placeholderMsg}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:flex-1 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-violet-500/20 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send size={20} className="rtl:rotate-180" />
                        )}
                        <span>{isSubmitting ? content.contact.sending : content.contact.btn}</span>
                      </button>

                      <div className="flex items-center gap-2 text-green-500 text-xs font-mono bg-green-500/10 px-4 py-3 rounded-xl border border-green-500/20 whitespace-nowrap">
                        <ShieldCheck size={14} />
                        <span>{content.contact.secure}</span>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;