import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VideoBackground } from './components/VideoBackground';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('about')) return 'about';
    if (path.includes('event')) return 'events';
    if (path.includes('contact')) return 'contact';
    if (path.includes('sponsor')) return 'sponsors';
    return 'home';
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Scroll Progress & Smooth Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrollY(currentScrollY);
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((currentScrollY / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize browser history & back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('about')) setCurrentPage('about');
      else if (path.includes('event')) setCurrentPage('events');
      else if (path.includes('contact')) setCurrentPage('contact');
      else if (path.includes('sponsor')) setCurrentPage('sponsors');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
    let targetPath = '/';
    if (pageId === 'about') targetPath = '/about';
    if (pageId === 'events') targetPath = '/events';
    if (pageId === 'contact') targetPath = '/contact';
    if (pageId === 'sponsors') targetPath = '/sponsors';

    window.history.pushState({}, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth continuous hero fade ratio (0.0 at top, reaching 1.0 slowly as user scrolls towards portals)
  const heroFadeThreshold = 550;
  const fadeOpacity = currentPage === 'home'
    ? Math.min(1, Math.max(0, scrollY / heroFadeThreshold))
    : 1;

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black flex flex-col font-body selection:bg-black selection:text-white relative overflow-x-hidden">
      {/* 0. Ambient Video Background (Full contrast on top Hero, soft parchment fade upon scroll and on all sub-pages) */}
      <VideoBackground fadeOpacity={fadeOpacity} />

      {/* 1. Accent Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-black border-b border-black z-50 origin-left transition-all"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Header Navigation */}
      <Navbar currentPage={currentPage} onNavigate={navigateToPage} fadeOpacity={fadeOpacity} />

      {/* 3. Dynamic Page Rendering */}
      <div className="flex-grow relative z-10">
        {currentPage === 'home' && (
          <HomePage onNavigate={navigateToPage} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateToPage} />
        )}

        {currentPage === 'events' && (
          <EventsPage onShowToast={showToast} onNavigate={navigateToPage} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onShowToast={showToast} onNavigate={navigateToPage} />
        )}

        {currentPage === 'sponsors' && (
          <SponsorsPage onNavigate={navigateToPage} />
        )}
      </div>

      {/* 4. Footer */}
      <Footer onNavigate={navigateToPage} />

      {/* 5. Feedback Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
