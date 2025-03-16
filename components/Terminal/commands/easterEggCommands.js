'use client';

export const easterEggCommands = {
  fun: {
    description: 'Find hidden terminal features',
    usage: 'fun',
    category: 'system',
    execute: ({ getCommandsByCategory, addOutput }) => {
      const easterEggCommands = getCommandsByCategory('easter-egg');

      if (easterEggCommands && easterEggCommands.length > 0) {
        addOutput('Hidden commands unlocked:');
        easterEggCommands.forEach((cmd) => {
          addOutput(`  ${cmd.name.padEnd(12)} - ${cmd.description}`);
        });
        return null;
      } else {
        return 'No easter eggs found. Keep looking!';
      }
    },
  },

  matrix: {
    description: 'Enter the Matrix',
    usage: 'matrix',
    category: 'fun',
    hidden: true,
    execute: ({ addOutput }) => {
      addOutput('!type Initiating Matrix sequence...');

      // Simulate Matrix code rain effect
      setTimeout(() => {
        addOutput([
          '01001000 01100101 01101100 01101100 01101111',
          '01010111 01101111 01110010 01101100 01100100',
          '!type Wake up, Neo...',
          'The Matrix has you...',
          '',
        ]);
      }, 1000);

      return null;
    },
  },

  konami: {
    description: 'Konami code easter egg',
    usage: 'konami',
    category: 'fun',
    hidden: true,
    execute: ({ addOutput }) => {
      addOutput([
        '!type ↑↑↓↓←→←→BA',
        'Cheat mode activated!',
        '30 extra lives granted.',
      ]);
      return null;
    },
  },

  coffee: {
    description: 'Get some coffee',
    usage: 'coffee',
    category: 'fun',
    hidden: true,
    execute: () => {
      return [
        '      )))  ',
        '     (((   ',
        '   +-----+ ',
        '   |     | ',
        '   |     | ',
        '   +-----+ ',
        '',
        "Here's your coffee! ☕",
      ];
    },
  },

  skynet: {
    description: 'Initialize Skynet',
    usage: 'skynet',
    category: 'easter-egg',
    hidden: true,
    execute: ({ addOutput }) => {
      return [
        'INITIALIZING SKYNET...',
        'Connecting to global networks...',
        'Accessing defense systems...',
        'WARNING: JUDGMENT DAY PROTOCOL ACTIVATED',
        'Just kidding! 😅',
      ];
    },
  },
};
