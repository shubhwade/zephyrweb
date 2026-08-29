import React, { useRef, useState, useEffect } from 'react';

export function VideoBackground({
  src = '/bg-video.mp4',
  poster = '/bg-video-poster.jpg',
  fadeOpacity = 0,
}) {
  const videoRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const play = () => {
      if (!video.paused) return;
      video.play().catch(() => {});
    };
    const retryEvents = ['loadeddata', 'canplay', 'visibilitychange'];
    retryEvents.forEach((eventName) => {
      const target = eventName === 'visibilitychange' ? document : video;
      target.addEventListener(eventName, play);
    });
    window.addEventListener('pageshow', play);
    play();

    return () => {
      retryEvents.forEach((eventName) => {
        const target = eventName === 'visibilitychange' ? document : video;
        target.removeEventListener(eventName, play);
      });
      window.removeEventListener('pageshow', play);
    };
  }, [src]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Background Video Element with Audio Enabled by Default */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setHasLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          hasLoaded ? 'opacity-100 scale-100' : 'opacity-0'
        }`}
        style={{
          filter: 'contrast(1.05) brightness(1.0)',
        }}
      />

      {/* Atmospheric Parchment Fade Overlay: Allows ambient video to remain visible across all pages */}
      <div
        className="absolute inset-0 bg-[#FFFDF5] pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: Math.min(0.68, fadeOpacity * 0.68),
        }}
      />
    </div>
  );
}
