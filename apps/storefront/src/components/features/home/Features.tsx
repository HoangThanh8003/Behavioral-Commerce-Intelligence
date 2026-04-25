'use client';

import { motion } from 'framer-motion';
import { Zap, Eye, ShoppingCart, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Eye,
      titleKey: 'features.tracking',
      descKey: 'features.trackingDesc',
      metricKey: 'features.trackingMetric',
    },
    {
      icon: Zap,
      titleKey: 'features.personalization',
      descKey: 'features.personalizationDesc',
      metricKey: 'features.personalizationMetric',
    },
    {
      icon: TrendingUp,
      titleKey: 'features.predictive',
      descKey: 'features.predictiveDesc',
      metricKey: 'features.predictiveMetric',
    },
    {
      icon: ShoppingCart,
      titleKey: 'features.checkout',
      descKey: 'features.checkoutDesc',
      metricKey: 'features.checkoutMetric',
    },
  ];

  return (
    <section className="py-28 border-t border-border">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16 space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-emerald/50" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald">
              {t('features.badge')}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
            {t('features.title').split('<1>')[0]}
            <span className="italic">{t('features.title').match(/<1>(.*?)<\/1>/)?.[1] || ''}</span>
            {t('features.title').split('</1>')[1] || ''}
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-surface border border-border rounded-2xl p-8 transition-all duration-300 hover:border-emerald/30 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-overlay border border-border transition-colors group-hover:border-emerald/30">
                  <feature.icon size={22} strokeWidth={1.5} className="text-emerald" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                {t(feature.descKey)}
              </p>

              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                <span className="font-mono text-xs text-emerald">{t(feature.metricKey)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
