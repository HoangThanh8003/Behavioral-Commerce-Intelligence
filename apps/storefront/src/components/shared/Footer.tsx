'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-canvas">
      <div className="container mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald flex items-center justify-center">
                <span className="font-display font-bold text-emerald-on-emerald text-lg">N</span>
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter text-text-primary">
                NEXUS<span className="text-emerald">AI</span>
              </span>
            </Link>
            <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xs">
              {t('footer.brand')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {[
                { key: 'nav.shop', href: '/products' },
                { key: 'nav.categories', href: '/categories' },
                { key: 'footer.newArrivals', href: '/products?sort=newest' },
                { key: 'footer.aiPicks', href: '/products?filter=ai' },
              ].map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="font-body text-sm text-text-secondary transition-colors hover:text-emerald">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {[
                { key: 'nav.about', href: '/about' },
                { key: 'nav.journal', href: '/journal' },
                { key: 'footer.careers', href: '/careers' },
                { key: 'footer.contact', href: '/contact' },
              ].map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="font-body text-sm text-text-secondary transition-colors hover:text-emerald">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System */}
          <div className="space-y-5">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
              {t('footer.system')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                <span className="font-mono text-xs text-emerald">{t('footer.allSystems')}</span>
              </div>
              <p className="font-mono text-[10px] text-text-disabled leading-relaxed">
                Engine: AI_BRAIN v2.0<br />
                Build: Production<br />
                Region: AP-Southeast
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-disabled">
            © {new Date().getFullYear()} NexusAI. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            {['privacy', 'terms', 'cookies'].map((key) => (
              <Link key={key} href={`/${key}`} className="font-body text-xs text-text-disabled transition-colors hover:text-text-secondary">
                {t(`footer.${key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
