'use client';

import { useEffect, useState } from 'react';

export default function CrtEffect() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate CRT warm-up time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fixed position overlay with CRT scan effect */}
      <div className='fixed inset-0 pointer-events-none z-50'>
        {/* Scan line effect - always visible */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent, transparent 50%, rgba(0,0,0,0.4) 50%, transparent)',
            backgroundSize: '100% 4px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* CRT startup effect - only during load */}
        {isLoading && (
          <div className='absolute inset-0 bg-black animate-[crt-flicker_0.15s_ease-in-out_infinite] z-10'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='h-0.5 w-1/2 bg-terminal-green opacity-60 animate-[crt-scan_0.5s_linear_infinite]' />
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-terminal-green/5 via-transparent to-transparent' />
          </div>
        )}

        {/* CRT turn-on flash effect */}
        {isLoading && (
          <div
            className='absolute inset-0 bg-terminal-green opacity-0 transition-opacity duration-500'
            style={{
              animationName: 'crtFlash',
              animationDuration: '1s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              animationDelay: '0.8s',
              '@keyframes crtFlash': {
                '0%': { opacity: 0 },
                '10%': { opacity: 0.2 },
                '100%': { opacity: 0 },
              },
            }}
          />
        )}
      </div>
    </>
  );
}
