'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { register } from '@/services/auth';
import { Loader2, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await register(formData);
      setAuth(data.user, data.access_token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/20 bg-emerald/5 mb-6">
              <UserPlus size={12} className="text-emerald" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald font-bold">New Member</span>
           </div>
           <h1 className="font-display text-4xl font-bold text-text-primary tracking-tighter mb-3">Initiate Identity.</h1>
           <p className="font-body text-sm text-text-tertiary">Join the collective and personalize your ecosystem.</p>
        </div>

        <div className="p-8 rounded-3xl border border-border/50 bg-surface/30 backdrop-blur-2xl shadow-2xl shadow-canvas">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Ex: John Wick"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-11 bg-canvas/50 border border-border/50 rounded-xl px-4 font-body text-sm outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Ex: ghost_runner"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-11 bg-canvas/50 border border-border/50 rounded-xl px-4 font-body text-sm outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Ex: contact@nexus.ai"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 bg-canvas/50 border border-border/50 rounded-xl px-4 font-body text-sm outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 bg-canvas/50 border border-border/50 rounded-xl px-4 font-body text-sm outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-error font-body text-xs px-1 animate-pulse">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald text-canvas font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-emerald/90 transition-all shadow-xl shadow-emerald/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 mt-6"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 font-body text-xs text-text-tertiary">
          Already a member?{' '}
          <Link href="/auth/login" className="text-emerald hover:underline font-bold">Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}
