import React, { useState, useEffect } from 'react';

export default function LoadingDotsText({
  text = 'Loading',
  speed = 300,
  maxDots = 3,
}) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= maxDots) {
          return '';
        }
        return prev + '.';
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, maxDots]);

  return (
    <span>
      {text}
      {dots}
    </span>
  );
}
