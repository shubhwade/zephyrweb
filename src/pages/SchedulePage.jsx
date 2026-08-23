import React, { useEffect } from 'react';
import { ScheduleSection } from '../components/ScheduleSection';
import { ArrowLeft } from 'lucide-react';

export function SchedulePage({ onNavigate, onShowToast }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5 animate-fade-in">
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="neo-btn-outline px-3.5 py-1.5 inline-flex items-center gap-2 text-xs font-neo font-bold uppercase shadow-[2px_2px_0px_0px_#000]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3px]" />
          <span>Back to Overview</span>
        </button>
      </div>

      <ScheduleSection onShowToast={onShowToast} onNavigate={onNavigate} />
    </div>
  );
}
