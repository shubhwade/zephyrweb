import React from 'react';
import { InteractiveWordmark } from './InteractiveWordmark';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[82vh] sm:min-h-screen flex flex-col justify-between items-center pt-20 sm:pt-28 pb-6 sm:pb-12 px-3 sm:px-6 lg:px-8 bg-transparent border-b border-white/10 sm:border-[#E2DCD2]/20 overflow-hidden select-none"
    >
      {/* Spacer to visually center the wordmark */}
      <div className="w-full h-4 sm:h-12" />

      {/* Central Wordmark Artwork & Year - Pure Zephyr 2026 */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center my-auto -translate-y-4 sm:-translate-y-24 space-y-2 sm:space-y-4">
        <InteractiveWordmark />

        {/* Year 2026 in Crisp Deep Charcoal Typography */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 animate-fade-in select-none">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#1C1C1C]/60" />
          <span className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-[0.35em] sm:tracking-[0.45em] text-[#1C1C1C] drop-shadow-[0_1px_3px_rgba(250,247,242,0.9)] pl-[0.35em] sm:pl-[0.45em]">
            2026
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#1C1C1C]/60" />
        </div>

        <div className="w-full flex justify-center px-2 sm:px-4 animate-fade-in -mt-1 sm:-mt-2">
          <div className="relative w-full max-w-[620px] sm:max-w-[760px]">
            <img
              src="/wordmark/forge-of-worlds-transparent.webp"
              alt=""
              className="block w-full h-auto max-h-[120px] sm:max-h-[190px] md:max-h-[220px] object-contain opacity-100 select-none pointer-events-none"
            />
          </div>
        </div>

      </div>

      {/* Minimal Scroll Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2 sm:pt-3 text-center">
        <a
          href="#portals"
          aria-label="Scroll down to explore"
          className="text-white/80 hover:text-[#D4B685] transition-colors focus:outline-none p-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          <ChevronDown className="w-5 h-5 text-[#D4B685] animate-bounce" />
        </a>
      </div>
    </section>
  );
}
