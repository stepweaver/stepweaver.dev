import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useCommandProcessor({
  addOutput,
  clearOutput,
  getCommand,
  getCommandsByCategory,
  getAllVisibleCommands,
  isZorkMode = false,
  startZork = null,
  processZorkCommand = null,
}) {
  const router = useRouter();

  const processCommand = useCallback(
    (input) => {
      // Skip empty commands
      if (!input || !input.trim()) {
        addOutput(['', '$ ']);
        return;
      }

      // Record the command in output
      addOutput(`$ ${input}`);

      // In Zork mode, send all commands to the Zork processor
      if (isZorkMode && processZorkCommand) {
        processZorkCommand(input);
        return;
      }

      // Parse command and arguments
      const parts = input.trim().split(' ');
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Special case for zork command
      if (commandName === 'zork' && startZork) {
        startZork();
        return;
      }

      // Get command from registry
      const command = getCommand(commandName);

      if (command) {
        try {
          // Execute command with context
          const context = {
            args,
            input,
            addOutput,
            clearOutput,
            router,
            getCommand,
            getCommandsByCategory,
            getAllVisibleCommands,
          };

          const result = command.execute(context);

          // Handle command output
          if (result !== null && result !== undefined) {
            if (Array.isArray(result)) {
              addOutput(result);
            } else if (typeof result === 'object' && result.then) {
              // Handle promises (async commands)
              addOutput('!type Processing command...');
              result
                .then((asyncResult) => {
                  if (asyncResult !== null && asyncResult !== undefined) {
                    if (Array.isArray(asyncResult)) {
                      addOutput(asyncResult);
                    } else {
                      addOutput(asyncResult.toString());
                    }
                  }
                  addOutput('');
                })
                .catch((error) => {
                  addOutput(`Error: ${error.message || 'Unknown error'}`);
                  addOutput('');
                });
              return;
            } else {
              addOutput(result.toString());
            }
          }
        } catch (error) {
          addOutput(
            `Error executing command: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          );
        }
      } else {
        addOutput(
          `Command not found: ${commandName}. Type 'help' for available commands.`
        );
      }

      // Add prompt for next command
      addOutput('');
    },
    [
      addOutput,
      clearOutput,
      getCommand,
      getCommandsByCategory,
      getAllVisibleCommands,
      router,
      isZorkMode,
      processZorkCommand,
      startZork,
    ]
  );

  return { processCommand };
}
