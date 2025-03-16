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

  linkedin: {
    description: 'Open my LinkedIn profile',
    usage: 'linkedin',
    category: 'external',
    execute: ({ router }) => {
      window.open('https://linkedin.com/in/yourusername', '_blank');
      return 'Opening LinkedIn profile...';
    },
  },

  email: {
    description: 'Send me an email',
    usage: 'email',
    category: 'external',
    execute: ({ router }) => {
      window.open('mailto:your.email@example.com', '_blank');
      return 'Opening email client...';
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
