import React, { useRef, useState, useEffect } from 'react';

function configureDecorativeVideo(video) {
  if (!video) return;

  video.autoplay = true;
  video.defaultMuted = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.controlsList = 'nodownload nofullscreen noplaybackrate';
  video.disablePictureInPicture = true;
  video.preload = 'auto';

  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.removeAttribute('controls');
}

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

    configureDecorativeVideo(video);

    let playAttemptInFlight = false;
    let playRetryTimer = null;

    const canAttemptPlayback = () => !document.hidden && video.isConnected && video.readyState >= 2;

    const attemptPlayback = () => {
      if (playAttemptInFlight || !canAttemptPlayback() || !video.paused) return;

      playAttemptInFlight = true;
      video.play()
        .then(() => {
          playAttemptInFlight = false;
          if (playRetryTimer) {
            clearTimeout(playRetryTimer);
            playRetryTimer = null;
          }
        })
        .catch(() => {
          playAttemptInFlight = false;
          if (playRetryTimer) clearTimeout(playRetryTimer);
          playRetryTimer = window.setTimeout(() => {
            if (!document.hidden) {
              configureDecorativeVideo(video);
              if (!video.paused) return;
              attemptPlayback();
            }
          }, 250);
        });
    };

    const onMediaReady = () => {
      configureDecorativeVideo(video);
      if (!document.hidden) {
        attemptPlayback();
      }
    };

    const mediaEvents = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'];
    mediaEvents.forEach((eventName) => video.addEventListener(eventName, onMediaReady));
    document.addEventListener('visibilitychange', onMediaReady);
    window.addEventListener('pageshow', onMediaReady);

    configureDecorativeVideo(video);
    onMediaReady();

    return () => {
      mediaEvents.forEach((eventName) => video.removeEventListener(eventName, onMediaReady));
      document.removeEventListener('visibilitychange', onMediaReady);
      window.removeEventListener('pageshow', onMediaReady);
      if (playRetryTimer) clearTimeout(playRetryTimer);
    };
  }, [src]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        onLoadedData={() => setHasLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          hasLoaded ? 'opacity-100 scale-100' : 'opacity-0'
        }`}
        style={{
          filter: 'contrast(1.05) brightness(1.0)',
        }}
      />

      <div
        className="absolute inset-0 bg-[#FFFDF5] pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: Math.min(0.68, fadeOpacity * 0.68),
        }}
      />
    </div>
  );
}
