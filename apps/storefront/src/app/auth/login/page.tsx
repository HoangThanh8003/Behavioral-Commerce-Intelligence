'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { login, register, socialLogin } from '@/services/auth';
import { Loader2, ArrowRight, Mail, ShieldCheck, Globe, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login-typed';

export default function LoginPage() {
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState<'google' | 'facebook' | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleAuthSuccess = (data: any) => {
    setAuth(data.user, data.access_token);
    router.push('/');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setSocialLoading('google');
      setError(null);
      try {
        // Fetch user info from Google API
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await res.json();
        
        const data = await socialLogin({
          provider: 'GOOGLE',
          providerId: googleUser.sub,
          email: googleUser.email,
          name: googleUser.name,
          avatarUrl: googleUser.picture,
        });
        handleAuthSuccess(data);
      } catch (err: any) {
        setError('Google login failed');
      } finally {
        setSocialLoading(null);
      }
    },
    onError: () => setError('Google login failed'),
  });

  const responseFacebook = async (response: any) => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    if (!appId || appId === 'your_facebook_app_id_here') {
      setError('Facebook App ID is not configured in .env');
      return;
    }
    
    if (!response.accessToken) return;
    
    setSocialLoading('facebook');
    setError(null);
    try {
      const data = await socialLogin({
        provider: 'FACEBOOK',
        providerId: response.id,
        email: response.email,
        name: response.name,
        avatarUrl: response.picture?.data?.url,
      });
      handleAuthSuccess(data);
    } catch (err: any) {
      setError('Facebook login failed');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await login(identifier, password);
      handleAuthSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/20 bg-emerald/5 mb-6">
              <ShieldCheck size={12} className="text-emerald" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald font-bold">Secure Access</span>
           </div>
           <h1 className="font-display text-4xl font-bold text-text-primary tracking-tighter mb-3">Welcome Back.</h1>
           <p className="font-body text-sm text-text-tertiary">Continue your journey in the ZENTO ecosystem.</p>
        </div>

        <div className="p-8 rounded-3xl border border-border/50 bg-surface/30 backdrop-blur-2xl shadow-2xl shadow-canvas">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-1">Identifier</label>
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full h-12 bg-canvas/50 border border-border/50 rounded-xl px-4 font-body text-sm outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Password</label>
                 <Link href="/auth/forgot" className="font-mono text-[9px] text-emerald/60 hover:text-emerald transition-colors">Recover?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-canvas/50 border border-border/50 rounded-xl px-4 font-body text-sm outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
                required
              />
            </div>

            {error && (
              <p className="text-error font-body text-xs px-1 animate-pulse text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !!socialLoading}
              className="w-full h-12 bg-emerald text-canvas font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-emerald/90 transition-all shadow-xl shadow-emerald/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-surface/30 px-3 text-text-tertiary backdrop-blur-md">Or continue with</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => googleLogin()}
              disabled={!!socialLoading}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border/50 bg-canvas/30 hover:bg-canvas/50 transition-all group disabled:opacity-50"
            >
               {socialLoading === 'google' ? <Loader2 size={16} className="animate-spin" /> : (
                 <>
                  <Globe size={16} className="text-text-secondary group-hover:text-text-primary" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Google Account</span>
                 </>
               )}
            </button>
            
            <div className="relative">
              <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                  <button 
                    onClick={renderProps.onClick}
                    disabled={!!socialLoading}
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border/50 bg-canvas/30 hover:bg-canvas/50 transition-all group disabled:opacity-50"
                  >
                     {socialLoading === 'facebook' ? <Loader2 size={16} className="animate-spin" /> : (
                       <>
                        <Share2 size={16} className="text-text-secondary group-hover:text-text-primary" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Facebook Account</span>
                       </>
                     )}
                  </button>
                )}
              />
            </div>
          </div>
        </div>

        <p className="text-center mt-8 font-body text-xs text-text-tertiary">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-emerald hover:underline font-bold">Initiate Membership</Link>
        </p>
      </motion.div>
    </main>
  );
}
