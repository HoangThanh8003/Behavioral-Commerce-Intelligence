'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export const EngineeredSurfaces = () => {
  const { t } = useTranslation();

  const materials = [
    "https://images.pexels.com/photos/172277/pexels-photo-172277.jpeg?auto=compress&cs=tinysrgb&w=800", // Metal
    "https://images.pexels.com/photos/131634/pexels-photo-131634.jpeg?auto=compress&cs=tinysrgb&w=800", // Glass
    "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800", // Engineered Polymer / Carbon
    "https://images.pexels.com/photos/10368532/pexels-photo-10368532.jpeg?auto=compress&cs=tinysrgb&w=800", // Precision Components
  ];

  return (
    <section className="py-32 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary"
            >
              08 — DENSITY
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl font-bold text-text-primary tracking-tighter"
            >
              {t('home.materialDepth.headline')}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-body text-base text-text-secondary max-w-sm leading-relaxed"
          >
            {t('home.materialDepth.focus')}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
          {materials.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className="relative aspect-[3/4] rounded-sm overflow-hidden border border-border group"
            >
              <Image 
                src={src}
                alt={`Engineered Surface ${index + 1}`}
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 opacity-60"
              />
              <div className="absolute inset-0 bg-canvas/30 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
              <div className="absolute inset-0 border border-text-primary/0 group-hover:border-text-primary/10 transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
