'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CTABanner = () => {
  const { t } = useTranslation();

  const titleRaw = t('cta.title');
  const before = titleRaw.split('<1>')[0];
  const italic = titleRaw.match(/<1>(.*?)<\/1>/)?.[1] || '';
  const after = titleRaw.split('</1>')[1] || '';

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/40 via-canvas to-canvas" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald/3 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 md:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-text-primary tracking-tight leading-tight">
            {before}<span className="italic text-emerald">{italic}</span>{after}
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/products" className="group inline-flex h-14 items-center gap-3 rounded-lg bg-emerald px-10 font-body text-sm font-semibold text-emerald-on-emerald transition-all duration-200 hover:bg-emerald-hover active:scale-[0.98]">
              {t('cta.exploreNow')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="inline-flex h-14 items-center gap-2 rounded-lg border border-border px-10 font-body text-sm text-text-secondary transition-colors hover:border-emerald/40 hover:text-text-primary">
              {t('cta.learnMore')}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="flex items-center justify-center gap-8 pt-8">
            {[t('cta.stat1'), t('cta.stat2'), t('cta.stat3')].map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald/60" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">{stat}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
