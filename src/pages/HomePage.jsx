import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ArrowRight, Trophy, Calendar, BookOpen, Phone } from 'lucide-react';

export function HomePage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const portals = [
    {
      id: 'events',
      title: 'Events Directory',
      subtitle: '67 COMPETITIONS',
      description: 'Esports, Hackathons, Robotics, CAD Modeling, and Creative Challenges across all 11 chapters.',
      actionText: 'Explore Events',
      icon: Trophy,
    },
    {
      id: 'schedule',
      title: 'Schedule',
      subtitle: '3-DAY TIMELINE',
      description: 'Keynotes, hackathon phases, project expos, and championship finals.',
      actionText: 'View Schedule',
      icon: Calendar,
    },
    {
      id: 'about',
      title: 'Heritage',
      subtitle: 'ESTABLISHED 2004',
      description: 'Two decades of collegiate engineering and technical excellence at TCET Mumbai.',
      actionText: 'Read Story',
      icon: BookOpen,
    },
    {
      id: 'contact',
      title: 'Helplines',
      subtitle: 'COORDINATOR DESKS',
      description: 'Direct contacts for student leads, committee heads, and campus registration desks.',
      actionText: 'Get In Touch',
      icon: Phone,
    }
  ];

  return (
    <main className="w-full overflow-x-hidden">
      {/* 1. Hero */}
      <Hero onExploreEvents={() => onNavigate('events')} />

      {/* 2. Portal Grid */}
      <section id="portals" className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-xs uppercase tracking-widest inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
            SECTORS
          </span>
          <h2 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
            Explore the Spectrum
          </h2>
        </div>

        {/* 4 Neo-Brutalist Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {portals.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="neo-card-lg group p-5 sm:p-6 lg:p-7 flex flex-col justify-between cursor-pointer relative overflow-hidden space-y-4 bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="w-9 h-9 bg-black text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                      <Icon className="w-4 h-4 stroke-[2.5px]" />
                    </div>

                    <span className="px-2 py-0.5 bg-black text-white font-neo font-bold text-[10px] sm:text-[11px] tracking-widest uppercase shadow-[1.5px_1.5px_0px_0px_#000]">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="font-neo font-black text-xl sm:text-2xl text-black uppercase tracking-tight leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-black flex items-center justify-between font-neo font-black text-xs uppercase tracking-wider text-black">
                  <span>{item.actionText}</span>
                  <div className="w-7 h-7 bg-black text-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000] group-hover:translate-x-1 group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>
    </main>
  );
}
