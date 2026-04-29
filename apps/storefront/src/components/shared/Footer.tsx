'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/shared/Logo';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-canvas">
      <div className="container mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
            <p className="font-body text-sm leading-relaxed text-text-secondary max-w-xs">
              {t('footer.brand')}
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-5">
            <h4 className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {[
                { key: 'nav.shop', href: '/products' },
                { key: 'nav.categories', href: '/categories' },
                { key: 'footer.newArrivals', href: '/products?sort=newest' },
                { key: 'footer.aiPicks', href: '/products?filter=featured' },
              ].map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {[
                { key: 'nav.about', href: '/philosophy' },
                { key: 'footer.contact', href: '/contact' },
              ].map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <h4 className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
              {t('footer.system')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                <span className="font-body text-sm text-text-secondary">{t('footer.allSystems')}</span>
              </div>
              <p className="font-body text-xs text-text-tertiary leading-relaxed">
                Free worldwide shipping on orders over $200. 
                2-year warranty on all products.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-disabled">
            © {new Date().getFullYear()} ZENTO. {t('footer.rights')}
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
