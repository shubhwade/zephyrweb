import React, { useEffect } from 'react';
import { ArrowLeft, Handshake, Sparkles } from 'lucide-react';

const topSponsors = [
  { name: 'indian_bank', ext: 'png', displayName: 'Indian Bank', background: 'bg-[#f6f4ef]', size: 'lg' },
  { name: 'allahabad_bank', ext: 'svg', displayName: 'Allahabad Bank', background: 'bg-[#f4d437]', size: 'md' },
  { name: 'lenovo', ext: 'svg', displayName: 'Lenovo', background: 'bg-[#e21b22]', size: 'lg', customLogo: true },
  { name: 'jamboree', ext: 'png', displayName: 'Jamboree', background: 'bg-[#f3f3f1]', size: 'md' },
  { name: 'cadd_centre', ext: 'png', displayName: 'CADD Centre', background: 'bg-[#f5f0e8]', size: 'lg' },
  { name: 'pizza_hut', ext: 'svg', displayName: 'Pizza Hut', background: 'bg-[#f7f7f5]', size: 'md' },
  { name: 'esmeraa', ext: 'svg', displayName: 'Esmeraa', background: 'bg-[#f9f3eb]', size: 'md' },
  { name: 'decathlon', ext: 'svg', displayName: 'Decathlon', background: 'bg-[#1d63d1]', size: 'md' },
  { name: 'timezone', ext: 'svg', displayName: 'Timezone', background: 'bg-[#f4f0ec]', size: 'md', imgClassName: 'translate-y-2' },
  { name: 'chings', ext: 'png', displayName: 'Ching\'s Secret', background: 'bg-[#f7f7f7]', size: 'md' }
];

const sizeClassMap = {
  sm: 'min-h-[96px] md:min-h-[112px]',
  md: 'min-h-[135px] md:min-h-[152px]',
  lg: 'min-h-[155px] md:min-h-[180px]'
};

export function SponsorsPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5 sm:space-y-7 animate-fade-in">
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="neo-btn-outline px-3.5 py-1.5 inline-flex items-center gap-2 text-xs font-neo font-bold uppercase shadow-[2px_2px_0px_0px_#000]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3px]" />
          <span>Back to Overview</span>
        </button>
      </div>

      <div className="rounded-[28px] border-[3px] border-black bg-[#080808] p-4 sm:p-6 shadow-[8px_8px_0px_0px_#000] ring-1 ring-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-[3px] border-white/10 pb-4 sm:pb-5 mb-5">
          <div className="space-y-1">
            <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-5xl text-white tracking-tight uppercase flex items-center gap-2.5">
              <Handshake className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5px] text-[#f4d35e]" />
              <span>Our Top Sponsors</span>
            </h1>
            <p className="font-body text-xs sm:text-sm text-white/65 font-medium">
              Our cleanest and strongest brand partners who support Zephyr with pride.
            </p>
          </div>

          <span className="px-3 py-1 bg-[#f4d35e] text-black font-neo font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] self-start sm:self-auto flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{topSponsors.length} Top Sponsors</span>
          </span>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {topSponsors.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className={`mb-3 sm:mb-4 break-inside-avoid rounded-[18px] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] overflow-hidden ${logo.background} ${sizeClassMap[logo.size]}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 gap-2">
                {logo.customLogo ? (
                  <div className="flex w-full items-center justify-center rounded-[12px] bg-[#e21b22] text-[#f7f7f7] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.06)] px-1 py-2 sm:py-3">
                    <div className="flex flex-col items-center justify-center text-center leading-none">
                      <span className="font-black tracking-[-0.08em] text-[2.35rem] sm:text-[3.4rem] lg:text-[3.8rem] font-neo">
                        Lenovo
                      </span>
                      <span className="mt-1 font-neo text-[10px] sm:text-[11px] font-black tracking-[0.14em] text-black/90">
                        LENOVO
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={`/sponsors/${logo.name}.${logo.ext}`}
                      alt={logo.displayName}
                      className={`max-w-full max-h-[68px] sm:max-h-[84px] object-contain select-none ${logo.imgClassName || ''}`}
                      loading="lazy"
                    />
                    <span className="font-neo font-black text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-black/80 text-center">
                      {logo.displayName}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
