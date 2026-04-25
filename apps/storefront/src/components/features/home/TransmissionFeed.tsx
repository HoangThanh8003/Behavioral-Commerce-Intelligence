'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const TransmissionFeed = () => {
  const { t } = useTranslation();

  const feedItems = [
    t('home.transmissionFeed.newDrop'),
    t('home.transmissionFeed.refining'),
    t('home.transmissionFeed.location'),
  ];

  return (
    <section className="py-32 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center space-y-16">
          <div className="space-y-4 text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary"
            >
              09 — LIVE PULSE
            </motion.p>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary tracking-tight">
              The Global Ritual
            </h2>
          </div>
          
          <div className="w-full max-w-3xl space-y-1">
            {feedItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/30 last:border-0 group cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    <span className="absolute w-4 h-4 rounded-full border border-emerald opacity-20 animate-ping" />
                  </div>
                  <p className="font-body text-xl md:text-2xl text-text-primary tracking-tight transition-all duration-500 group-hover:pl-2 group-hover:text-emerald">
                    {item}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 opacity-40">
                  <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em]">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <span className="w-px h-3 bg-border" />
                  <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em]">
                    SYNC_ACTIVE
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
