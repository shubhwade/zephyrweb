import React, { useEffect } from 'react';
import { BookOpen, Sparkles, Layers, ArrowRight, ArrowLeft } from 'lucide-react';

export function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-7 animate-fade-in">
      
      {/* Back to Homepage */}
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="neo-btn-outline px-3.5 py-1.5 inline-flex items-center gap-2 text-xs font-neo font-bold uppercase shadow-[2px_2px_0px_0px_#000]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3px]" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-4 border-black pb-4 sm:pb-5">
        <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
          The Zephyr Story
        </h1>
      </div>

      {/* 3-Part Neo-Brutalist Chapter Grid (Medium Balanced Sizing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Chapter 1: Heritage */}
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

            <h2 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight leading-snug">
              Two Decades of Excellence
            </h2>

            <p className="font-body text-xs sm:text-sm text-black/80 font-normal leading-relaxed">
              Founded in 2004, Zephyr has grown into a premier technical gathering, uniting thousands of student researchers, developers, and competitors across India.
            </p>
          </div>

          <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-neo font-bold text-black uppercase tracking-wider">
            <span>PAST EDITION</span>
            <span className="font-black bg-black text-white px-2 py-0.5">21ST • 2025</span>
          </div>
        </div>

        {/* Chapter 2: Theme */}
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

            <h2 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight leading-snug">
              Spectrum of Innovation
            </h2>

            <p className="font-body text-xs sm:text-sm text-black/80 font-normal leading-relaxed">
              The 2025 theme honors the journey from ancient geometry and celestial navigation to modern neural architectures, robotics, and cyber defense.
            </p>
          </div>

          <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-neo font-bold text-black uppercase tracking-wider">
            <span>SCOPE</span>
            <span className="font-black bg-black text-white px-2 py-0.5">67 EVENTS</span>
          </div>
        </div>

        {/* Chapter 3: Council */}
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

            <h2 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight leading-snug">
              TSDW Student Council
            </h2>

            <p className="font-body text-xs sm:text-sm text-black/80 font-normal leading-relaxed">
              The TCET Student Development and Welfare Association (TSDW) coordinates all student-led technical bodies under the University of Mumbai guidelines.
            </p>
          </div>

          <div className="pt-3.5 border-t-2 border-black flex items-center justify-between text-xs font-neo font-bold text-black uppercase tracking-wider">
            <span>COUNCIL</span>
            <span className="font-black bg-black text-white px-2 py-0.5">TSDW TCET</span>
          </div>
        </div>

      </div>

      {/* Numerical Stats Cards (Medium Sizing) */}
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
            Student Chapters
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

      {/* Action CTA */}
      <div className="text-center pt-2 sm:pt-3">
        <button
          onClick={() => onNavigate('events')}
          className="neo-btn-primary px-6 py-2.5 text-xs inline-flex items-center gap-2"
        >
          <span>Explore 67 Verified Events</span>
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>

    </div>
  );
}
