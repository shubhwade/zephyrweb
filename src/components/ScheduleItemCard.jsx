import { Clock, MapPin, ArrowRight, AlertCircle, Award } from 'lucide-react';

export function ScheduleItemCard({
  item,
  index,
  onOpenEventDetails,
  onShowToast
}) {
  const isLive = item.statusLive === 'live';
  const isStartingSoon = item.statusLive === 'starting_soon';
  const imageSrc = item.masterEvent?.image || (item.numericId ? `/event${item.numericId}.webp` : '/event1.webp');

  const handleActionClick = () => {
    if (item.masterEvent) {
      onOpenEventDetails(item.masterEvent);
    } else if (onShowToast) {
      onShowToast(`${item.title} — ${item.action?.label || 'Open Access'}. Venue: ${item.venue}`);
    }
  };

  return (
    <article
      aria-label={`${item.title} at ${item.displayTime}`}
      className="neo-card p-4 sm:p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-5 group relative rounded-none bg-white"
    >
      {/* Live / Status Indicator Pill */}
      {isLive && (
        <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-1/2 px-3 py-1 bg-black text-white font-neo font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] -rotate-1 z-10">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Live Now</span>
        </div>
      )}

      {isStartingSoon && (
        <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-1/2 px-3 py-1 bg-white text-black font-neo font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] rotate-1 z-10">
          <span className="w-2 h-2 rounded-full bg-black" />
          <span>Starting Soon</span>
        </div>
      )}

      {/* Left & Center Information Grid */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 flex-1">
        
        {/* Index Serial & Time Block */}
        <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 shrink-0 sm:w-36 border-b-2 sm:border-b-0 sm:border-r-2 border-black pb-2 sm:pb-0 sm:pr-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-black border-2 border-black font-neo font-black text-xs text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-neo font-bold text-xs text-black bg-white border-2 border-black px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_#000]">
              {item.startTime}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-body font-medium text-xs text-black/75">
            <Clock className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
            <span>{item.displayTime}</span>
          </div>
        </div>

        {/* Event Thumbnail Image */}
        <div
          onClick={handleActionClick}
          className="w-full sm:w-28 sm:h-24 md:w-32 md:h-24 overflow-hidden border-2 border-black bg-black shrink-0 shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <img
            src={imageSrc}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content Area */}
        <div className="space-y-2 flex-1">
          
          {/* Metadata Row: Committee Badges + Category + Notes */}
          <div className="flex flex-wrap items-center gap-1.5">
            {item.committees.map((com) => (
              <span
                key={com.id || com.code}
                className="font-neo font-bold text-[10px] px-2 py-0.5 bg-black text-white border-2 border-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]"
              >
                {com.shortName || com.name}
              </span>
            ))}

            <span className="font-neo font-bold text-[10px] px-2 py-0.5 bg-white text-black border-2 border-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              {item.category}
            </span>

            {/* Note Badge */}
            {item.note && (
              <span className="inline-flex items-center gap-1 font-neo font-bold text-[10px] px-2 py-0.5 bg-white text-black border-2 border-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
                <AlertCircle className="w-3 h-3 text-black stroke-[2.5px]" />
                <span>{item.note}</span>
              </span>
            )}
          </div>

          {/* Event Title */}
          <h3
            onClick={handleActionClick}
            className="font-neo font-black text-lg sm:text-xl text-black cursor-pointer leading-tight tracking-tight uppercase"
          >
            {item.title}
          </h3>

          {/* Description Snippet if available */}
          {item.description && (
            <p className="font-body text-xs text-black/80 font-medium leading-relaxed line-clamp-2 max-w-3xl">
              {item.description}
            </p>
          )}

          {/* Venue & Prize Highlights */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
            <span className="flex items-center gap-1 text-xs font-neo font-bold bg-white border-2 border-black px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_#000]">
              <MapPin className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
              <span className={item.venueConfirmed ? "text-black" : "italic text-black/80"}>
                {item.venue}
              </span>
            </span>

            {item.prizePool && item.prizePool !== 'Not Applicable' && (
              <span className="flex items-center gap-1 text-xs font-neo font-bold bg-black border-2 border-black px-2 py-0.5 text-white shadow-[1.5px_1.5px_0px_0px_#000]">
                <Award className="w-3.5 h-3.5 shrink-0 stroke-[2.5px]" />
                <span>Prize: {item.prizePool}</span>
              </span>
            )}

            {item.price && (
              <span className="font-neo font-bold text-xs px-2 py-0.5 bg-white border-2 border-black text-black shadow-[1.5px_1.5px_0px_0px_#000]">
                Fee: ₹{item.price}
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Right Action CTA Button */}
      <div className="shrink-0 pt-2 lg:pt-0 self-stretch sm:self-end lg:self-center">
        <button
          onClick={handleActionClick}
          aria-label={`${item.action?.label || 'View details for'} ${item.title}`}
          className="neo-btn-primary w-full sm:w-auto px-4 py-2 text-xs flex items-center justify-center gap-1.5 focus-visible:outline-none"
        >
          <span>{item.action?.label || 'Event Details'}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
        </button>
      </div>

    </article>
  );
}
