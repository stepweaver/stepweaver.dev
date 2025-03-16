import { useState, useRef, useEffect } from 'react';

// Maximum lines to keep in the terminal output buffer
const MAX_OUTPUT_LINES = 500;

export function useTerminalOutput() {
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const shouldScrollRef = useRef(true);

  // Track if user manually scrolled up (to prevent auto-scrolling)
  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = terminalRef.current;

    const handleScroll = () => {
      // Check if scrolled to bottom (within 50px tolerance)
      const isAtBottom =
        terminal.scrollHeight - terminal.scrollTop - terminal.clientHeight < 50;
      shouldScrollRef.current = isAtBottom;
    };

    terminal.addEventListener('scroll', handleScroll);
    return () => terminal.removeEventListener('scroll', handleScroll);
  }, []);

  const addOutput = (newOutput) => {
    const outputItem = Array.isArray(newOutput) ? newOutput : [newOutput];

    // Trim output buffer if it exceeds max length
    setOutput((prevOutput) => {
      let combined = [...prevOutput, ...outputItem];
      if (combined.length > MAX_OUTPUT_LINES) {
        combined = combined.slice(combined.length - MAX_OUTPUT_LINES);
      }
      return combined;
    });
  };

  const clearOutput = () => {
    setOutput([]);
    shouldScrollRef.current = true;
  };

  // Scroll to bottom when output changes, unless user scrolled up
  useEffect(() => {
    if (terminalRef.current && shouldScrollRef.current) {
      // Use requestAnimationFrame to make sure scrolling happens after render
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      });
    }
  }, [output]);

  return { output, addOutput, clearOutput, terminalRef };
}
