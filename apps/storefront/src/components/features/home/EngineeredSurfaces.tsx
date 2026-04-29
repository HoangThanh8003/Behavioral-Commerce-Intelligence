'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

export const EngineeredSurfaces = () => {
  const { t } = useTranslation();

  const materials = [
    { 
      src: "https://images.pexels.com/photos/172277/pexels-photo-172277.jpeg?auto=compress&cs=tinysrgb&w=800",
      label: "Anodized Aluminum",
      desc: "Aircraft-grade, corrosion-resistant"
    },
    { 
      src: "https://images.pexels.com/photos/131634/pexels-photo-131634.jpeg?auto=compress&cs=tinysrgb&w=800",
      label: "Tempered Glass",
      desc: "Scratch-proof, edge-polished"
    },
    { 
      src: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      label: "Premium PBT",
      desc: "Double-shot keycaps, zero shine"
    },
    { 
      src: "https://images.pexels.com/photos/10368532/pexels-photo-10368532.jpeg?auto=compress&cs=tinysrgb&w=800",
      label: "Precision Polymer",
      desc: "Dampening layers, zero rattle"
    },
  ];

  return (
    <section className="py-24 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
              <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                Materials
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Built With the Best
            </h2>
          </div>
          <p className="font-body text-sm text-text-secondary max-w-sm leading-relaxed">
            Every product is crafted from industrial-grade materials chosen for durability, feel, and precision.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {materials.map((mat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border group cursor-pointer"
            >
              <Image 
                src={mat.src}
                alt={mat.label}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <p className="font-body text-sm font-medium text-text-primary">{mat.label}</p>
                <p className="font-body text-xs text-text-tertiary">{mat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link 
            href="/products" 
            className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Explore our full collection →
          </Link>
        </div>
      </div>
    </section>
  );
};
