
'use client';

const easterEggCommands = {
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
    category: 'easter-egg',
    hidden: true,
    execute: ({ addOutput }) => {
      // Add Matrix animation effect (would be implemented in CSS)
      document.body.classList.add('matrix-effect');

      // Remove the effect after 10 seconds
      setTimeout(() => {
        document.body.classList.remove('matrix-effect');
      }, 10000);

      return [
        'Entering the Matrix...',
        'Wake up, Neo...',
        'Follow the white rabbit.',
        'The Matrix has you...',
      ];
    },
  },

  coffee: {
    description: 'Make coffee',
    usage: 'coffee',
    category: 'easter-egg',
    hidden: true,
    execute: () => {
      return [
        'Brewing coffee...',
        '☕ Coffee ready!',
        'Error: Coffee not implemented in this browser.',
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

export default easterEggCommands;