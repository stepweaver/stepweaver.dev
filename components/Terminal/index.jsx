'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const { output, addOutput, clearOutput, terminalRef } = useTerminalOutput();
  const { history, historyIndex, addToHistory, navigateHistory } =
    useCommandHistory();
  const [isInitialized, setIsInitialized] = useState(false);
  const commandRegistry = useCommandRegistry();

  // Initialize commands
  useEffect(() => {
    if (!isInitialized) {
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
  });

  // Handle terminal click to focus input
  const handleTerminalClick = () => {
    document.querySelector('.terminal-input')?.focus();
  };

  // Handle command submission
  const handleCommandSubmit = (command) => {
    addToHistory(command);
    processCommand(command);
  };

  return (
    <div className='terminal-window'>
      <div className='terminal-header'>
        <div className='terminal-title'>user@portfolio:~</div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div
        ref={terminalRef}
        className='terminal-body font-terminus text-base overflow-y-auto max-h-[400px]'
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
