'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/theme-context';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isVi = i18n.language === 'vi';

  const toggleLang = () => {
    i18n.changeLanguage(isVi ? 'en' : 'vi');
  };

  const navItems = [
    { key: 'shop', href: '/products' },
    { key: 'categories', href: '/categories' },
    { key: 'journal', href: '/journal' },
    { key: 'about', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-canvas/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">N</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tighter text-text-primary">
            NEXUS<span className="text-emerald">AI</span>
          </span>
        </Link>

        {/* Navigation Links — Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="font-body text-xs font-medium uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-emerald"
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
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-text-secondary transition-colors hover:text-emerald"
            aria-label="Toggle language"
          >
            <Globe size={15} strokeWidth={1.5} />
            <span className="font-mono text-[10px] font-medium uppercase">{isVi ? 'VI' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-emerald"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
          </button>

          {/* Search — Desktop only */}
          <button className="hidden md:flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-emerald">
            <Search size={16} strokeWidth={1.5} />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-emerald">
            <ShoppingCart size={16} strokeWidth={1.5} />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald text-[8px] font-bold text-primary-foreground">
              0
            </span>
          </Link>

          {/* Sign In — Desktop */}
          <Link href="/auth/login" className="hidden lg:block ml-2">
            <button className="h-8 rounded-md border border-border px-4 font-body text-[10px] font-semibold uppercase tracking-widest text-text-primary transition-all hover:bg-surface active:scale-95">
              {t('nav.signIn')}
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-8 w-8 items-center justify-center rounded-md text-text-secondary"
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
                className="block font-body text-sm text-text-secondary transition-colors hover:text-emerald py-1.5"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <button className="w-full h-9 rounded-md border border-border font-body text-xs font-semibold uppercase tracking-widest text-text-primary transition-all hover:bg-surface">
                  {t('nav.signIn')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
