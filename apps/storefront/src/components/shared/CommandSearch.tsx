'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { Search, X, Loader2, Package, ArrowRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { useUIStore } from '@/store/useUIStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const CommandSearch = () => {
  const { searchOpen: open, setSearchOpen: setOpen } = useUIStore();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const [latestProducts, setLatestProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  // Fetch initial data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${API_URL}/products?take=3`),
          fetch(`${API_URL}/categories`)
        ]);

        if (prodRes.ok) setLatestProducts(await prodRes.json());
        if (catRes.ok) {
           const catData = await catRes.json();
           // Just take 4 main categories for quick nav
           setCategories(catData.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch initial search data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  // Fetch results when query changes
  React.useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Search fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const onSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-canvas/80 backdrop-blur-md transition-all duration-300" />
        <Dialog.Content className="fixed left-1/2 top-[15%] z-[101] w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-emerald/20 transition-all">
          <Command className="flex h-full w-full flex-col overflow-hidden bg-transparent">
            <div className="flex items-center border-b border-border px-4" cmdk-input-wrapper="">
              <Search className="mr-3 h-5 w-5 shrink-0 text-emerald opacity-70" />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search products, categories, ecosystems..."
                className="flex h-14 w-full rounded-md bg-transparent py-4 font-display text-lg outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:opacity-50"
              />
              {isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin text-text-tertiary" />
              ) : query ? (
                <button onClick={() => setQuery('')}>
                  <X className="ml-2 h-4 w-4 text-text-tertiary hover:text-text-primary" />
                </button>
              ) : (
                <div className="flex items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-text-tertiary opacity-100">
                  <span className="text-xs">⌘</span>K
                </div>
              )}
            </div>
            
            <Command.List className="overflow-y-auto overflow-x-hidden p-2 scrollbar-hide max-h-[450px]">
              {/* If searching and no results */}
              {query.length > 0 && results.length === 0 && !isLoading && (
                <div className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 mb-8">
                    <Package className="h-8 w-8 text-text-tertiary opacity-20" />
                    <p className="font-body text-sm text-text-tertiary">No results found for "{query}"</p>
                  </div>
                  
                  {/* Fallback to latest products */}
                  <div className="text-left px-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-emerald/60 mb-4">Recommended Products</p>
                    <div className="space-y-2">
                       {latestProducts.map(product => (
                         <button
                           key={product.id}
                           onClick={() => onSelect(`/products/${product.slug}`)}
                           className="flex w-full items-center gap-4 rounded-lg p-2 hover:bg-emerald/5 transition-all group"
                         >
                            <div className="h-10 w-10 rounded bg-muted overflow-hidden">
                               {product.imageUrls?.[0] && <img src={product.imageUrls[0]} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0" />}
                            </div>
                            <div className="flex-1 text-left">
                               <p className="font-body text-sm text-text-primary">{product.name}</p>
                               <p className="font-mono text-[9px] text-text-tertiary uppercase">{product.category?.name}</p>
                            </div>
                            <ArrowRight size={14} className="text-text-tertiary group-hover:text-emerald" />
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Real search results */}
              {results.length > 0 && (
                <Command.Group heading={<span className="px-2 font-mono text-[10px] uppercase tracking-widest text-emerald/60">Results</span>}>
                  {results.map((product) => (
                    <Command.Item
                      key={product.id}
                      value={product.name}
                      onSelect={() => onSelect(`/products/${product.slug}`)}
                      className="group flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 hover:bg-emerald/5 transition-colors"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        {product.imageUrls?.[0] && (
                           <img src={product.imageUrls[0]} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <span className="font-body text-sm font-medium text-text-primary">{product.name}</span>
                        <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-tight">{product.category?.name || 'Accessories'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="font-mono text-sm font-bold text-emerald">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</span>
                         <ArrowRight className="h-4 w-4 text-emerald opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* Initial state / No query — Compact & Non-Scrolling */}
              {query.length === 0 && (
                <div className="p-2 space-y-6">
                  <div className="space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-2">Recently Added</p>
                    <div className="space-y-1">
                      {latestProducts.slice(0, 3).map(product => (
                        <Command.Item
                          key={product.id}
                          value={product.name}
                          onSelect={() => onSelect(`/products/${product.slug}`)}
                          className="group flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2 hover:bg-emerald/5 transition-colors"
                        >
                          <div className="h-8 w-8 rounded bg-muted overflow-hidden flex-shrink-0">
                             {product.imageUrls?.[0] && <img src={product.imageUrls[0]} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0" />}
                          </div>
                          <span className="font-body text-sm text-text-secondary group-hover:text-text-primary truncate">{product.name}</span>
                          <ArrowRight size={12} className="ml-auto text-text-tertiary group-hover:text-emerald flex-shrink-0" />
                        </Command.Item>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-2">Quick Navigation</p>
                    <div className="grid grid-cols-2 gap-2 px-2">
                      {categories.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => onSelect(`/products?category=${cat.slug}`)}
                          className="flex items-center justify-between rounded-lg border border-border p-3 text-left hover:border-emerald/30 hover:bg-emerald/5 transition-all group"
                        >
                          <span className="font-body text-xs text-text-secondary group-hover:text-text-primary truncate">{cat.name}</span>
                          <ArrowRight size={12} className="text-text-tertiary group-hover:text-emerald flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Command.List>
            
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary">
               <div className="flex gap-4">
                  <span><span className="text-text-secondary">↑↓</span> Navigate</span>
                  <span><span className="text-text-secondary">↵</span> Select</span>
               </div>
               <div>Zento Search Engine v1.0</div>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
