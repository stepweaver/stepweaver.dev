'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function MinimalTerminal() {
  const [output, setOutput] = useState([
    'Welcome to Minimal Terminal',
    'Type something...',
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  // Focus input on mount and when clicked anywhere in terminal
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add to output
      setOutput([...output, `$ ${input}`, `Echo: ${input}`]);

      // Add to history
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);

      // Clear input
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    // Handle up/down keys for history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className='border border-terminal-border bg-terminal rounded-md overflow-hidden'
      onClick={handleTerminalClick}
    >
      <div className='flex items-center justify-between px-4 py-2 bg-terminal-light border-b border-terminal-border'>
        <div className='text-terminal-text font-terminus text-sm'>
          Minimal Terminal
        </div>
        <div className='flex gap-2'>
          <div className='w-3 h-3 rounded-full bg-terminal-red'></div>
          <div className='w-3 h-3 rounded-full bg-terminal-yellow'></div>
          <div className='w-3 h-3 rounded-full bg-terminal-green'></div>
        </div>
      </div>
      <div className='p-4 font-mono max-h-[400px] overflow-y-auto'>
        {/* Terminal Output */}
        <div className='mb-4'>
          {output.map((line, index) => (
            <div key={index} className='mb-1'>
              {line}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className='flex items-center'>
          <span className='text-terminal-green mr-2'>$</span>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className='bg-transparent border-none outline-none text-terminal-text w-full'
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
