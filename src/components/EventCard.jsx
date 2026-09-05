import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function EventCard({ event, onSelect }) {
  const imageSrc = event.image || `/event${event.numericId || event.id || 1}.webp`;
  const priceDisplay = event.priceDisplay || 'Register';
  const prizeDisplay = event.prizeDisplay || 'Open';

  return (
    <div
      onClick={() => onSelect(event)}
      className="neo-card group flex flex-col justify-between cursor-pointer relative overflow-hidden p-0 rounded-none bg-white"
    >
      {/* 1. Permanent Full-Color Event Thumbnail with Badges */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden border-b-3 border-black bg-black shrink-0">
        <img
          src={imageSrc}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        
        {/* Top Floating Monochrome Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap z-10">
          <span className="px-2.5 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
            {event.tag}
          </span>
          {event.isCollab && (
            <span className="px-2 py-0.5 bg-black text-white border-2 border-black font-neo font-bold text-[9px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              Joint
            </span>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 bg-black text-white border-2 border-black font-neo font-bold text-[10px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
            {event.category}
          </span>
        </div>
      </div>

      {/* 2. Main Event Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="font-neo font-black text-lg sm:text-xl text-black leading-tight tracking-tight uppercase">
            {event.title}
          </h3>

          {/* Description snippet */}
          <p className="font-body text-xs text-black/80 font-medium line-clamp-2 leading-snug">
            {event.desc}
          </p>
        </div>

        {/* Bottom Meta & Action Row */}
        <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 bg-white border-2 border-black font-neo font-bold text-xs text-black shadow-[1.5px_1.5px_0px_0px_#000]">
              {priceDisplay}
            </span>
            <span className="px-2 py-0.5 bg-black border-2 border-black font-neo font-bold text-xs text-white shadow-[1.5px_1.5px_0px_0px_#000]">
              {prizeDisplay}
            </span>
          </div>

          <a
            href={event.parkAddaUrl || 'https://www.parkadda.com/events'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-2 group/reg hover:opacity-90 transition-opacity"
            aria-label={`Register for ${event.title} on ParkAdda`}
          >
            <span className="font-neo font-black text-[10px] uppercase tracking-[0.18em] text-black group-hover/reg:underline">
              Register
            </span>
            <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
