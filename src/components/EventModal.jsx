import React, { useState, useEffect, useMemo } from 'react';
import { X, Phone, Copy, ArrowRight, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { getParkAddaEventUrl, getParkAddaEventId, getParkAddaPackageCode, buildParkAddaUrl } from '../data/parkadda';

export function EventModal({ event, isOpen, onClose, onRegister, onCopyContact }) {
  const [selectedOptionKey, setSelectedOptionKey] = useState(null);

  useEffect(() => {
    if (event?.options && event.options.length > 0) {
      setSelectedOptionKey(event.options[0].key);
    } else {
      setSelectedOptionKey(null);
    }
  }, [event]);

  const parkAddaEventId = useMemo(() => {
    if (!event) return null;
    return event.parkAddaEventId || getParkAddaEventId(event);
  }, [event]);

  const selectedOption = useMemo(() => {
    if (!event?.options || event.options.length === 0) return null;
    return event.options.find((opt) => opt.key === selectedOptionKey) || event.options[0];
  }, [event, selectedOptionKey]);

  const activePackageCode = useMemo(() => {
    if (selectedOption?.packageCode) return selectedOption.packageCode;
    if (!event) return null;
    return event.parkAddaPackageCode || getParkAddaPackageCode(event);
  }, [event, selectedOption]);

  const activeParkAddaUrl = useMemo(() => {
    if (activePackageCode && parkAddaEventId) {
      return buildParkAddaUrl(parkAddaEventId, activePackageCode);
    }
    if (!event) return null;
    return event.parkAddaUrl || getParkAddaEventUrl(event);
  }, [event, activePackageCode, parkAddaEventId]);

  const activePriceDisplay = useMemo(() => {
    if (selectedOption?.priceDisplay) {
      return `${selectedOption.priceDisplay} (${selectedOption.label})`;
    }
    return event?.priceDisplay || 'Register';
  }, [event, selectedOption]);

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

  const handleRegisterClick = () => {
    if (onRegister) {
      onRegister({
        ...event,
        selectedOption,
        parkAddaPackageCode: activePackageCode,
        parkAddaUrl: activeParkAddaUrl,
      });
    }
  };

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
        {/* Left Side: Event Image & Badges */}
        <div className="relative md:col-span-5 bg-black border-b-4 md:border-b-0 md:border-r-4 border-black h-48 sm:h-56 md:h-full min-h-[200px] md:min-h-[420px] flex flex-col justify-between p-3 sm:p-4 overflow-hidden">
          <img
            src={event.image || `/event${event.numericId || event.id || 1}.webp`}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-95"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/wordmark/zephyr-full-wordmark.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 md:from-black/90 md:via-black/40 md:to-transparent" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
              {event.tag}
            </span>
            <button
              onClick={onClose}
              aria-label="Close event details"
              className="md:hidden p-1.5 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

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

        {/* Right Side: Details & ParkAdda Registration Handoff */}
        <div className="md:col-span-7 p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-y-auto bg-[#FFFDF5] space-y-4">
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
              <div className="flex items-center gap-2 p-2 bg-black/5 border-2 border-black font-neo font-bold text-[11px] text-black">
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5px] shrink-0" />
                <span>{event.collabNote}</span>
              </div>
            )}
          </div>

          {/* Interactive Tier / Team Option Selector */}
          {event.options && event.options.length > 1 && (
            <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-neo font-bold text-[10px] uppercase tracking-wider text-black">
                  Select Entry Tier / Team Option:
                </span>
                <span className="font-neo font-black text-xs text-black">
                  {selectedOption ? `${selectedOption.label} — ${selectedOption.priceDisplay}` : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {event.options.map((opt) => {
                  const isSelected = selectedOption?.key === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedOptionKey(opt.key)}
                      className={`px-3 py-2 text-xs font-neo font-bold uppercase tracking-wider border-2 border-black transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000] -translate-y-0.5'
                          : 'bg-white text-black hover:bg-black/5'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-neo font-black">{opt.priceDisplay}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Metrics: Fee, Prize Pool, Format */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <span className="font-neo font-bold text-[9px] sm:text-[10px] text-black/70 uppercase tracking-wider block">
                Reg Fee
              </span>
              <span className="font-neo font-black text-xs sm:text-sm text-black truncate block" title={activePriceDisplay}>
                {activePriceDisplay}
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

          {/* Event Overview */}
          <div className="space-y-1">
            <span className="font-neo font-bold text-[10px] uppercase tracking-widest text-black/70 block">
              Overview
            </span>
            <p className="font-body text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed line-clamp-4 md:line-clamp-none">
              {event.desc}
            </p>
          </div>

          {/* Coordinator Direct Contact */}
          {event.phone_no && (
            <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-black border-2 border-black flex items-center justify-center text-white shrink-0">
                  <Phone className="w-3.5 h-3.5 stroke-[2.5px]" />
                </div>
                <div>
                  <span className="font-neo font-bold text-[9px] uppercase tracking-wider text-black/70 block">
                    Coordinator Desk
                  </span>
                  <span className="font-neo font-black text-xs text-black">
                    +91 {event.phone_no}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onCopyContact?.(event.phone_no)}
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
          )}

          {/* Official ParkAdda Portal Destination Notice */}
          <div className="border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_#000] space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-black stroke-[2.5px]" />
                <span className="font-neo font-bold text-[10px] uppercase tracking-wider text-black">
                  Official Registration Partner
                </span>
              </div>
              <span className="px-2 py-0.5 bg-black text-white font-neo font-bold text-[10px] uppercase tracking-widest">
                ParkAdda • {activePackageCode ? `${parkAddaEventId || 'ZEPHYR26'} (${activePackageCode})` : (parkAddaEventId || 'ZEPHYR26')}
              </span>
            </div>
            <p className="font-body text-[11px] text-black/75 leading-relaxed">
              Clicking register automatically adds <strong>{event.title}</strong>{selectedOption ? ` [${selectedOption.label}]` : ''} to your ParkAdda cart for instant checkout.
            </p>
          </div>

          {/* Fail-safe Notice if ParkAdda mapping is invalid */}
          {!activeParkAddaUrl && (
            <div className="flex items-start gap-2 border-2 border-amber-600 bg-amber-50 p-2.5 text-xs text-amber-900 font-medium">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-700" />
              <span>
                Registration for this event is currently unavailable on the portal. Please contact the coordinator desk above for assistance.
              </span>
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="pt-2 border-t-2 border-black flex items-center justify-between gap-3">
            <button onClick={onClose} className="neo-btn-outline px-4 py-2 text-xs">
              Back
            </button>

            {activeParkAddaUrl ? (
              <a
                href={activeParkAddaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRegisterClick}
                className="neo-btn-primary px-5 sm:px-6 py-2 text-xs flex items-center gap-2 group"
                aria-label={`Register now for ${event.title}`}
              >
                <span>Register Now{selectedOption ? ` (${selectedOption.label})` : ''}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3px] group-hover:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <button
                disabled
                className="neo-btn-primary px-5 sm:px-6 py-2 text-xs flex items-center gap-2 opacity-60 cursor-not-allowed"
              >
                <span>Registration Unavailable</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
