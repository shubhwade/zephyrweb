import React from 'react';
import { BookOpen, Layers, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="space-y-5 sm:space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-4 border-black pb-4 sm:pb-5">
        <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
          About Zephyr
        </h1>
      </div>

      {/* 3-Column Narrative (Medium Sizing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Column 1: The Legacy */}
        <div className="neo-card p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-5 bg-white">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                <BookOpen className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>

              <span className="px-2 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
                CHAPTER 01
              </span>
            </div>

            <h3 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight leading-snug">
              Estd. 2004 at TCET Mumbai
            </h3>

            <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed font-body">
              Since 2004, <strong>Zephyr</strong> has stood as the definitive technical symposium for engineers and researchers at Thakur College of Engineering & Technology.
            </p>
          </div>

          <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-neo font-bold text-black uppercase tracking-wider">
            <span>21ST EDITION</span>
            <span className="font-black bg-black text-white px-2 py-0.5">2004 — 2025</span>
          </div>
        </div>

        {/* Column 2: The Theme */}
        <div className="neo-card p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-5 bg-white">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                <Sparkles className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>

              <span className="px-2 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
                CHAPTER 02
              </span>
            </div>

            <h3 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight leading-snug">
              Spectrum of Innovation
            </h3>

            <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed font-body">
              From the Eye of Horus to modern neural networks, Zephyr bridges classical mythology with cutting-edge engineering and artificial intelligence.
            </p>
          </div>

          <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-neo font-bold text-black uppercase tracking-wider">
            <span>67 EVENTS</span>
            <span className="font-black bg-black text-white px-2 py-0.5">11 COMMITTEES</span>
          </div>
        </div>

        {/* Column 3: TSDW Student Council */}
        <div className="neo-card p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-5 bg-white">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                <Layers className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>

              <span className="px-2 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
                CHAPTER 03
              </span>
            </div>

            <h3 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight leading-snug">
              TSDW Student Council
            </h3>

            <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed font-body">
              The TCET Student Development and Welfare Association (TSDW) serves as the central student leadership council, driving academic development and technical leadership.
            </p>
          </div>

          <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-neo font-bold text-black uppercase tracking-wider">
            <span>MUMBAI UNIV</span>
            <span className="font-black bg-black text-white px-2 py-0.5">AUTONOMOUS</span>
          </div>
        </div>

      </div>

      {/* Statistical Highlights Ribbon (Medium Sizing) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
        <div className="p-4 sm:p-5 bg-black text-white border-3 border-black shadow-[4px_4px_0px_0px_#000] space-y-0.5">
          <div className="font-neo font-black text-2xl sm:text-3xl text-white">
            67+
          </div>
          <div className="font-neo font-bold text-[11px] sm:text-xs text-white/80 uppercase tracking-wider">
            Verified Events
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] space-y-0.5">
          <div className="font-neo font-black text-2xl sm:text-3xl text-black">
            11+
          </div>
          <div className="font-neo font-bold text-[11px] sm:text-xs text-black uppercase tracking-wider">
            Chapters
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-black text-white border-3 border-black shadow-[4px_4px_0px_0px_#000] space-y-0.5">
          <div className="font-neo font-black text-2xl sm:text-3xl text-white">
            ₹5L+
          </div>
          <div className="font-neo font-bold text-[11px] sm:text-xs text-white/80 uppercase tracking-wider">
            Prize Pool
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] space-y-0.5">
          <div className="font-neo font-black text-2xl sm:text-3xl text-black">
            21st
          </div>
          <div className="font-neo font-bold text-[11px] sm:text-xs text-black uppercase tracking-wider">
            Annual Edition
          </div>
        </div>
      </div>

    </section>
  );
}
