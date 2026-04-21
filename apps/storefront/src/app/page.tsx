import { NexusEvent } from '@nexusai/types';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-nexus-primary">NexusAI Storefront</h1>
        <p className="mt-4 text-slate-400">Behavioral Commerce Intelligence - Welcome to the future of personalization.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="p-8 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-nexus-secondary">Real-time Analytics</h2>
          <p className="text-slate-400">Capturing user behavior events to build predictive personas.</p>
        </div>
        <div className="p-8 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-nexus-accent">AI Personalization</h2>
          <p className="text-slate-400">Dynamic UI adjustments based on intent and purchase history.</p>
        </div>
      </div>
    </main>
  );
}
