
'use client';

import { COMMAND_CATEGORIES } from './commandRegistry';

const externalCommands = {
  github: {
    description: 'Open my GitHub profile in a new window',
    usage: 'github',
    category: 'external',
    execute: ({ addOutput }) => {
      window.open(
        'https://github.com/yourusername',
        '_blank',
        'noopener,noreferrer'
      );

      return 'Opening GitHub profile in a new window...';
    },
  },

  linkedin: {
    description: 'Open my LinkedIn profile in a new window',
    usage: 'linkedin',
    category: 'external',
    execute: ({ addOutput }) => {
      window.open(
        'https://linkedin.com/in/yourusername',
        '_blank',
        'noopener,noreferrer'
      );

      return 'Opening LinkedIn profile in a new window...';
    },
  },

  twitter: {
    description: 'Open my Twitter profile in a new window',
    usage: 'twitter',
    category: 'external',
    execute: ({ addOutput }) => {
      window.open(
        'https://twitter.com/yourusername',
        '_blank',
        'noopener,noreferrer'
      );

      return 'Opening Twitter profile in a new window...';
    },
  },
};

export default externalCommands;