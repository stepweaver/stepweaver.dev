'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function MatrixTransitionLayout({ children }) {
  const canvasRef = useRef(null);
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      if (!isTransitioning.current) return;

      // Semi-transparent black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    // Start transition
    const startTransition = () => {
      isTransitioning.current = true;
      draw();
    };

    // End transition
    const endTransition = () => {
      isTransitioning.current = false;
    };

    // Handle route changes
    startTransition();
    const timeout = setTimeout(endTransition, 1000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className='fixed inset-0 pointer-events-none z-50'
        style={{ opacity: isTransitioning.current ? 1 : 0 }}
      />
      {children}
    </>
  );
}