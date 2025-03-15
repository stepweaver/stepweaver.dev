import React, { useState, useRef, useEffect } from 'react';

export default function TerminalInput({
  onSubmit,
  history = [],
  historyIndex = -1,
  onHistoryNavigation,
  isZorkMode = false,
}) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    // Handle up/down arrows for history navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? 'up' : 'down';
      const historyCommand = onHistoryNavigation?.(direction);

      if (historyCommand !== null) {
        setInputValue(historyCommand);
      }
    }

    // Handle Enter key for command submission
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className='terminal-input-line'>
      <span className='terminal-prompt text-terminal-green mr-2'>
        {isZorkMode ? '>' : '$'}
      </span>
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className='terminal-input bg-transparent border-none outline-none text-terminal-text w-full'
        aria-label='Terminal input'
        autoComplete='off'
        autoFocus
      />
      <span className='cursor-blink h-4 w-2 bg-terminal-green'></span>
    </div>
  );
}
