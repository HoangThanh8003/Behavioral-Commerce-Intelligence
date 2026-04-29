'use client';

import * as React from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

interface AddToCartButtonProps {
  product: any;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  showIcon?: boolean;
}

export const AddToCartButton = ({ 
  product, 
  variant = 'primary', 
  className = '',
  showIcon = true 
}: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setStatus('loading');
    
    // Simulate a small delay for feedback
    setTimeout(() => {
      addItem(product);
      setStatus('success');
      
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 600);
  };

  const variants = {
    primary: "bg-emerald text-canvas hover:bg-emerald/90 shadow-lg shadow-emerald/20",
    outline: "border border-emerald/50 text-emerald hover:bg-emerald/5",
    ghost: "text-text-secondary hover:text-emerald hover:bg-emerald/5"
  };

  return (
    <button
      onClick={handleAdd}
      disabled={status === 'loading'}
      className={`relative flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-70 ${variants[variant]} ${className}`}
    >
      <AnimatePresence mode="wait">
        {status === 'loading' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          </motion.div>
        ) : status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Added</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            {showIcon && <ShoppingCart className="h-3.5 w-3.5" />}
            <span>Add to Cart</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
