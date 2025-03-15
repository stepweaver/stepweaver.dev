import { useState } from 'react';

export function useCommandHistory() {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (command) => {
    if (command.trim()) {
      setHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }
  };

  const navigateHistory = (direction) => {
    if (history.length === 0) return null;

    let newIndex;
    if (direction === 'up') {
      newIndex =
        historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
    } else {
      newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
    }

    setHistoryIndex(newIndex);
    return newIndex >= 0 ? history[history.length - 1 - newIndex] : '';
  };

  return { history, historyIndex, addToHistory, navigateHistory };
}
