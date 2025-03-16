'use client';

import { COMMAND_CATEGORIES } from './commandRegistry';

export const externalCommands = {
  github: {
    description: 'Open my GitHub profile',
    usage: 'github',
    category: 'external',
    execute: ({ router }) => {
      // For client-side navigation we can use window.open
      window.open('https://github.com/yourusername', '_blank');
      return 'Opening GitHub profile...';
    },
  },

  bluesky: {
    description: 'Open my Bluesky profile',
    usage: 'bluesky',
    category: 'external',
    execute: ({ router }) => {
      window.open(
        'https://bsky.app/profile/yourusername.bsky.social',
        '_blank'
      );
      return 'Opening Bluesky profile...';
    },
  },

  email: {
    description: 'Contact me through the contact form',
    usage: 'email',
    category: 'external',
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
    category: 'external',
    execute: ({ router }) => {
      window.open('/resume.pdf', '_blank');
      return 'Opening resume...';
    },
  },
};
