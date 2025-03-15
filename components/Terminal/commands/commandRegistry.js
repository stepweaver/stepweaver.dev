import { useState, useCallback } from 'react';

export function useCommandRegistry() {
  const [commands, setCommands] = useState({});

  const registerCommand = useCallback((name, options) => {
    if (!name) return;

    setCommands((prev) => ({
      ...prev,
      [name]: {
        name,
        description: options.description || 'No description available',
        usage: options.usage || name,
        category: options.category || 'misc',
        hidden: options.hidden || false,
        execute:
          options.execute || (() => `Command '${name}' is not implemented`),
      },
    }));
  }, []);

  const registerCommands = useCallback(
    (commandsObj) => {
      Object.entries(commandsObj).forEach(([name, options]) => {
        registerCommand(name, options);
      });
    },
    [registerCommand]
  );

  const getCommand = useCallback(
    (name) => {
      return commands[name] || null;
    },
    [commands]
  );

  const getCommandsByCategory = useCallback(
    (category) => {
      return Object.values(commands).filter(
        (cmd) => cmd.category === category && !cmd.hidden
      );
    },
    [commands]
  );

  const getAllVisibleCommands = useCallback(() => {
    return Object.values(commands).filter((cmd) => !cmd.hidden);
  }, [commands]);

  return {
    registerCommand,
    registerCommands,
    getCommand,
    getCommandsByCategory,
    getAllVisibleCommands,
  };
}
