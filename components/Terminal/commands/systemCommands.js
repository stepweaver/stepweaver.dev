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
            `Command:     ${command.name}`,
            `Description: ${command.description}`,
            `Usage:       ${command.usage}`,
            `Category:    ${command.category}`,
          ];
        } else {
          return `Command '${commandName}' not found. Type 'help' to see available commands.`;
        }
      }

      // Group commands by category
      const commandsByCategory = {};
      const allCommands = getAllVisibleCommands();

      // Set display order and custom titles for categories
      const categoryDisplayOrder = ['system', 'navigation', 'external', 'fun'];
      const categoryDisplayNames = {
        system: 'SYSTEM',
        navigation: 'NAVIGATION',
        external: 'EXTERNAL',
        fun: 'FUN STUFF',
      };

      // Initialize categories
      categoryDisplayOrder.forEach((cat) => {
        commandsByCategory[cat] = [];
      });

      // Sort commands into categories
      allCommands.forEach((cmd) => {
        if (commandsByCategory[cmd.category]) {
          commandsByCategory[cmd.category].push(cmd);
        } else if (cmd.category === 'fun') {
          // Ensure fun commands are included
          if (!commandsByCategory['fun']) {
            commandsByCategory['fun'] = [];
          }
          commandsByCategory['fun'].push(cmd);
        }
      });

      // Format output with minimalist style
      const output = [];

      categoryDisplayOrder.forEach((category) => {
        if (
          commandsByCategory[category] &&
          commandsByCategory[category].length > 0
        ) {
          // Add extra spacing between categories
          if (output.length > 0) {
            output.push('');
          }

          // Add category with custom display name
          output.push(`[${categoryDisplayNames[category]}]`);

          // List commands with better indentation and formatting
          commandsByCategory[category].forEach((cmd) => {
            const commandName = cmd.name.padEnd(12);
            // Use explicit indentation with two spaces
            output.push(`  ${commandName} - ${cmd.description}`);
          });
        }
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

  whoami: {
    description: 'Display the current user',
    usage: 'whoami',
    category: 'system',
    execute: () => {
      // Get a random title for the user
      const titles = [
        'Visionary Developer',
        'Code Architect',
        'Digital Explorer',
        'Innovation Partner',
        'Tech Trailblazer',
        'Future Collaborator',
      ];

      const randomTitle = titles[Math.floor(Math.random() * titles.length)];

      return [
        '✨ Welcome, ' + randomTitle + '! ✨',
        '',
        'You are a unique individual at the intersection of creativity and technology.',
        "More than just a user – you're a potential:",
        '',
        '🤝 Collaborator - bringing fresh ideas to the table',
        '👥 Partner - on the journey of building amazing things',
        '🔍 Explorer - discovering new possibilities in code',
        '💼 Future Employer or Colleague - part of an innovative team',
        '',
        "Your presence here means you're curious, creative, and ready to build.",
        'What will you create today?',
      ];
    },
  },

  date: {
    description: 'Display the current date and time',
    usage: 'date',
    category: 'system',
    execute: () => {
      return new Date().toString();
    },
  },

  ls: {
    description: 'List available sections',
    usage: 'ls',
    category: 'system',
    execute: () => {
      return [
        '[SECTIONS]',
        '  about/        - Learn more about me',
        '  blog/         - Read my latest articles',
        '  contact/      - Get in touch with me',
      ];
    },
  },

  email: {
    description: 'Contact me through the contact form',
    usage: 'email',
    category: 'system',
    execute: ({ router, addOutput }) => {
      addOutput('Navigating to contact page...');
      setTimeout(() => {
        router.push('/contact');
      }, 500);
      return null;
    },
  },

  resume: {
    description: 'View my resume',
    usage: 'resume',
    category: 'system',
    execute: ({ router }) => {
      window.open('/resume.pdf', '_blank');
      return 'Opening resume...';
    },
  },
};
