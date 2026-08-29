import React, { useRef, useEffect, useState } from 'react';

const LETTERS_CONFIG = [
  {
    id: 'Z',
    label: 'SOL',
    webm: '/wordmark/letter-z.webm',
    mp4: '/wordmark/letter-z.mp4',
    poster: '/wordmark/letter-z-trans.png',
    widthPct: 18.994,
    aspect: '340/480',
  },
  {
    id: 'E',
    label: 'HORUS',
    webm: '/wordmark/letter-e.webm',
    mp4: '/wordmark/letter-e.mp4',
    poster: '/wordmark/letter-e-trans.png',
    widthPct: 14.804,
    aspect: '265/480',
  },
  {
    id: 'P',
    label: 'AEGEAN',
    webm: '/wordmark/letter-p.webm',
    mp4: '/wordmark/letter-p.mp4',
    poster: '/wordmark/letter-p-trans.png',
    widthPct: 16.480,
    aspect: '295/480',
  },
  {
    id: 'H',
    label: 'FORGE',
    webm: '/wordmark/letter-h.webm',
    mp4: '/wordmark/letter-h.mp4',
    poster: '/wordmark/letter-h-trans.png',
    widthPct: 15.922,
    aspect: '285/480',
  },
  {
    id: 'Y',
    label: 'ANUBIS',
    webm: '/wordmark/letter-y.webm',
    mp4: '/wordmark/letter-y.mp4',
    poster: '/wordmark/letter-y-trans.png',
    widthPct: 16.480,
    aspect: '295/480',
  },
  {
    id: 'R',
    label: 'PHOENIX',
    webm: '/wordmark/letter-r.webm',
    mp4: '/wordmark/letter-r.mp4',
    poster: '/wordmark/letter-r-trans.png',
    widthPct: 17.320,
    aspect: '310/480',
  },
];

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

export function InteractiveWordmark() {
  const videoRefs = useRef({});
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 640px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');
    const handleChange = (event) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const videos = Object.values(videoRefs.current).filter(Boolean);

    const attemptPlayback = (video) => {
      if (!video || document.hidden) return;
      configureDecorativeVideo(video);
      if (video.paused) {
        video.play().catch(() => {
          const retry = () => {
            if (!document.hidden) {
              configureDecorativeVideo(video);
              if (video.paused) {
                video.play().catch(() => {});
              }
            }
          };
          window.setTimeout(retry, 250);
        });
      }
    };

    const onReady = () => {
      videos.forEach((video) => attemptPlayback(video));
    };

    const onVisibility = () => {
      if (!document.hidden) {
        videos.forEach((video) => attemptPlayback(video));
      }
    };

    videos.forEach((video) => {
      configureDecorativeVideo(video);
      ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach((eventName) => {
        video.addEventListener(eventName, onReady);
      });
    });

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onReady);
    onReady();

    return () => {
      videos.forEach((video) => {
        ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach((eventName) => {
          video.removeEventListener(eventName, onReady);
        });
      });
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', onReady);
    };
  }, [isDesktop]);

  const renderLetterVideo = (letter) => (
    <div
      key={letter.id}
      className={isDesktop ? 'relative flex flex-col items-center justify-center p-0 cursor-default' : 'relative flex items-center justify-center w-full'}
      style={isDesktop ? { width: `${letter.widthPct}%` } : { width: 'min(20vw, 72px)' }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: letter.aspect }}
      >
        <video
          ref={(el) => {
            if (el) videoRefs.current[letter.id] = el;
          }}
          poster={letter.poster}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          controls={false}
          disablePictureInPicture
          className={isDesktop ? 'w-full h-full object-contain pointer-events-none' : 'w-full h-full object-contain pointer-events-none'}
          style={
            isDesktop
              ? { backgroundColor: 'transparent' }
              : {
                  backgroundColor: 'transparent',
                  WebkitMaskImage: `url('${letter.poster}')`,
                  maskImage: `url('${letter.poster}')`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }
          }
        >
          <source src={letter.webm} type="video/webm" />
          <source src={letter.mp4} type="video/mp4" />
        </video>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 sm:py-2"
        role="region"
        aria-label="Zephyr Wordmark"
      >
        {isDesktop ? (
          <div className="flex w-full items-center justify-between">
            {LETTERS_CONFIG.map(renderLetterVideo)}
          </div>
        ) : (
          <div className="w-full max-w-[100px] mx-auto flex flex-col items-center justify-center gap-0 px-1 mt-0.5 mb-0">
            {LETTERS_CONFIG.map(renderLetterVideo)}
          </div>
        )}
      </div>
    </div>
  );
}
