import { useState, useCallback, useRef } from 'react';

export const COMMAND_CATEGORIES = {
  SYSTEM: 'system',
  NAVIGATION: 'navigation',
  EXTERNAL: 'external',
  FUN: 'fun',
  EASTER_EGG: 'easter-egg',
};

export function useCommandRegistry() {
  const commands = useRef({});

  const registerCommand = (name, command) => {
    commands.current[name] = {
      ...command,
      name,
    };
  };

  const registerCommands = (commandsObj) => {
    Object.entries(commandsObj).forEach(([name, command]) => {
      registerCommand(name, command);
    });
  };

  const getCommand = (name) => {
    return commands.current[name];
  };

  const getCommandsByCategory = (category) => {
    return Object.values(commands.current).filter(
      (cmd) => cmd.category === category
    );
  };

  const getAllVisibleCommands = () => {
    return Object.values(commands.current).filter(
      (cmd) => !cmd.hidden || cmd.category === 'fun'
    );
  };

  return {
    registerCommand,
    registerCommands,
    getCommand,
    getCommandsByCategory,
    getAllVisibleCommands,
  };
}
