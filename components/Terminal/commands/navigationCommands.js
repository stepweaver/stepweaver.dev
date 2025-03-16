export const navigationCommands = {
  goto: {
    description: 'Navigate to a page in the portfolio',
    usage: 'goto [page]',
    category: 'navigation',
    execute: ({ args, router, addOutput }) => {
      if (args.length === 0) {
        return 'Please specify a page to navigate to. Available pages: home, about, projects, blog, contact';
      }

      const destination = args[0].toLowerCase();
      const validDestinations = {
        home: '/',
        about: '/about',
        projects: '/projects',
        blog: '/blog',
        contact: '/contact',
      };

      if (validDestinations[destination]) {
        addOutput(`Navigating to ${destination}...`);
        setTimeout(() => {
          router.push(validDestinations[destination]);
        }, 500);
        return null;
      } else {
        return `Page not found: ${destination}. Available pages: home, about, projects, blog, contact`;
      }
    },
  },

  cd: {
    description: 'Change directory (navigate to page)',
    usage: 'cd [directory]',
    category: 'navigation',
    execute: ({ args, router, addOutput }) => {
      if (args.length === 0 || args[0] === '~' || args[0] === '/') {
        addOutput('Navigating to home...');
        setTimeout(() => {
          router.push('/');
        }, 500);
        return null;
      }

      const destination = args[0].toLowerCase();
      const validDestinations = {
        about: '/about',
        projects: '/projects',
        blog: '/blog',
        contact: '/contact',
        '..': '/',
      };

      if (validDestinations[destination]) {
        addOutput(`Changing directory to ${destination}...`);
        setTimeout(() => {
          router.push(validDestinations[destination]);
        }, 500);
        return null;
      } else {
        return `Directory not found: ${destination}`;
      }
    },
  },
};
