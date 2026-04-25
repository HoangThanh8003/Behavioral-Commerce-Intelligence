'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('stats.conversionLabel'), value: t('stats.conversionValue'), sub: t('stats.conversionSub') },
    { label: t('stats.accuracyLabel'), value: t('stats.accuracyValue'), sub: t('stats.accuracySub') },
    { label: t('stats.sessionLabel'), value: t('stats.sessionValue'), sub: t('stats.sessionSub') },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-20"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230F1712'/%3E%3C/svg%3E"
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/60 via-canvas/80 to-canvas" />
      </div>

      {/* Grid Lines Decoration */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute left-[20%] top-0 h-full w-px bg-border/10" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-border/10" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-border/10" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-12 bg-emerald/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-text-primary"
            >
              {t('hero.title1')}
              <br />
              {t('hero.title2')}{' '}
              <span className="italic text-emerald">
                {t('hero.title3')}
              </span>
              <br />
              {t('hero.title4')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-body text-lg leading-relaxed text-text-secondary max-w-lg"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/products"
                className="group inline-flex h-12 items-center gap-3 rounded-lg bg-emerald px-8 font-body text-sm font-semibold text-emerald-on-emerald transition-all duration-200 hover:bg-emerald-hover active:scale-[0.98]"
              >
                {t('hero.cta')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="inline-flex h-12 items-center gap-3 rounded-lg border border-border px-6 font-body text-sm text-text-secondary transition-colors hover:border-emerald/40 hover:text-text-primary">
                <Play size={14} className="text-emerald" />
                {t('hero.watchStory')}
              </button>
            </motion.div>
          </div>

          {/* Right Column — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex flex-col gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                className="bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-6 transition-all duration-300 hover:border-emerald/30"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">{stat.label}</p>
                <p className="font-mono text-3xl font-medium text-text-primary">{stat.value}</p>
                <p className="font-body text-xs text-text-tertiary mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-tertiary">{t('common.scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-emerald/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};
