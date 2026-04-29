"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getGlobalActivity, GlobalActivityEvent } from "@/services/analytics";

export const TransmissionFeed = () => {
  const [events, setEvents] = useState<any[]>([]);

  // Simulated fallback events if no real data exists
  const fallbackEvents = [
    { text: "A workspace refined in Tokyo.", time: "Just now", city: "Tokyo" },
    { text: "KX-Series acoustic analysis complete.", time: "2 min ago", city: "Berlin" },
    { text: "The Night Owl profile activated.", time: "5 min ago", city: "New York" },
    { text: "Collection 01 reaching absolute focus.", time: "12 min ago", city: "Seoul" },
    { text: "Grid Riser inventory synchronized.", time: "15 min ago", city: "London" },
  ];

  const fetchActivity = async () => {
    const realEvents = await getGlobalActivity();
    
    if (realEvents.length > 0) {
      const formatted = realEvents.map(e => ({
        text: e.payload?.message || `${e.type.replace(/_/g, ' ')} detected.`,
        time: "Active",
        city: e.payload?.city || "Worldwide"
      }));
      setEvents(formatted.slice(0, 5));
    } else {
      setEvents(fallbackEvents);
    }
  };

  useEffect(() => {
    fetchActivity();
    const interval = setInterval(fetchActivity, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-canvas border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center space-y-16">
          <div className="space-y-4 text-center">
            <div className="flex items-center gap-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald font-bold">
                Transmission // Live
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tighter">
              Global <span className="italic text-text-secondary">Operations.</span>
            </h2>
          </div>

          <div className="w-full max-w-3xl">
            <div className="relative space-y-px">
              <AnimatePresence mode="popLayout">
                {events.map((item, index) => (
                  <motion.div
                    key={`${item.text}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.5, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="flex items-center justify-between py-6 border-b border-border/20 group hover:bg-emerald/[0.02] px-4 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="font-mono text-[10px] text-text-tertiary w-12 opacity-40">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="font-body text-base text-text-secondary group-hover:text-text-primary transition-colors">
                        {item.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-emerald opacity-60">
                        {item.city}
                      </span>
                      <span className="font-mono text-[10px] text-text-tertiary tabular-nums">
                        {item.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Visual Scanline Decor */}
            <div className="mt-12 flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

