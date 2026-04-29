'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const EngineeredDetail = () => {
  return (
    <section className="py-24 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
                <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                  Spotlight
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
                The Silent Standard.
              </h2>
              <p className="font-body text-base text-text-secondary leading-relaxed max-w-md">
                Our KX-Series keyboards feature multi-layer acoustic dampening 
                for a deep, satisfying typing experience with zero resonance. 
                Designed for writers and professionals who need absolute silence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-border py-8">
              <div className="space-y-1">
                <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">Sound</span>
                <p className="font-body text-sm text-text-secondary">Zero-resonance typing</p>
              </div>
              <div className="space-y-1">
                <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">Durability</span>
                <p className="font-body text-sm text-text-secondary">100M+ keystrokes rated</p>
              </div>
            </div>
            
            <Link 
              href="/products"
              className="inline-flex items-center bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-6 h-10 rounded-lg transition-colors duration-150 active:scale-[0.98]"
            >
              Shop Keyboards
            </Link>
          </motion.div>

          {/* Right: Visual */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-surface rounded-xl border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-transparent to-transparent" />
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-48 h-24 bg-emerald/10 rounded-2xl blur-3xl" />
              </div>
              {/* Inner top glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
