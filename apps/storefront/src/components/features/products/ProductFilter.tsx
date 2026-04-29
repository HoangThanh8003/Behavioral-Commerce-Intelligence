'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const ProductFilter = ({ categories }: { categories: { id: string; name: string }[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('categoryId');

  const handleCategoryChange = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('categoryId', id);
    } else {
      params.delete('categoryId');
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-text-tertiary">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
        </svg>
        {t('products.filterSystem')}
      </h4>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-5 py-2.5 rounded-full font-body text-xs font-medium transition-all duration-300 ${
            !currentCategory
              ? 'bg-emerald text-emerald-on-emerald shadow-[0_0_15px_rgba(46,234,127,0.3)]'
              : 'bg-[#14221A]/80 border border-[#1D3325] backdrop-blur-md text-text-secondary hover:border-emerald/50 hover:text-emerald hover:bg-[#1A2C21]'
          }`}
        >
          {t('products.allArtifacts')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2.5 rounded-full font-body text-xs font-medium transition-all duration-300 ${
              currentCategory === cat.id
                ? 'bg-emerald text-emerald-on-emerald shadow-[0_0_15px_rgba(46,234,127,0.3)]'
                : 'bg-[#14221A]/80 border border-[#1D3325] backdrop-blur-md text-text-secondary hover:border-emerald/50 hover:text-emerald hover:bg-[#1A2C21]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
