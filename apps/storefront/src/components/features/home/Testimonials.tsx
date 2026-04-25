'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    { quoteKey: 'testimonials.quote1', authorKey: 'testimonials.author1', roleKey: 'testimonials.role1', avatar: 'SC' },
    { quoteKey: 'testimonials.quote2', authorKey: 'testimonials.author2', roleKey: 'testimonials.role2', avatar: 'MR' },
    { quoteKey: 'testimonials.quote3', authorKey: 'testimonials.author3', roleKey: 'testimonials.role3', avatar: 'YT' },
  ];

  const titleRaw = t('testimonials.title');
  const before = titleRaw.split('<1>')[0];
  const italic = titleRaw.match(/<1>(.*?)<\/1>/)?.[1] || '';
  const after = titleRaw.split('</1>')[1] || '';

  return (
    <section className="py-28 border-t border-border">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">{t('testimonials.badge')}</span>
            <span className="h-px w-8 bg-border" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
            {before}<span className="italic text-emerald">{italic}</span>{after}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div key={item.authorKey} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.12 }} className="bg-surface border border-border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-emerald/20">
              <p className="font-body text-base text-text-secondary leading-relaxed mb-8">&ldquo;{t(item.quoteKey)}&rdquo;</p>
              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-overlay border border-border">
                  <span className="font-mono text-xs text-emerald">{item.avatar}</span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-text-primary">{t(item.authorKey)}</p>
                  <p className="font-body text-xs text-text-tertiary">{t(item.roleKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
