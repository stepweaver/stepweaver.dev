import { useState, useRef, useEffect } from 'react';

export function useTerminalOutput() {
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);

  const addOutput = (newOutput) => {
    const outputItem = Array.isArray(newOutput) ? newOutput : [newOutput];

    setOutput((prevOutput) => [...prevOutput, ...outputItem]);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return { output, addOutput, clearOutput, terminalRef };
}