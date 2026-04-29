'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getOrderHistory } from '@/services/auth';
import { formatCurrency } from '@/lib/utils';
import { 
  User, 
  Package, 
  LogOut, 
  ChevronRight, 
  Clock, 
  Shield, 
  Settings,
  CreditCard,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountPage() {
  const { user, token, logout, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getOrderHistory(token!);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, token, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) return null;

  return (
    <main className="min-h-screen bg-canvas pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Profile Card */}
          <aside className="lg:w-1/3 space-y-6">
            <div className="p-8 rounded-3xl border border-border/50 bg-surface/30 backdrop-blur-xl shadow-2xl shadow-canvas text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-emerald/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-muted border-2 border-emerald/50 flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-emerald" />
                  )}
                </div>
              </div>
              <h1 className="font-display text-2xl font-bold text-text-primary mb-1">{user.name}</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-6">@{user.username}</p>
              
              <div className="flex flex-col gap-2">
                 <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-canvas/50 border border-border/50 hover:border-emerald/30 transition-all group">
                    <Settings size={14} className="text-text-tertiary group-hover:text-emerald" />
                    <span className="font-body text-xs text-text-secondary group-hover:text-text-primary">Account Settings</span>
                    <ChevronRight size={12} className="ml-auto text-text-tertiary" />
                 </button>
                 <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-error/5 border border-error/20 hover:bg-error/10 transition-all group"
                 >
                    <LogOut size={14} className="text-error" />
                    <span className="font-body text-xs text-error font-bold">Logout Session</span>
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div className="p-4 rounded-2xl border border-border/30 bg-surface/20 text-center">
                  <Package size={16} className="mx-auto mb-2 text-text-tertiary" />
                  <p className="font-mono text-[10px] text-text-tertiary uppercase">Orders</p>
                  <p className="font-display text-xl font-bold text-text-primary">{orders.length}</p>
               </div>
               <div className="p-4 rounded-2xl border border-border/30 bg-surface/20 text-center">
                  <Shield size={16} className="mx-auto mb-2 text-text-tertiary" />
                  <p className="font-mono text-[10px] text-text-tertiary uppercase">Status</p>
                  <p className="font-display text-xl font-bold text-emerald">Active</p>
               </div>
            </div>
          </aside>

          {/* Main Content / Orders */}
          <section className="lg:w-2/3 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="font-display text-3xl font-bold text-text-primary tracking-tight">Order History.</h2>
               <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50 border border-border/50">
                  <Clock size={12} className="text-text-tertiary" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Real-time Sync</span>
               </div>
            </div>

            {isLoading ? (
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 w-full bg-surface/30 animate-pulse rounded-2xl border border-border/50" />
                  ))}
               </div>
            ) : orders.length === 0 ? (
               <div className="py-20 text-center rounded-3xl border border-dashed border-border/50 bg-surface/10">
                  <Package size={32} className="mx-auto mb-4 text-text-tertiary opacity-20" />
                  <p className="font-body text-sm text-text-tertiary mb-6">No purchase data found in your ecosystem.</p>
                  <button 
                    onClick={() => router.push('/products')}
                    className="font-mono text-[10px] uppercase tracking-widest text-emerald font-bold border-b border-emerald pb-1"
                  >
                    Start your collection →
                  </button>
               </div>
            ) : (
               <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-2xl border border-border/50 bg-surface/20 backdrop-blur-sm hover:border-emerald/30 transition-all group"
                    >
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary mb-1">Order #{order.id.slice(0, 8)}</p>
                            <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-emerald transition-colors">
                               {formatCurrency(Number(order.totalAmount))}
                            </h3>
                            <p className="font-body text-xs text-text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
                         </div>
                         <div className={`px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-widest font-bold ${order.status === 'COMPLETED' ? 'bg-success/10 text-success' : 'bg-emerald/10 text-emerald'}`}>
                            {order.status}
                         </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            )}

            {/* Other Sections Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-6 rounded-2xl border border-border/50 bg-surface/20 flex items-center gap-4 group cursor-pointer hover:border-emerald/30 transition-all">
                  <MapPin className="text-text-tertiary group-hover:text-emerald" />
                  <div>
                     <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Shipping</p>
                     <p className="font-body text-sm text-text-primary">Manage Addresses</p>
                  </div>
               </div>
               <div className="p-6 rounded-2xl border border-border/50 bg-surface/20 flex items-center gap-4 group cursor-pointer hover:border-emerald/30 transition-all">
                  <CreditCard className="text-text-tertiary group-hover:text-emerald" />
                  <div>
                     <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Billing</p>
                     <p className="font-body text-sm text-text-primary">Payment Methods</p>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
