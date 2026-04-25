'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const RitualOfUse = () => {
  const { t } = useTranslation();

  return (
    <section className="py-48 bg-canvas border-t border-border overflow-hidden relative">
      {/* Subtle Grain Overlay Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] uppercase tracking-[0.5em] text-text-tertiary"
            >
              07 — EXPERIENCE
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-text-primary tracking-tighter leading-[0.9]"
            >
              {t('home.ritualOfUse.headline')}
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-serif text-xl md:text-3xl lg:text-4xl text-text-secondary leading-relaxed italic font-light max-w-3xl mx-auto"
          >
            “{t('home.ritualOfUse.tone')}”
          </motion.p>
          
          {/* Subtle horizontal line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="w-24 h-px bg-text-primary/20 mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
