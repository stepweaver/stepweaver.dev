export const navigationCommands = {
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
