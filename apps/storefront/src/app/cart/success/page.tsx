'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

function CartSuccessContent() {
  const searchParams = useSearchParams();
  const resultCode = searchParams.get('resultCode');
  const message = searchParams.get('message');
  const { clearCart } = useCartStore();

  React.useEffect(() => {
    // If it's a success (MoMo resultCode 0 is success)
    if (resultCode === '0' || resultCode === null) {
      clearCart();
    }
  }, [resultCode, clearCart]);

  const isSuccess = resultCode === '0' || resultCode === null;

  return (
    <main className="min-h-screen bg-canvas pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
      <div className="mb-8 p-10 rounded-full bg-surface border border-border/50 relative group">
        <CheckCircle2 
          className={`h-16 w-16 ${isSuccess ? 'text-emerald' : 'text-error'} transition-colors`} 
        />
        <div className={`absolute inset-0 rounded-full ${isSuccess ? 'bg-emerald/10' : 'bg-error/10'} blur-2xl transition-all`} />
      </div>
      
      <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
        {isSuccess ? 'Transaction Complete.' : 'Transaction Failed.'}
      </h1>
      
      <p className="font-body text-text-secondary mb-10 max-w-md mx-auto leading-relaxed">
        {isSuccess 
          ? 'Your payment has been successfully processed. Welcome to the next level of your ecosystem.'
          : message || 'There was an issue processing your payment. Please try again or contact support.'}
      </p>

      <div className="flex gap-4">
        {!isSuccess && (
          <Link 
            href="/cart"
            className="bg-surface border border-border text-text-primary font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:border-text-secondary transition-all active:scale-95"
          >
            Return to Cart
          </Link>
        )}
        <Link 
          href="/products"
          className="bg-emerald text-canvas font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-emerald/90 transition-all shadow-xl shadow-emerald/20 active:scale-95 flex items-center gap-2"
        >
          Continue Shopping
          <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}

export default function CartSuccessPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-canvas pt-32 pb-20 flex justify-center items-center">Loading...</div>}>
      <CartSuccessContent />
    </React.Suspense>
  );
}
