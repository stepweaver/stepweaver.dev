export const systemCommands = {
  help: {
    description: 'Display help information about available commands',
    usage: 'help [command]',
    category: 'system',
    execute: ({ args, getCommand, getAllVisibleCommands }) => {
      if (args.length > 0) {
        const commandName = args[0];
        const command = getCommand(commandName);

        if (command) {
          return [
            `Command: ${command.name}`,
            `Description: ${command.description}`,
            `Usage: ${command.usage}`,
            `Category: ${command.category}`,
          ];
        } else {
          return `Command '${commandName}' not found. Type 'help' to see available commands.`;
        }
      }

      // Group commands by category
      const commandsByCategory = {};
      getAllVisibleCommands().forEach((cmd) => {
        if (!commandsByCategory[cmd.category]) {
          commandsByCategory[cmd.category] = [];
        }
        commandsByCategory[cmd.category].push(cmd);
      });

      // Format output
      const output = ['Available commands:'];

      Object.entries(commandsByCategory).forEach(([category, commands]) => {
        output.push(`\n${category.toUpperCase()}:`);
        commands.forEach((cmd) => {
          output.push(`  ${cmd.name.padEnd(12)} - ${cmd.description}`);
        });
      });

      return output;
    },
  },

  clear: {
    description: 'Clear the terminal screen',
    usage: 'clear',
    category: 'system',
    execute: ({ clearOutput }) => {
      clearOutput();
      return null;
    },
  },

  echo: {
    description: 'Display a line of text',
    usage: 'echo [text]',
    category: 'system',
    execute: ({ args }) => {
      return args.join(' ') || '';
    },
  },
};
