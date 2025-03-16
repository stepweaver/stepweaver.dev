import { useState, useRef, useEffect, useCallback } from 'react';

// Maximum lines to keep in the terminal output buffer
const MAX_OUTPUT_LINES = 500;

export function useTerminalOutput() {
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const shouldScrollRef = useRef(true);
  const outputOperationInProgressRef = useRef(false);

  // Debounced add output to prevent too many state updates
  const addOutput = useCallback((newOutput) => {
    // Skip empty outputs
    if (!newOutput || (Array.isArray(newOutput) && newOutput.length === 0)) {
      return;
    }

    // Prevent operation overlap
    if (outputOperationInProgressRef.current) {
      // Queue this operation for the next tick
      setTimeout(() => addOutput(newOutput), 0);
      return;
    }

    outputOperationInProgressRef.current = true;

    const outputItem = Array.isArray(newOutput) ? newOutput : [newOutput];

    // Trim output buffer if it exceeds max length
    setOutput((prevOutput) => {
      let combined = [...prevOutput, ...outputItem];
      if (combined.length > MAX_OUTPUT_LINES) {
        combined = combined.slice(combined.length - MAX_OUTPUT_LINES);
      }

      // Reset the operation flag after state update
      setTimeout(() => {
        outputOperationInProgressRef.current = false;
      }, 0);

      return combined;
    });
  }, []);

  const clearOutput = useCallback(() => {
    if (outputOperationInProgressRef.current) {
      // Queue clear operation for next tick
      setTimeout(clearOutput, 0);
      return;
    }

    outputOperationInProgressRef.current = true;
    setOutput([]);
    shouldScrollRef.current = true;

    // Reset the operation flag after state update
    setTimeout(() => {
      outputOperationInProgressRef.current = false;
    }, 0);
  }, []);

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
