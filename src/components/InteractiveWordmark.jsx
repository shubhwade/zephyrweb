import React, { useRef, useEffect } from 'react';

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

export function InteractiveWordmark() {
  const videoRefs = useRef({});

  // Play all letter videos simultaneously in a synchronized loop
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.play().catch(() => {});
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 sm:py-2"
        role="region"
        aria-label="Zephyr Wordmark"
      >
        {/* ========================================================= */}
        {/* MOBILE VIEW: Keep the individual letters, stack them vertically */}
        {/* ========================================================= */}
        <div className="sm:hidden w-full max-w-[150px] mx-auto flex flex-col items-center justify-center gap-0.85 px-2">
          {LETTERS_CONFIG.map((letter) => (
            <div
              key={letter.id}
              className="relative flex items-center justify-center w-full"
              style={{ width: 'min(28vw, 110px)' }}
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
                  className="w-full h-full object-contain pointer-events-none"
                  style={{
                    backgroundColor: 'transparent',
                    WebkitMaskImage: `url('${letter.poster}')`,
                    maskImage: `url('${letter.poster}')`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                >
                  <source src={letter.webm} type="video/webm" />
                  <source src={letter.mp4} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW: All Letter Videos Playing Simultaneously   */}
        {/* ========================================================= */}
        <div className="hidden sm:flex w-full items-center justify-between">
          {LETTERS_CONFIG.map((letter) => (
            <div
              key={letter.id}
              style={{ width: `${letter.widthPct}%` }}
              className="relative flex flex-col items-center justify-center p-0 cursor-default"
            >
              {/* Transparent Letter Video Frame */}
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
                  className="w-full h-full object-contain pointer-events-none"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <source src={letter.webm} type="video/webm" />
                  <source src={letter.mp4} type="video/mp4" />
                </video>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
