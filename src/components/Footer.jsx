import React from 'react';
import { CONTACT_INFO } from '../data/contacts';
import { ArrowUp } from 'lucide-react';

export function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Fest' },
    { id: 'events', label: '67 Events Directory' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'contact', label: 'Contact Desks' },
  ];

  const committees = [
    'CSI', 'ASCE', 'OWASP', 'TRS', 'ACM', 'S4DS', 'IEEE', 'IETE', 'SIGAI', 'IOT / IEI', 'ASME'
  ];

  return (
    <footer className="relative bg-[#FFFDF5] border-t-8 border-black pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Top Brand & Directory Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Brand Box (5 cols) */}
          <div className="md:col-span-5 p-6 sm:p-7 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="cursor-pointer inline-block" onClick={() => onNavigate && onNavigate('home')}>
                <span className="px-3 py-1 bg-black text-white border-2 border-black font-neo font-black text-2xl tracking-wider uppercase inline-block shadow-[2px_2px_0px_0px_#000]">
                  ZEPHYR
                </span>
                <span className="font-neo font-bold text-[10px] block text-black uppercase tracking-widest mt-1.5">
                  SPECTRUM OF INNOVATION
                </span>
              </div>

              <p className="text-xs sm:text-sm text-black/80 font-body font-medium leading-relaxed">
                The flagship annual technical symposium organized by the <strong>TCET Student Development and Welfare Association (TSDW)</strong> at Thakur College of Engineering and Technology, Mumbai.
              </p>
            </div>

            <div className="font-neo font-bold text-[11px] text-black/90 space-y-1 pt-3 border-t-2 border-black">
              <div>Thakur Educational Campus, Kandivali East, Mumbai 400101</div>
              <div>Autonomous • NAAC 'A+' Grade • Affiliated to Mumbai University</div>
            </div>
          </div>

          {/* Quick Navigation Box (3 cols) */}
          <div className="md:col-span-3 p-6 sm:p-7 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] space-y-3">
            <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
              PAGES
            </span>
            <ul className="space-y-2 font-neo">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate && onNavigate(link.id)}
                    className="w-full text-left px-3 py-1.5 bg-white hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all tracking-wider"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Committee Chapters Box (4 cols) */}
          <div className="md:col-span-4 p-6 sm:p-7 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
                11 CHAPTERS
              </span>
              <div className="flex flex-wrap gap-1.5 font-neo">
                {committees.map((c) => (
                  <button
                    key={c}
                    onClick={() => onNavigate && onNavigate('events')}
                    className="px-2.5 py-1 bg-white hover:bg-black hover:text-white text-black font-bold text-[11px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-3 border-t-2 border-black space-y-2">
              <span className="font-neo font-bold text-[10px] uppercase tracking-wider text-black block">
                Connect With TSDW
              </span>
              <div className="flex flex-wrap gap-2 font-neo">
                {CONTACT_INFO.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4 font-neo font-bold text-xs text-black">
          <div className="text-center sm:text-left bg-white border-2 border-black px-3.5 py-2 shadow-[2px_2px_0px_0px_#000]">
            © 2004–2025 Zephyr Techfest & TSDW Council. TCET Mumbai.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="neo-btn-primary px-5 py-2 text-xs flex items-center gap-2"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
