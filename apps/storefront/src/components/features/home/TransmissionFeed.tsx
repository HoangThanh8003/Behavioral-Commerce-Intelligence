'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const TransmissionFeed = () => {
  const { t } = useTranslation();

  const socialProof = [
    {
      text: t('home.transmissionFeed.newDrop'),
      time: 'Just now',
    },
    {
      text: t('home.transmissionFeed.refining'),
      time: '2 min ago',
    },
    {
      text: t('home.transmissionFeed.location'),
      time: '5 min ago',
    },
  ];

  return (
    <section className="py-20 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center space-y-12">
          <div className="space-y-3 text-center">
            <div className="flex items-center gap-2 justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
              <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                Happening Now
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold text-text-primary tracking-tight">
              Worldwide
            </h2>
          </div>
          
          <div className="w-full max-w-2xl space-y-1">
            {socialProof.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-between py-5 border-b border-border/30 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald flex-shrink-0" />
                  <p className="font-body text-base text-text-primary transition-all duration-300 group-hover:text-emerald">
                    {item.text}
                  </p>
                </div>
                <span className="font-mono text-xs text-text-tertiary flex-shrink-0 ml-4">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
