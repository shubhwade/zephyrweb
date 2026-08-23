import React, { useEffect } from 'react';
import { X, Phone, Copy, ArrowRight } from 'lucide-react';

export function EventModal({ event, isOpen, onClose, onRegister, onCopyContact }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFFDF5] border-4 border-black shadow-[10px_10px_0px_0px_#000] overflow-hidden my-auto max-h-[92vh] flex flex-col md:grid md:grid-cols-12 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Col: Event Artwork & Quick Badges (5 cols on Desktop) */}
        <div className="relative md:col-span-5 bg-black border-b-4 md:border-b-0 md:border-r-4 border-black h-48 sm:h-56 md:h-full min-h-[200px] md:min-h-[420px] flex flex-col justify-between p-3 sm:p-4 overflow-hidden">
          <img
            src={event.image || `/event${event.id}.webp`}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-95"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/wordmark/zephyr-full-wordmark.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 md:from-black/90 md:via-black/40 md:to-transparent" />

          {/* Top Tags */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
              {event.tag}
            </span>

            {/* Close Button on Mobile over Image */}
            <button
              onClick={onClose}
              aria-label="Close event details"
              className="md:hidden p-1.5 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

          {/* Bottom Badges */}
          <div className="relative z-10 flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
              {event.category}
            </span>

            {event.isCollab && (
              <span className="px-2.5 py-0.5 bg-white text-black border-2 border-black font-neo font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                Joint Event
              </span>
            )}
          </div>
        </div>

        {/* Right Col: Details, Matrices, Contact & CTAs (7 cols on Desktop) */}
        <div className="md:col-span-7 p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-y-auto bg-[#FFFDF5] space-y-4">
          
          {/* Header Row with Title & Desktop Close Button */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3
                id="event-modal-title"
                className="font-neo font-black text-xl sm:text-2xl lg:text-3xl text-black uppercase tracking-tight leading-tight"
              >
                {event.title}
              </h3>

              <button
                onClick={onClose}
                aria-label="Close event details"
                className="hidden md:flex p-1.5 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors shrink-0 shadow-[2px_2px_0px_0px_#000]"
              >
                <X className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>

            {event.collabNote && (
              <div className="p-2 bg-black/5 border-2 border-black font-neo font-bold text-[11px] text-black">
                ✦ {event.collabNote}
              </div>
            )}
          </div>

          {/* 3 Metrics: Fee, Prize, Mode */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <span className="font-neo font-bold text-[9px] sm:text-[10px] text-black/70 uppercase tracking-wider block">
                Reg Fee
              </span>
              <span className="font-neo font-black text-sm sm:text-base text-black truncate block">
                {event.priceDisplay}
              </span>
            </div>

            <div className="p-2.5 sm:p-3 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <span className="font-neo font-bold text-[9px] sm:text-[10px] text-white/80 uppercase tracking-wider block">
                Prize Pool
              </span>
              <span className="font-neo font-black text-sm sm:text-base text-white truncate block">
                {event.prizeDisplay}
              </span>
            </div>

            <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <span className="font-neo font-bold text-[9px] sm:text-[10px] text-black/70 uppercase tracking-wider block">
                Format
              </span>
              <span className="font-neo font-black text-sm sm:text-base text-black truncate block">
                {event.teamDisplay}
              </span>
            </div>
          </div>

          {/* Overview Description */}
          <div className="space-y-1">
            <span className="font-neo font-bold text-[10px] uppercase tracking-widest text-black/70 block">
              Overview
            </span>
            <p className="font-body text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed line-clamp-4 md:line-clamp-none">
              {event.desc}
            </p>
          </div>

          {/* Coordinator Lead */}
          <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-black border-2 border-black flex items-center justify-center text-white shrink-0">
                <Phone className="w-3.5 h-3.5 stroke-[2.5px]" />
              </div>
              <div>
                <span className="font-neo font-bold text-[9px] uppercase tracking-wider text-black/70 block">
                  Coordinator
                </span>
                <span className="font-neo font-black text-xs text-black">
                  +91 {event.phone_no}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onCopyContact(event.phone_no)}
                className="neo-btn-outline px-2.5 py-1 text-[11px] flex items-center gap-1"
                aria-label="Copy phone number"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>

              <a
                href={`tel:+91${event.phone_no}`}
                className="neo-btn-secondary px-2.5 py-1 text-[11px] flex items-center gap-1"
                aria-label="Call coordinator"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-2 border-t-2 border-black flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="neo-btn-outline px-4 py-2 text-xs"
            >
              Back
            </button>

            <button
              onClick={() => onRegister(event)}
              className="neo-btn-primary px-5 sm:px-6 py-2 text-xs flex items-center gap-2"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
