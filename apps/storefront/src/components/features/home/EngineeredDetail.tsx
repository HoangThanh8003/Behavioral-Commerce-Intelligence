'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export const EngineeredDetail = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary">
                  Engineered for Performance
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-[1.1]">
                The Silent <br />
                <span className="italic text-text-secondary">Standard.</span>
              </h2>
              <p className="font-body text-base text-text-secondary leading-relaxed max-w-md opacity-90">
                Experience the KX-Series. Engineered with multi-layer acoustic dampening to eliminate resonance while maintaining the precision of every keystroke. 
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-y border-border/50 py-10">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary">Acoustics</span>
                <p className="font-body text-xs text-text-secondary">Zero-resonance typing.</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary">Durability</span>
                <p className="font-body text-xs text-text-secondary">100M+ Actuation lifecycle.</p>
              </div>
            </div>
            
            <Link 
              href="/products?search=silent"
              className="inline-flex items-center gap-6 group"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-primary group-hover:text-primary transition-colors">Shop the Silent Series</span>
              <div className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500" />
            </Link>
          </div>

          <div className="relative aspect-[4/3]">
            {/* Clean product focus area */}
            <div className="absolute inset-0 bg-surface/20 rounded-lg border border-border overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
               <div className="h-full w-full flex items-center justify-center p-8">
                  {/* Placeholder for a high-end product shot */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-64 h-32 bg-primary/10 rounded-sm blur-3xl animate-pulse" />
                    <div className="absolute font-mono text-[8px] text-text-tertiary uppercase tracking-[1em] -rotate-90 right-0">
                       SERIES_KX_75
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
