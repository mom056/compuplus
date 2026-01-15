"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useApp } from '@/app/providers';
import { Facebook, Linkedin, Instagram, MessageCircle, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { lang, content } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = 2026;

  const SOCIAL_LINKS = [
    { id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/20222728010', icon: MessageCircle },
    { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/Compuplusc', icon: Facebook },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/raafat-girgis-a4a91674', icon: Linkedin },
    { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/compuplus', icon: Instagram },
  ];

  const NAV_LINKS = [
    { name: content.nav.home, href: '/' },
    { name: content.nav.legacy, href: '/#about' },
    { name: content.nav.work, href: '/#projects' },
    { name: content.nav.contact, href: '/#contact' },
  ];

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">

          {/* Left: Brand & Contact */}
          <div className="flex-1 max-w-md">
            <Link href="/" className="inline-flex items-center gap-1 mb-6 group">
              <Logo className="w-12 h-12 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Compu<span className="text-cyan-600 dark:text-cyan-500">Plus</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {content.footer.desc}
            </p>

            {/* Quick Contact */}
            <div className="space-y-3 text-sm">
              <a href="https://maps.app.goo.gl/mhFpozETm5NqcuYP7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group">
                <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <span>{lang === 'ar' ? '128، مصطفى النحاس، مدينة نصر' : '128, Mostafa ElNahas, Nasr City'}</span>
              </a>
              <a href="mailto:info@compuplus.cc" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <span>info@compuplus.cc</span>
              </a>
              <a href="tel:+20222728010" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" dir="ltr">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>+20 2 2272 8010</span>
              </a>
            </div>
          </div>

          {/* Right: Navigation & Social */}
          <div className="flex flex-col items-start lg:items-end gap-8">
            {/* Navigation Links */}
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
            >
              <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to Top'}</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} CompuPlus. {content.footer.rights}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">{content.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">{content.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;