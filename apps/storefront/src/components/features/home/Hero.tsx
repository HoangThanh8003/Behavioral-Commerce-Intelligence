'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import Image from 'next/image';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-canvas">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero-bg.png"
          alt="Zento Workspace Gear"
          fill
          priority
          className="object-cover object-center opacity-60 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-canvas/40 backdrop-blur-[1px] z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-10">
        <div className="max-w-4xl">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_theme(colors.emerald.DEFAULT/0.5)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald">
              {t('home.hero.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.1] tracking-tighter"
          >
            High-End Tech & <br />
            <span className="text-emerald italic">Workspace Gear.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 max-w-xl font-body text-lg md:text-xl text-text-secondary leading-relaxed italic"
          >
            Curated-facing im storefront, tech & workspace and oeer shop.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Link 
              href="/products" 
              className="px-8 py-3 bg-emerald text-primary-foreground font-mono text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-emerald/90 transition-all shadow-lg shadow-emerald/20 hover:shadow-emerald/40"
            >
              Explore Collection
            </Link>
            
            <button className="px-8 py-3 border border-border hover:border-emerald/50 text-text-secondary hover:text-text-primary font-mono text-[11px] uppercase tracking-[0.2em] transition-all bg-surface/50 backdrop-blur-md">
              The Process
            </button>
          </motion.div>
        </div>
      </div>

      {/* Industrial detail fixed to bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-10 hidden lg:block"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-tertiary">
          SYS_REV: 2026.04 // B_C_E_01
        </p>
      </motion.div>
    </section>
  );
};
