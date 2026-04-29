'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, CreditCard, Landmark, QrCode } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const [hasMounted, setHasMounted] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<'momo' | 'bank' | null>(null);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-canvas pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <div className="mb-8 p-10 rounded-full bg-surface border border-border/50 relative group">
           <ShoppingCartIcon className="h-12 w-12 text-text-tertiary group-hover:text-emerald transition-colors" />
           <div className="absolute inset-0 rounded-full bg-emerald/5 blur-2xl group-hover:bg-emerald/10 transition-all" />
        </div>
        <h1 className="font-display text-4xl font-bold text-text-primary mb-4 tracking-tight">Your cart is empty.</h1>
        <p className="font-body text-text-secondary mb-10 max-w-sm">
          It looks like you haven't added any ZENTO products to your ecosystem yet.
        </p>
        <Link 
          href="/products"
          className="bg-emerald text-canvas font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-emerald/90 transition-all shadow-xl shadow-emerald/20 active:scale-95"
        >
          Explore Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-2 h-2 rounded-full bg-emerald" />
             <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Checkout Process</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-text-primary tracking-tighter">Your Ecosystem.</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-border/50 bg-surface/50 backdrop-blur-sm hover:border-emerald/30 transition-all"
                >
                  <div className="relative h-24 w-24 rounded-lg bg-muted overflow-hidden flex-shrink-0 border border-border">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-mono text-[10px] text-text-tertiary">IMG</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-emerald font-bold mb-1">{item.category}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-text-tertiary hover:text-error transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary truncate mb-1 group-hover:text-emerald transition-colors">{item.name}</h3>
                    <p className="font-mono text-sm font-medium text-text-secondary">{formatCurrency(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-canvas/50 rounded-full border border-border/50 p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-emerald/20 bg-surface/30 backdrop-blur-xl shadow-2xl shadow-emerald/5">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary font-bold mb-8">Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="font-body text-sm">Subtotal ({totalItems()} items)</span>
                  <span className="font-mono text-sm">{formatCurrency(totalPrice())}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="font-body text-sm">Shipping</span>
                  <span className="font-mono text-sm uppercase text-success">Complimentary</span>
                </div>
                <div className="h-px bg-border/50 my-2" />
                <div className="flex justify-between items-center text-text-primary">
                  <span className="font-display text-lg font-bold">Total</span>
                  <span className="font-mono text-xl font-bold text-emerald">{formatCurrency(totalPrice())}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary mb-2">Payment Method</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('momo')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'momo' ? 'border-emerald bg-emerald/5' : 'border-border hover:border-emerald/30'}`}
                  >
                    <QrCode size={20} className={paymentMethod === 'momo' ? 'text-emerald' : 'text-text-tertiary'} />
                    <span className="font-mono text-[9px] uppercase tracking-tighter">MoMo</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'bank' ? 'border-emerald bg-emerald/5' : 'border-border hover:border-emerald/30'}`}
                  >
                    <Landmark size={20} className={paymentMethod === 'bank' ? 'text-emerald' : 'text-text-tertiary'} />
                    <span className="font-mono text-[9px] uppercase tracking-tighter">Transfer</span>
                  </button>
                </div>
              </div>

              {paymentMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 rounded-xl bg-canvas/50 border border-emerald/10"
                >
                  {paymentMethod === 'momo' ? (
                    <div className="space-y-2 text-center">
                       <p className="font-body text-[11px] text-text-secondary">Scan the QR code in your MoMo app to complete the transaction.</p>
                       <div className="aspect-square w-32 mx-auto bg-white p-2 rounded-lg opacity-80 flex items-center justify-center text-black font-bold">
                          [QR_CODE]
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-[9px] text-text-tertiary uppercase">Bank</span>
                         <span className="font-mono text-[10px] text-text-primary font-bold">NOMAD BANK</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-[9px] text-text-tertiary uppercase">Account</span>
                         <span className="font-mono text-[10px] text-text-primary font-bold">0123456789</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-[9px] text-text-tertiary uppercase">Holder</span>
                         <span className="font-mono text-[10px] text-text-primary font-bold">ZENTO CO., LTD</span>
                       </div>
                    </div>
                  )}
                </motion.div>
              )}

              <button 
                className="w-full mt-10 bg-emerald text-canvas font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-emerald/90 transition-all shadow-xl shadow-emerald/20 active:scale-[0.98] disabled:opacity-50"
                disabled={!paymentMethod}
              >
                Complete Transaction
              </button>
            </div>
            
            <p className="font-body text-[10px] text-text-tertiary text-center leading-relaxed">
              By completing your order, you agree to our Terms of Service and Privacy Policy. Secure encrypted transaction.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
