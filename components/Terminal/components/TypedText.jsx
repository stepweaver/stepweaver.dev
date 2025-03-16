import React, { useState, useEffect } from 'react';

export default function TypedText({ text, speed = 50, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state if text changes
    setDisplayText('');
    setIsComplete(false);

    let charIndex = 0;
    let typingTimer;

    const typeNextChar = () => {
      if (charIndex < text.length) {
        setDisplayText(text.substring(0, charIndex + 1));
        charIndex++;
        typingTimer = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };

    typingTimer = setTimeout(typeNextChar, speed);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayText}
      {!isComplete && <span className='cursor-blink'></span>}
    </span>
  );
}
