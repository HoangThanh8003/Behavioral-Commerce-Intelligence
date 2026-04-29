'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export const RitualOfUse = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-canvas border-t border-border overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-display text-5xl md:text-7xl font-bold text-text-primary tracking-tight leading-none"
            >
              Precision in Every Detail.
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-display italic text-xl md:text-2xl text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Every keystroke, every light adjustment, every surface — designed for the quiet pursuit of mastery.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href="/products" 
              className="inline-flex items-center bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-8 h-10 rounded-lg transition-colors duration-150 active:scale-[0.98]"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
