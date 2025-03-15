export const navigationCommands = {
  ls: {
    description: 'List available sections',
    usage: 'ls',
    category: 'navigation',
    execute: () => {
      return [
        'Available sections:',
        'about/      - Learn more about me',
        'projects/   - View my portfolio projects',
        'blog/       - Read my latest articles',
        'contact/    - Get in touch with me',
        'resume/     - View my professional resume',
      ];
    },
  },

  cd: {
    description: 'Navigate to a section',
    usage: 'cd [section]',
    category: 'navigation',
    execute: ({ args, router }) => {
      if (args.length === 0 || args[0] === '~' || args[0] === '/') {
        router.push('/');
        return 'Navigating to home...';
      }

      const path = args[0].replace(/^\/+|\/+$/g, '');
      const validPaths = ['about', 'projects', 'blog', 'contact', 'resume'];

      if (validPaths.includes(path)) {
        router.push(`/${path}`);
        return `Navigating to ${path}...`;
      } else {
        return `cd: ${path}: No such section`;
      }
    },
  },
};
