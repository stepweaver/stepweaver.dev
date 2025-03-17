'use client';

import { COMMAND_CATEGORIES } from './commandRegistry';

export const externalCommands = {
  github: {
    description: 'Open my GitHub profile',
    usage: 'github',
    category: 'external',
    execute: ({ router }) => {
      // For client-side navigation we can use window.open
      window.open('https://github.com/stepweaver', '_blank');
      return 'Opening GitHub profile...';
    },
  },

  bluesky: {
    description: 'Open my Bluesky profile',
    usage: 'bluesky',
    category: 'external',
    execute: ({ router }) => {
      window.open('https://bsky.app/profile/stepweaver.dev', '_blank');
      return 'Opening Bluesky profile...';
    },
  },
};
