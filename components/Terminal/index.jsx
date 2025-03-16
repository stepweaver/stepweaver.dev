'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTerminalOutput } from './hooks/useTerminalOutput';
import { useCommandHistory } from './hooks/useCommandHistory';
import { useCommandProcessor } from './hooks/useCommandProcessor';
import { useCommandRegistry } from './commands/commandRegistry';
import { systemCommands } from './commands/systemCommands';
import { navigationCommands } from './commands/navigationCommands';
import { externalCommands } from './commands/externalCommands';
import { easterEggCommands } from './commands/easterEggCommands';
import TerminalOutput from './components/TerminalOutput';
import TerminalInput from './components/TerminalInput';
import { initializeZork } from './games/Zork/index';
import './styles/terminal.css';

const Terminal = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { output, addOutput, clearOutput, terminalRef } = useTerminalOutput();
  const { history, historyIndex, addToHistory, navigateHistory } =
    useCommandHistory();
  const [isInitialized, setIsInitialized] = useState(false);
  const commandRegistry = useCommandRegistry();
  const terminalContainerRef = useRef(null);
  const previousPathRef = useRef(pathname);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Detect window resize for responsiveness
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset terminal when path changes
  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      // Path has changed, reset the terminal
      clearOutput();
      setIsInitialized(false);
      previousPathRef.current = pathname;
    }
  }, [pathname, clearOutput]);

  // Initialize commands
  useEffect(() => {
    if (!isInitialized) {
      try {
        // Register all commands in a single batch
        commandRegistry.registerCommands({
          ...systemCommands,
          ...navigationCommands,
          ...externalCommands,
          ...easterEggCommands,
        });

        // Display welcome message
        addOutput([
          'Welcome to my terminal-themed portfolio!',
          'Type "help" to see available commands.',
          '',
        ]);

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing terminal commands:', error);
        addOutput([
          'Error initializing terminal commands. Please refresh the page.',
          `Error: ${error.message}`,
        ]);
      }
    }
  }, [isInitialized, commandRegistry, addOutput]);

  // Initialize Zork game
  const { zorkState, startZork, processZorkCommand } = initializeZork({
    addOutput,
  });

  // Set up command processor
  const { processCommand } = useCommandProcessor({
    addOutput,
    clearOutput,
    startZork,
    isZorkMode: zorkState.isPlaying,
    processZorkCommand,
    getCommand: commandRegistry.getCommand,
    getCommandsByCategory: commandRegistry.getCommandsByCategory,
    getAllVisibleCommands: commandRegistry.getAllVisibleCommands,
    router,
  });

  // Handle terminal click to focus input
  const handleTerminalClick = () => {
    const inputElement =
      terminalContainerRef.current?.querySelector('.terminal-input');
    if (inputElement) {
      inputElement.focus();
    }
  };

  // Handle command submission
  const handleCommandSubmit = (command) => {
    addToHistory(command);
    processCommand(command);
  };

  // Get path display name with reasonable length based on screen size
  const getPathDisplay = () => {
    if (pathname === '/') return '';

    // On smaller screens, show shorter path
    if (dimensions.width < 640 && pathname.length > 10) {
      return '/..' + pathname.substring(pathname.length - 8);
    }

    return pathname;
  };

  return (
    <div className='terminal-container' ref={terminalContainerRef}>
      <div className='terminal-header'>
        <div className='terminal-title'>user@portfolio:~{getPathDisplay()}</div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div
        ref={terminalRef}
        className='terminal-body font-terminus text-base p-4'
        onClick={handleTerminalClick}
      >
        <TerminalOutput output={output} />
        <TerminalInput
          onSubmit={handleCommandSubmit}
          history={history}
          historyIndex={historyIndex}
          onHistoryNavigation={navigateHistory}
          isZorkMode={zorkState.isPlaying}
        />
      </div>
    </div>
  );
};

export default Terminal;
