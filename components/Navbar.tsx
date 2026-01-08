import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '@/app/providers';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, content } = useApp();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Robust scrolling function
  const handleNavClick = async (e: React.MouseEvent<HTMLAnchorElement | HTMLElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // If we are not on the home page and the link is a section link (starts with #)
    if (window.location.pathname !== '/' && id.startsWith('#')) {
      // Navigate to home page first
      window.location.href = '/' + id;
      return;
    }

    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // Use scrollIntoView with timeout to ensure UI is ready
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: content.nav.home, href: '#hero', isRoute: false },
    { label: content.nav.capabilities, href: '#services', isRoute: false },
    { label: content.nav.blog, href: '/blog', isRoute: true },
    { label: content.nav.whyUs, href: '#stats', isRoute: false },
    { label: content.nav.legacy, href: '#journey', isRoute: false },
    { label: content.nav.work, href: '#portfolio', isRoute: false },
    { label: content.nav.contact, href: '#contact', isRoute: false },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 -z-10 ${isScrolled
            ? 'glass-card shadow-lg backdrop-blur-xl bg-white/60 dark:bg-navy-900/40 rounded-b-2xl border-b border-white/20'
            : 'bg-transparent'
            }`}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 cursor-pointer group relative"
          >
            {/* Logo Container for Overflow */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px]">
                <Logo className="w-full h-full group-hover:animate-spin-slow" />
              </div>
            </div>

            <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white transition-colors ml-2">
              Compu<span className="text-cyan-600 dark:text-cyan-400">Plus</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors uppercase tracking-widest relative group font-sans py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors uppercase tracking-widest relative group font-sans py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-sans"
            >
              <Globe size={18} />
              <span>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2 border border-cyan-600/30 dark:border-cyan-400/30 text-cyan-700 dark:text-cyan-400 rounded hover:bg-cyan-600/10 dark:hover:bg-cyan-400/10 transition-all duration-300 uppercase text-xs tracking-widest font-bold"
            >
              {content.nav.quote}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleLang}
              className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 font-sans"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-slate-900 dark:text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out lg:hidden flex flex-col pt-24 px-6 gap-6 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {navItems.map((item) => (
          item.isRoute ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-800 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-center font-sans py-2 border-b border-slate-100 dark:border-white/5"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl font-bold text-slate-800 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-center font-sans py-2 border-b border-slate-100 dark:border-white/5"
            >
              {item.label}
            </a>
          )
        ))}
        <button
          onClick={(e) => handleNavClick(e, '#contact')}
          className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold mt-4 shadow-lg transition-colors"
        >
          {content.nav.quote}
        </button>
      </div>
    </>
  );
};

export default Navbar;