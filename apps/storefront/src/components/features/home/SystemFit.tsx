'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const SystemFit = () => {
  const { t } = useTranslation();

  const setups = [
    {
      id: 'focus',
      label: 'The Silent Architect',
      price: '$268.00',
      items: ['KX-75 Silent Keyboard', 'Arc Monitor Light Bar', 'Control Surface'],
      slug: 'mechanical-keyboards'
    },
    {
      id: 'precision',
      label: 'The Studio Ecosystem',
      price: '$468.00',
      items: ['Forge Limited', 'Omni Pod Microphone', 'Grid Riser'],
      slug: 'workspace-accessories'
    }
  ];

  return (
    <section className="py-24 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
             <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary">Engineered Ecosystems</span>
             <h2 className="font-serif text-5xl md:text-6xl font-bold text-text-primary tracking-tight">
                ZENTO <br /> <span className="italic text-text-secondary">Bundles.</span>
             </h2>
          </div>
          <p className="font-body text-sm text-text-secondary italic max-w-xs md:text-right">
             Curated sets of ZENTO hardware designed to work in absolute sync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {setups.map((setup) => (
            <div key={setup.id} className="group relative p-8 bg-surface/30 border border-border rounded-lg hover:border-primary/50 transition-all duration-500 overflow-hidden">
               <div className="absolute top-0 right-0 p-8 flex flex-col items-end">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-1">Bundle Price</span>
                  <span className="font-mono text-2xl font-bold text-text-primary">{setup.price}</span>
               </div>
               
               <div className="space-y-10 relative z-10">
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-text-primary">{setup.label}</h3>
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary">High-Performance Synergy</p>
                  </div>

                  <div className="space-y-4">
                     {setup.items.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary/20 border border-primary/40" />
                           <span className="font-body text-sm text-text-secondary group-hover:text-text-primary transition-colors">{item}</span>
                        </div>
                     ))}
                  </div>
                  
                  <Link 
                    href={`/products?category=${setup.slug}`}
                    className="inline-block w-full py-4 bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-[0.3em] text-center hover:bg-primary hover:text-canvas transition-all"
                  >
                     Shop This Bundle
                  </Link>
               </div>

               {/* Geometric decoration */}
               <div className="absolute -bottom-12 -right-12 w-48 h-48 border border-primary/5 rounded-full group-hover:border-primary/20 transition-colors duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
