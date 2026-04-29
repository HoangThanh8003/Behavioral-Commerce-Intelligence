'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const PersonaSwitcher = () => {
  const { t } = useTranslation();
  const [activePersona, setActivePersona] = useState('nightOwl');

  const personas = [
    { 
      id: 'minimalist', 
      label: t('home.personaSwitcher.minimalist'),
      themeClass: 'theme-minimalist',
      vibe: 'High-Contrast, Stark'
    },
    { 
      id: 'nightOwl', 
      label: t('home.personaSwitcher.nightOwl'),
      themeClass: 'theme-nightowl',
      vibe: 'Deep Emerald Glow'
    },
    { 
      id: 'architect', 
      label: t('home.personaSwitcher.architect'),
      themeClass: 'theme-architect',
      vibe: 'Industrial Graphite'
    },
  ];

  // Apply theme to document
  useEffect(() => {
    const persona = personas.find(p => p.id === activePersona);
    if (persona) {
      document.documentElement.className = persona.themeClass;
    }
  }, [activePersona]);

  return (
    <section className="relative py-24 bg-canvas border-t border-border overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary">
              Atmospheric Orchestration
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
              Select Your Environment
            </h2>
          </div>
          <p className="font-body text-sm text-text-secondary leading-relaxed italic max-w-xs text-center md:text-right">
            The system adapts its aesthetic and product curation to your current behavioral state.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((persona, index) => (
            <button
              key={persona.id}
              onClick={() => setActivePersona(persona.id)}
              className={`group relative p-8 text-left rounded-lg border transition-all duration-500 ${
                activePersona === persona.id
                  ? 'bg-surface border-primary shadow-[0_0_30px_rgba(var(--primary),0.1)]'
                  : 'bg-surface/30 border-border hover:border-primary/30'
              }`}
            >
              <div className="flex flex-col gap-6">
                <span className={`font-mono text-[9px] uppercase tracking-[0.3em] ${
                  activePersona === persona.id ? 'text-primary' : 'text-text-tertiary'
                }`}>
                  0{index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className={`font-display text-2xl transition-colors ${
                    activePersona === persona.id ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                  }`}>
                    {persona.label}
                  </h3>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-text-disabled">
                    {persona.vibe}
                  </p>
                </div>
              </div>

              {activePersona === persona.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),1)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
