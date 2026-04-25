'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className={cn(
          "relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border",
          "transition-all duration-300",
          isZoomed && "cursor-zoom-out"
        )}
        onMouseEnter={() => hasImages && setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {hasImages ? (
          <Image
            src={images[selectedIndex]}
            alt={`${productName} — Image ${selectedIndex + 1}`}
            fill
            priority
            className={cn(
              "object-cover transition-transform duration-500",
              isZoomed && "scale-110"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-canvas border border-border flex items-center justify-center">
                <span className="font-display text-4xl text-text-tertiary">N</span>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-disabled">
                  {t('product.imagePending')}
                </p>
                <p className="font-body text-xs text-text-disabled">
                  {t('product.imageProduction')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Image Counter */}
        {hasImages && images.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-canvas/70 backdrop-blur-md border border-border/50">
            <span className="font-mono text-[10px] text-text-secondary">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
                idx === selectedIndex
                  ? "border-emerald shadow-lg shadow-emerald/10"
                  : "border-border hover:border-emerald/40 opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
