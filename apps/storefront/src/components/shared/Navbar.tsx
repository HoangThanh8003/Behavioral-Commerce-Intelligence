'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Globe, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/shared/Logo';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVi = i18n.language === 'vi';

  const toggleLang = () => {
    i18n.changeLanguage(isVi ? 'en' : 'vi');
  };

  const navItems = [
    { key: 'shop', href: '/products' },
    { key: 'categories', href: '/categories' },
    { key: 'about', href: '/philosophy' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-canvas/70 backdrop-blur-xl shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        {/* Navigation Links — Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-text-primary"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </div>

        {/* Actions — compact */}
        <div className="flex items-center gap-2">
          {/* Language Toggle — single button */}
          <button
            onClick={toggleLang}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="Toggle language"
          >
            <Globe size={14} strokeWidth={1.5} />
            <span className="font-mono text-[9px] font-medium uppercase">{isVi ? 'VI' : 'EN'}</span>
          </button>

          {/* Search — Desktop only */}
          <button className="hidden md:flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:text-text-primary">
            <Search size={14} strokeWidth={1.5} />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:text-text-primary">
            <ShoppingCart size={14} strokeWidth={1.5} />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-text-primary text-[7px] font-bold text-canvas">
              0
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-8 w-8 items-center justify-center rounded-md text-text-tertiary"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-canvas/95 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block font-body text-xs font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary py-1.5"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
