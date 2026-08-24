import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar({ currentPage = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  // Transparent only on Hero section before scroll; frosted glass after scroll & on other pages
  const isHeroTransparent = currentPage === 'home' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 pointer-events-auto ${
        isHeroTransparent
          ? 'bg-transparent pt-3 sm:pt-4 pb-2'
          : 'bg-[#FFFDF5] border-b-4 border-black py-2.5 shadow-[0_4px_0px_0px_#000]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center relative pointer-events-auto gap-3">
          {/* Centered Desktop Navigation Links */}
          <nav className="hidden md:flex items-center justify-center gap-2 lg:gap-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-neo text-xs uppercase tracking-wider transition-all duration-100 py-1.5 px-3.5 ${
                    isActive
                      ? 'bg-black text-white border-2 border-black font-black shadow-[2px_2px_0px_0px_#000] -translate-y-0.5'
                      : isHeroTransparent
                        ? 'text-black font-bold hover:bg-black hover:text-white border-2 border-transparent hover:border-black bg-white/70 backdrop-blur-sm'
                        : 'text-black font-bold hover:bg-black hover:text-white border-2 border-transparent hover:border-black'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[3px]" /> : <Menu className="w-5 h-5 stroke-[3px]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF5] border-b-4 border-black px-4 pt-3 pb-5 space-y-2 shadow-[0_4px_0px_0px_#000] animate-fade-in pointer-events-auto mt-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full font-neo text-xs uppercase tracking-wider py-2 px-3 text-left border-2 border-black transition-all ${
                    isActive
                      ? 'bg-black text-white font-black shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-white text-black font-bold hover:bg-black hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
