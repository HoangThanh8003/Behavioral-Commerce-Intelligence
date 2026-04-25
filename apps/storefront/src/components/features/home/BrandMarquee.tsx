'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const logos = [
  'MONOCLE', 'ARTIFACT', 'NEURAL', 'SYNDICATE', 'VAULTED', 'MERIDIAN', 'CARBON',
];

export const BrandMarquee = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 md:px-10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary text-center mb-10">
          {t('brands.trustedBy')}
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-canvas to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-canvas to-transparent" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="font-display text-2xl font-semibold text-text-disabled tracking-wider select-none"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
