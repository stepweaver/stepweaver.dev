# Terminal-Themed Portfolio-Blog Rebuild Guide

This guide provides comprehensive, step-by-step instructions for rebuilding a Next.js portfolio-blog project with a terminal theme. Each section includes detailed explanations, code samples, and best practices.

> **Important Note**: This project uses JavaScript instead of TypeScript. All example code and configurations are provided in JavaScript format.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Structure](#project-structure)
4. [Build Phases](#build-phases)
   - [Phase 1: Project Setup & Environment Configuration](#phase-1-project-setup--environment-configuration)
   - [Phase 2: Layout & Theme Foundation](#phase-2-layout--theme-foundation)
   - [Phase 3: Navigation System](#phase-3-navigation-system)
   - [Phase 4: Terminal Component](#phase-4-terminal-component)
   - [Phase 5: Page Implementation](#phase-5-page-implementation)
   - [Phase 6: Blog System](#phase-6-blog-system)
   - [Phase 7: Interactive Features](#phase-7-interactive-features)
   - [Phase 8: Performance Optimization](#phase-8-performance-optimization)
5. [Git Workflow](#git-workflow)
6. [Testing & Deployment](#testing--deployment)

## Project Overview

This project is a modern portfolio-blog website built with Next.js 15, featuring:

- Terminal-themed UI and interactions
- MDX-based blog system
- Interactive command-line interface
- Responsive design
- Matrix-style transitions
- Project showcase
- Contact form

### Core Features

1. **Terminal Interface**

   - Interactive command-line experience
   - Command history navigation
   - Custom commands and navigation
   - Easter egg games (Zork)

2. **Blog System**

   - MDX content management
   - Syntax highlighting
   - Category and tag support
   - RSS feed

3. **Portfolio Pages**

   - Project showcase
   - About section
   - Resume/CV
   - Contact form

4. **UI/UX Features**
   - Terminal window styling
   - Matrix rain transitions
   - Typing animations
   - Responsive design

## Development Environment Setup

### Prerequisites

- Node.js 20.9.0 or later
- Git
- VS Code (recommended)
- Terminal with Git support

### Initial Setup

1. **Create Next.js Project**

```bash
# Create new Next.js project (without TypeScript)
npx create-next-app@latest portfolio-blog --eslint --tailwind --app --use-npm --js

# Navigate to project directory
cd portfolio-blog

# Install additional dependencies
npm install @next/mdx next-mdx-remote gray-matter react-syntax-highlighter @tailwindcss/typography
```

> **Note on React 19 Compatibility**: Next.js 15 uses React 19 by default for both the App Router and Pages Router. React 19 introduces new features like improved hydration error handling, the React Compiler (experimental), and replaces `useFormState` with `useActionState`.

2. **Configure Project Settings**

Create `jsconfig.json` for better JavaScript development experience:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

3. **Configure ESLint**

Update `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true,
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

## Project Structure

```
portfolio-blog/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog pages
│   │   ├── projects/      # Projects pages
│   │   └── contact/       # Contact page
│   ├── api/               # API routes
│   ├── components/        # App-specific components
│   ├── fonts/            # Custom fonts
│   ├── globals.css       # Global styles
│   ├── layout.jsx        # Root layout
│   └── page.jsx          # Home page
├── components/           # Shared components
│   ├── Terminal/        # Terminal component
│   ├── ui/              # UI components
│   └── transitions/     # Transition components
├── content/             # Content files
│   └── blog/           # Blog posts
├── lib/                 # Utility functions
├── public/             # Static assets
├── styles/             # Component styles
└── jsconfig.json       # JavaScript configuration
```

## Build Phases

### Phase 1: Project Setup & Environment Configuration

> **Branch Management**: Create branch `feature/phase1-setup` before beginning this phase.

#### Step 1: Initialize Project Structure

1. Create necessary directories:

```bash
mkdir -p app/{api,components,fonts} components/{Terminal,ui,transitions} content/blog lib public styles types
```

2. Set up base configuration files:

```bash
# Create .env file
touch .env

# Create .gitignore
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOL
```

#### Step 2: Configure Tailwind CSS

1. Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
    './app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          DEFAULT: '#0D1117',
          light: '#1A2233',
          border: '#30363D',
          green: '#4EE39D',
          yellow: '#F1E05A',
          red: '#F97583',
          blue: '#79B8FF',
          text: '#E6EDF3',
          muted: '#8B949E',
        },
      },
      fontFamily: {
        terminus: ['var(--font-terminus)'],
        hack: ['var(--font-hack)'],
        mono: [
          'var(--font-hack)',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'text-typing': 'text-typing 3.5s steps(40, end)',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'text-typing': {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

2. Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --grid-size: 1rem;
    --terminal-line-height: 1.5;
  }

  body {
    @apply bg-terminal text-terminal-text;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px
      ), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: var(--grid-size) var(--grid-size);
  }
}

@layer components {
  .terminal-window {
    @apply relative border border-terminal-border bg-terminal rounded-md overflow-hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
  }

  .terminal-header {
    @apply flex items-center justify-between px-4 py-2 bg-terminal-light border-b border-terminal-border;
  }

  .terminal-title {
    @apply text-terminal-text font-terminus text-sm;
  }

  .terminal-buttons {
    @apply flex gap-2;
  }

  .terminal-button {
    @apply w-3 h-3 rounded-full;
  }

  .terminal-body {
    @apply p-4 font-mono;
  }

  .terminal-prompt {
    @apply flex items-start text-terminal-green font-terminus;
  }

  .terminal-prompt-text {
    @apply mr-2;
  }

  .terminal-input-line {
    @apply flex items-center;
  }

  .terminal-input {
    @apply bg-transparent border-none outline-none text-terminal-text font-terminus w-full;
  }

  .cursor-blink {
    @apply inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor-blink;
  }
}
```

#### Step 3: Set Up Custom Fonts

1. Download required fonts:

   - Terminus TTF
   - Hack Regular

2. Create `app/fonts` directory and add font files

3. Update `app/layout.jsx`:

```javascript
import localFont from 'next/font/local';
import './globals.css';

const terminus = localFont({
  src: './fonts/TerminusTTFWindows-4.49.3.ttf',
  variable: '--font-terminus',
  weight: '400',
  display: 'swap',
});

const hack = localFont({
  src: './fonts/Hack-Regular.ttf',
  variable: '--font-hack',
  weight: '400',
  display: 'swap',
});

export const metadata = {
  title: 'λ Your Name - Web Developer',
  description: 'Personal portfolio and blog with a terminal theme',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${terminus.variable} ${hack.variable} antialiased w-full min-h-screen flex flex-col bg-terminal`}
      >
        {children}
      </body>
    </html>
  );
}
```

### Phase 2: Layout & Theme Foundation

> **Branch Management**: Create branch `feature/phase2-layout` after merging Phase 1 branch.

#### Step 4: Create UI Components

1. Create `components/ui/TerminalWindow.jsx`:

```javascript
export default function TerminalWindow({
  title = '~/terminal',
  children,
  className = '',
}) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className='terminal-header'>
        <div className='terminal-title'>{title}</div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div className='terminal-body'>{children}</div>
    </div>
  );
}
```

2. Create `components/ui/Button.jsx`:

```javascript
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const baseStyles = 'font-terminus rounded transition-colors';

  const variants = {
    primary: 'bg-terminal-green text-terminal hover:bg-terminal-green/90',
    secondary:
      'bg-terminal-light text-terminal-text hover:bg-terminal-light/90',
    outline:
      'border border-terminal-border text-terminal-text hover:bg-terminal-light',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### Step 5: Create Layout Components

1. Create `components/Header.jsx`:

```javascript
'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const formatPath = () => {
    if (pathname === '/') return '~';
    return `~${pathname}`;
  };

  return (
    <header className='py-6'>
      <div className='font-terminus text-terminal-muted text-sm'>
        <p>Welcome to my terminal-themed portfolio</p>
        <p className='text-terminal-text'>
          <span className='text-terminal-green'>user@portfolio</span>:
          <span className='text-terminal-blue'>{formatPath()}</span>$
        </p>
      </div>
    </header>
  );
}
```

2. Create `components/Nav.jsx`:

```javascript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'projects', path: '/projects' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <nav className='py-4'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='group'>
          <h1 className='text-2xl font-terminus text-terminal-green'>
            <span className='font-hack mr-1 group-hover:animate-pulse inline-block'>
              λ
            </span>
            <span>stepweaver</span>
            <span className='cursor-blink'>_</span>
          </h1>
        </Link>

        <ul className='hidden md:flex space-x-6 font-terminus'>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`inline-flex items-center ${
                  pathname === item.path
                    ? 'text-terminal-green'
                    : 'text-terminal-text hover:text-terminal-green'
                }`}
              >
                <span className='text-terminal-green mr-1'>&gt;</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

3. Create `components/MobileNav.jsx`:

```javascript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'projects', path: '/projects' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 text-terminal-green'
        aria-expanded={isOpen}
        aria-label='Toggle navigation menu'
      >
        {isOpen ? 'X' : '≡'}
      </button>

      {isOpen && (
        <div className='absolute top-14 right-4 w-48 terminal-window z-50'>
          <div className='terminal-header'>
            <div className='terminal-title'>~/menu</div>
            <div className='terminal-buttons'>
              <div
                className='terminal-button bg-terminal-red'
                onClick={() => setIsOpen(false)}
              ></div>
            </div>
          </div>
          <div className='terminal-body p-0'>
            <ul className='py-2'>
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className='px-4 py-2 hover:bg-terminal-light'
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === item.path
                        ? 'text-terminal-green'
                        : 'text-terminal-text'
                    }
                  >
                    <span className='text-terminal-green mr-2'>&gt;</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
```

4. Create `components/Footer.jsx`:

```javascript
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='py-6 mt-10 border-t border-terminal-border text-terminal-muted font-terminus text-sm'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div>
          <p>&copy; {year} Your Name. All rights reserved.</p>
        </div>
        <div className='flex space-x-4 mt-4 md:mt-0'>
          <a
            href='https://github.com/yourusername'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-terminal-green'
          >
            GitHub
          </a>
          <a
            href='https://twitter.com/yourusername'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-terminal-green'
          >
            Twitter
          </a>
          <a
            href='https://linkedin.com/in/yourusername'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-terminal-green'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

#### Step 6: Update Root Layout

Update `app/layout.jsx` to include navigation components:

```javascript
import localFont from 'next/font/local';
import './globals.css';

// Components
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';

const terminus = localFont({
  src: './fonts/TerminusTTFWindows-4.49.3.ttf',
  variable: '--font-terminus',
  weight: '400',
  display: 'swap',
});

const hack = localFont({
  src: './fonts/Hack-Regular.ttf',
  variable: '--font-hack',
  weight: '400',
  display: 'swap',
});

export const metadata = {
  title: 'λ Your Name - Web Developer',
  description: 'Personal portfolio and blog with a terminal theme',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${terminus.variable} ${hack.variable} antialiased w-full min-h-screen flex flex-col bg-terminal`}
      >
        {/* Sticky Nav with backdrop blur */}
        <div className='sticky top-0 z-50 backdrop-blur-md'>
          <div className='mx-auto w-full max-w-[820px]'>
            <Nav />
            <div className='absolute top-0 right-0 md:hidden'>
              <MobileNav />
            </div>
          </div>
        </div>

        <div className='mx-auto w-full max-w-[820px]'>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer className='mt-auto' />
        </div>
      </body>
    </html>
  );
}
```

### Phase 3: Navigation System

> **Branch Management**: Create branch `feature/phase3-navigation` after merging Phase 2 branch.

#### Step 7: Create Terminal Component Structure

1. Create necessary directories:

```bash
mkdir -p components/Terminal/{components,hooks,commands,games,styles}
```

2. Create `components/Terminal/styles/terminal.css`:

```css
.terminal-container {
  @apply relative bg-terminal rounded-md overflow-hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
}

.terminal-output {
  @apply font-mono text-sm mb-2;
}

.terminal-input-line {
  @apply flex items-center;
}

.terminal-prompt {
  @apply flex items-start text-terminal-green font-terminus;
}

.terminal-prompt-text {
  @apply mr-2;
}

.terminal-input {
  @apply bg-transparent border-none outline-none text-terminal-text font-terminus w-full;
}

.cursor-blink {
  @apply inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor-blink;
}
```

#### Step 8: Create Terminal Hooks

1. Create `components/Terminal/hooks/useCommandHistory.js`:

```javascript
import { useState } from 'react';

export function useCommandHistory() {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (command) => {
    if (command.trim()) {
      setHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }
  };

  const navigateHistory = (direction) => {
    if (history.length === 0) return null;

    let newIndex;
    if (direction === 'up') {
      newIndex =
        historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
    } else {
      newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
    }

    setHistoryIndex(newIndex);
    return newIndex >= 0 ? history[history.length - 1 - newIndex] : '';
  };

  return { history, historyIndex, addToHistory, navigateHistory };
}
```

2. Create `components/Terminal/hooks/useTerminalOutput.js`:

```javascript
import { useState, useRef, useEffect } from 'react';

export function useTerminalOutput() {
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);

  const addOutput = (newOutput) => {
    const outputItem = Array.isArray(newOutput) ? newOutput : [newOutput];

    setOutput((prevOutput) => [...prevOutput, ...outputItem]);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return { output, addOutput, clearOutput, terminalRef };
}
```

3. Create `components/Terminal/hooks/useCommandProcessor.js`:

```javascript
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useCommandProcessor({
  addOutput,
  clearOutput,
  getCommand,
  getCommandsByCategory,
  getAllVisibleCommands,
  isZorkMode = false,
  startZork = null,
  processZorkCommand = null,
}) {
  const router = useRouter();

  const processCommand = useCallback(
    (input) => {
      // Skip empty commands
      if (!input || !input.trim()) {
        addOutput(['', '$ ']);
        return;
      }

      // Record the command in output
      addOutput(`$ ${input}`);

      // In Zork mode, send all commands to the Zork processor
      if (isZorkMode && processZorkCommand) {
        processZorkCommand(input);
        return;
      }

      // Parse command and arguments
      const parts = input.trim().split(' ');
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Special case for zork command
      if (commandName === 'zork' && startZork) {
        startZork();
        return;
      }

      // Get command from registry
      const command = getCommand(commandName);

      if (command) {
        try {
          // Execute command with context
          const result = command.execute({
            args,
            input,
            addOutput,
            clearOutput,
            router,
            getCommand,
            getCommandsByCategory,
            getAllVisibleCommands,
          });

          // Handle command output
          if (result !== null && result !== undefined) {
            if (Array.isArray(result)) {
              addOutput(result);
            } else {
              addOutput(result.toString());
            }
          }
        } catch (error) {
          addOutput(
            `Error executing command: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          );
        }
      } else {
        addOutput(
          `Command not found: ${commandName}. Type 'help' for available commands.`
        );
      }

      // Add prompt for next command
      addOutput('');
    },
    [
      addOutput,
      clearOutput,
      getCommand,
      getCommandsByCategory,
      getAllVisibleCommands,
      router,
      isZorkMode,
      processZorkCommand,
      startZork,
    ]
  );

  return { processCommand };
}
```

#### Step 9: Create Command Registry System

1. Create `components/Terminal/commands/commandRegistry.js`:

```javascript
import { useState, useCallback } from 'react';

export function useCommandRegistry() {
  const [commands, setCommands] = useState({});

  const registerCommand = useCallback((name, options) => {
    if (!name) return;

    setCommands((prev) => ({
      ...prev,
      [name]: {
        name,
        description: options.description || 'No description available',
        usage: options.usage || name,
        category: options.category || 'misc',
        hidden: options.hidden || false,
        execute:
          options.execute || (() => `Command '${name}' is not implemented`),
      },
    }));
  }, []);

  const registerCommands = useCallback(
    (commandsObj) => {
      Object.entries(commandsObj).forEach(([name, options]) => {
        registerCommand(name, options);
      });
    },
    [registerCommand]
  );

  const getCommand = useCallback(
    (name) => {
      return commands[name] || null;
    },
    [commands]
  );

  const getCommandsByCategory = useCallback(
    (category) => {
      return Object.values(commands).filter(
        (cmd) => cmd.category === category && !cmd.hidden
      );
    },
    [commands]
  );

  const getAllVisibleCommands = useCallback(() => {
    return Object.values(commands).filter((cmd) => !cmd.hidden);
  }, [commands]);

  return {
    registerCommand,
    registerCommands,
    getCommand,
    getCommandsByCategory,
    getAllVisibleCommands,
  };
}
```

2. Create `components/Terminal/commands/systemCommands.js`:

```javascript
const systemCommands = {
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
            `Command: ${command.name}`,
            `Description: ${command.description}`,
            `Usage: ${command.usage}`,
            `Category: ${command.category}`
          ];
        } else {
          return `Command '${commandName}' not found. Type 'help' to see available commands.`;
        }
      }

      // Group commands by category
      const commandsByCategory: Record<string, typeof systemCommands[keyof typeof systemCommands][]> = {};
      getAllVisibleCommands().forEach(cmd => {
        if (!commandsByCategory[cmd.category]) {
          commandsByCategory[cmd.category] = [];
        }
        commandsByCategory[cmd.category].push(cmd);
      });

      // Format output
      const output = ['Available commands:'];

      Object.entries(commandsByCategory).forEach(([category, commands]) => {
        output.push(`\n${category.toUpperCase()}:`);
        commands.forEach(cmd => {
          output.push(`  ${cmd.name.padEnd(12)} - ${cmd.description}`);
        });
      });
      });

      return output;
    }
  },

  clear: {
    description: 'Clear the terminal screen',
    usage: 'clear',
    category: 'system',
    execute: ({ clearOutput }) => {
      clearOutput();
      return null;
    }
  },

  echo: {
    description: 'Display a line of text',
    usage: 'echo [text]',
    category: 'system',
    execute: ({ args }) => {
      return args.join(' ') || '';
    }
  }
};

export default systemCommands;
```

3. Create `components/Terminal/commands/navigationCommands.js`:

```javascript
const navigationCommands = {
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

export default navigationCommands;
```

#### Step 10: Create Terminal UI Components

1. Create `components/Terminal/components/TerminalOutput.jsx`:

```javascript
import React from 'react';
import TypedText from './TypedText';

export default function TerminalOutput({ output }) {
  return (
    <div className='terminal-output font-mono text-sm mb-2'>
      {output.map((line, index) => {
        // Skip null or undefined values
        if (line === null || line === undefined) return null;

        // Convert to string if it's not already
        const content = typeof line === 'string' ? line : line.toString();

        // Handle multi-line output (split by newlines)
        const lines = content.split('\n');

        return (
          <div key={index}>
            {lines.map((textLine, lineIndex) => {
              // Parse special command prefixes
              const isCommand = textLine.startsWith('$ ');
              const isTypedAnimation = textLine.startsWith('!type ');

              if (isTypedAnimation) {
                // Remove the !type prefix and display with typing animation
                const textToType = textLine.substring(6);
                return (
                  <div key={`${index}-${lineIndex}`} className='mb-1'>
                    <TypedText text={textToType} speed={40} />
                  </div>
                );
              }

              return (
                <div
                  key={`${index}-${lineIndex}`}
                  className={`mb-1 ${isCommand ? 'text-terminal-green' : ''}`}
                >
                  {textLine}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
```

2. Create `components/Terminal/components/TerminalInput.jsx`:

```javascript
import React, { useState, useRef, useEffect } from 'react';

export default function TerminalInput({
  onSubmit,
  history = [],
  historyIndex = -1,
  onHistoryNavigation,
  isZorkMode = false,
}) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    // Handle up/down arrows for history navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? 'up' : 'down';
      const historyCommand = onHistoryNavigation?.(direction);

      if (historyCommand !== null) {
        setInputValue(historyCommand);
      }
    }

    // Handle Enter key for command submission
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className='terminal-input-line'>
      <span className='terminal-prompt text-terminal-green mr-2'>
        {isZorkMode ? '>' : '$'}
      </span>
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className='terminal-input bg-transparent border-none outline-none text-terminal-text w-full'
        aria-label='Terminal input'
        autoComplete='off'
        autoFocus
      />
      <span className='cursor-blink h-4 w-2 bg-terminal-green'></span>
    </div>
  );
}
```

3. Create `components/Terminal/components/TypedText.jsx`:

```javascript
import React, { useState, useEffect } from 'react';

export default function TypedText({ text, speed = 50, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let typingTimer;

    const typeNextChar = () => {
      if (charIndex < text.length) {
        setDisplayText(text.substring(0, charIndex + 1));
        charIndex++;
        typingTimer = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };

    typingTimer = setTimeout(typeNextChar, speed);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayText}
      {!isComplete && <span className='cursor-blink'></span>}
    </span>
  );
}
```

#### Step 11: Implement Main Terminal Component

Create `components/Terminal/index.jsx`:

```javascript
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTerminalOutput } from './hooks/useTerminalOutput';
import { useCommandHistory } from './hooks/useCommandHistory';
import { useCommandProcessor } from './hooks/useCommandProcessor';
import { useCommandRegistry } from './commands/commandRegistry';
import systemCommands from './commands/systemCommands';
import navigationCommands from './commands/navigationCommands';
import externalCommands from './commands/externalCommands';
import easterEggCommands from './commands/easterEggCommands';
import TerminalOutput from './components/TerminalOutput';
import TerminalInput from './components/TerminalInput';
import './styles/terminal.css';

const Terminal = () => {
  const router = useRouter();
  const { output, addOutput, clearOutput, terminalRef } = useTerminalOutput();
  const { history, historyIndex, addToHistory, navigateHistory } =
    useCommandHistory();
  const [isInitialized, setIsInitialized] = useState(false);
  const commandRegistry = useCommandRegistry();

  // Initialize commands
  useEffect(() => {
    if (!isInitialized) {
      // Register all commands in a single batch
      commandRegistry.registerCommands({
        ...systemCommands,
        ...navigationCommands,
        ...externalCommands,
        ...easterEggCommands,
      });

      // Display welcome message
      addOutput([
        'Welcome to my terminal-themed portfolio!',
        'Type "help" to see available commands.',
        '',
      ]);

      setIsInitialized(true);
    }
  }, [isInitialized, commandRegistry, addOutput]);

  // Initialize Zork game
  const { zorkState, startZork, processZorkCommand } = initializeZork({
    addOutput,
  });

  // Set up command processor
  const { processCommand } = useCommandProcessor({
    addOutput,
    clearOutput,
    startZork,
    isZorkMode: zorkState.isPlaying,
    processZorkCommand,
    getCommand: commandRegistry.getCommand,
    getCommandsByCategory: commandRegistry.getCommandsByCategory,
    getAllVisibleCommands: commandRegistry.getAllVisibleCommands,
  });

  // Handle terminal click to focus input
  const handleTerminalClick = () => {
    document.querySelector('.terminal-input')?.focus();
  };

  // Handle command submission
  const handleCommandSubmit = (command) => {
    addToHistory(command);
    processCommand(command);
  };

  return (
    <div className='terminal-window'>
      <div className='terminal-header'>
        <div className='terminal-title'>user@portfolio:~</div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div
        ref={terminalRef}
        className='terminal-body font-terminus text-base overflow-y-auto max-h-[400px]'
        onClick={handleTerminalClick}
      >
        <TerminalOutput output={output} />
        <TerminalInput
          onSubmit={handleCommandSubmit}
          history={history}
          historyIndex={historyIndex}
          onHistoryNavigation={navigateHistory}
          isZorkMode={zorkState.isPlaying}
        />
      </div>
    </div>
  );
};

export default Terminal;
```

### Phase 4: Page Implementation

> **Branch Management**: Create branch `feature/phase5-pages` after merging Phase 4 branch.

#### Step 12: Create Homepage

Create `app/page.jsx`:

```javascript
import Terminal from '@/components/Terminal';
import LatestPost from '@/components/LatestPost';
import TerminalWindow from '@/components/ui/TerminalWindow';

export default function HomePage() {
  return (
    <div className='space-y-8'>
      {/* Hero Section */}
      <section>
        <Terminal />
      </section>

      {/* About Section */}
      <section>
        <TerminalWindow title='~/about'>
          <div className='space-y-4'>
            <h2 className='text-xl text-terminal-green font-terminus'>
              Hello, I'm <span className='text-terminal-blue'>Your Name</span>
            </h2>
            <p className='text-terminal-text'>
              I'm a web developer specializing in modern JavaScript frameworks
              and creating unique digital experiences.
            </p>
            <p className='text-terminal-text'>
              Type <span className='text-terminal-yellow'>help</span> in the
              terminal above to explore my portfolio.
            </p>
          </div>
        </TerminalWindow>
      </section>

      {/* Latest Blog Post */}
      <section>
        <LatestPost />
      </section>
    </div>
  );
}
```

#### Step 13: Create About Page

Create `app/about/page.jsx`:

```javascript
import TerminalWindow from '@/components/ui/TerminalWindow';

export default function AboutPage() {
  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/about'>
        <div className='space-y-6'>
          <h1 className='text-2xl text-terminal-green font-terminus'>
            About Me
          </h1>

          <div className='space-y-4'>
            <p className='text-terminal-text'>
              I'm a passionate web developer with expertise in modern web
              technologies. My journey in web development started [your story
              here].
            </p>

            <div>
              <h2 className='text-xl text-terminal-green font-terminus mb-2'>
                Skills
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {[
                  'JavaScript',
                  'React',
                  'Next.js',
                  'Node.js',
                  'Tailwind CSS',
                  // Add more skills
                ].map((skill) => (
                  <div
                    key={skill}
                    className='p-2 bg-terminal-light rounded text-terminal-text'
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className='text-xl text-terminal-green font-terminus mb-2'>
                Experience
              </h2>
              <div className='space-y-4'>{/* Add your experience items */}</div>
            </div>

            <div>
              <h2 className='text-xl text-terminal-green font-terminus mb-2'>
                Education
              </h2>
              <div className='space-y-4'>{/* Add your education items */}</div>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
```

#### Step 14: Create Projects Page

Create `app/projects/page.jsx`:

```javascript
import TerminalWindow from '@/components/ui/TerminalWindow';
import { getProjects } from '@/lib/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/projects'>
        <div className='space-y-6'>
          <h1 className='text-2xl text-terminal-green font-terminus'>
            Projects
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='p-4 bg-terminal-light rounded-lg hover:bg-terminal-light/80 transition-colors'
              >
                <h2 className='text-xl text-terminal-green font-terminus mb-2'>
                  {project.title}
                </h2>
                <p className='text-terminal-text mb-4'>{project.description}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className='px-2 py-1 bg-terminal rounded text-terminal-text text-sm'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className='flex gap-4'>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-terminal-green hover:text-terminal-green/80'
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-terminal-green hover:text-terminal-green/80'
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
```

#### Step 15: Create Blog Pages

1. Create `app/blog/page.jsx`:

```javascript
import TerminalWindow from '@/components/ui/TerminalWindow';
import { getBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/blog'>
        <div className='space-y-6'>
          <h1 className='text-2xl text-terminal-green font-terminus'>
            Blog Posts
          </h1>

          <div className='grid grid-cols-1 gap-6'>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
```

2. Create `app/blog/[slug]/page.jsx`:

```javascript
import TerminalWindow from '@/components/ui/TerminalWindow';
import { getBlogPost } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='space-y-8'>
      <TerminalWindow title={`~/blog/${params.slug}`}>
        <article className='prose prose-invert max-w-none'>
          <h1 className='text-2xl text-terminal-green font-terminus mb-4'>
            {post.title}
          </h1>

          <div className='flex items-center gap-4 text-terminal-muted mb-8'>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
            {post.tags && (
              <div className='flex gap-2'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-1 bg-terminal rounded text-terminal-text text-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <MDXRemote source={post.content} />
        </article>
      </TerminalWindow>
    </div>
  );
}
```

#### Step 16: Create Contact Page

Create `app/contact/page.jsx`:

```javascript
'use client';

import { useState } from 'react';
import TerminalWindow from '@/components/ui/TerminalWindow';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/contact'>
        <div className='space-y-6'>
          <h1 className='text-2xl text-terminal-green font-terminus'>
            Contact Me
          </h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-terminal-text mb-1'>
                Name
              </label>
              <input
                type='text'
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green'
                required
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-terminal-text mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green'
                required
              />
            </div>

            <div>
              <label
                htmlFor='subject'
                className='block text-terminal-text mb-1'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green'
                required
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-terminal-text mb-1'
              >
                Message
              </label>
              <textarea
                id='message'
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green h-32'
                required
              />
            </div>

            <Button
              type='submit'
              disabled={status === 'loading'}
              className='w-full'
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>

            {status === 'success' && (
              <p className='text-terminal-green'>Message sent successfully!</p>
            )}

            {status === 'error' && (
              <p className='text-terminal-red'>
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </TerminalWindow>
    </div>
  );
}
```

### Phase 5: Blog System

> **Branch Management**: Create branch `feature/phase6-blog` after merging Phase 5 branch.

#### Step 17: Set Up Blog Utilities

1. Create `lib/blog.js`:

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);
        const slug = file.replace(/\.mdx$/, '');

        return {
          slug,
          title: data.title,
          date: data.date,
          tags: data.tags,
          content,
          excerpt: data.excerpt,
        };
      })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags,
      content,
      excerpt: data.excerpt,
    };
  } catch (error) {
    return null;
  }
}
```

2. Create `components/BlogCard.jsx`:

```javascript
import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <article className='p-4 bg-terminal-light rounded-lg hover:bg-terminal-light/80 transition-colors'>
      <Link href={`/blog/${post.slug}`}>
        <h2 className='text-xl text-terminal-green font-terminus mb-2'>
          {post.title}
        </h2>
      </Link>

      <div className='flex items-center gap-4 text-terminal-muted mb-2'>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
        {post.tags && (
          <div className='flex gap-2'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 bg-terminal rounded text-terminal-text text-sm'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {post.excerpt && (
        <p className='text-terminal-text mb-4'>{post.excerpt}</p>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className='text-terminal-green hover:text-terminal-green/80'
      >
        Read more →
      </Link>
    </article>
  );
}
```

3. Create `components/LatestPost.jsx`:

```javascript
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import BlogCard from './BlogCard';

export default async function LatestPost() {
  const posts = await getBlogPosts();
  const latestPost = posts[0];

  if (!latestPost) {
    return null;
  }

  return (
    <section>
      <h2 className='text-xl text-terminal-green font-terminus mb-4'>
        Latest Blog Post
      </h2>
      <BlogCard post={latestPost} />
    </section>
  );
}
```

### Phase 6: Interactive Features

> **Branch Management**: Create branch `feature/phase7-interactive` after merging Phase 6 branch.

#### Step 18: Create Matrix Rain Transition

Create `components/transitions/MatrixTransitionLayout.jsx`:

```javascript
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function MatrixTransitionLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const canvasRef = useRef < HTMLCanvasElement > null;
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      if (!isTransitioning.current) return;

      // Semi-transparent black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    // Start transition
    const startTransition = () => {
      isTransitioning.current = true;
      draw();
    };

    // End transition
    const endTransition = () => {
      isTransitioning.current = false;
    };

    // Handle route changes
    startTransition();
    const timeout = setTimeout(endTransition, 1000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className='fixed inset-0 pointer-events-none z-50'
        style={{ opacity: isTransitioning.current ? 1 : 0 }}
      />
      {children}
    </>
  );
}
```

### Phase 7: Performance Optimization

> **Branch Management**: Create branch `feature/phase8-optimization` after merging Phase 7 branch.

#### Step 19: Enable Turbopack (Stable in Next.js 15)

Next.js 15 includes stable Turbopack support for faster development and build times.

1. Enable Turbopack in development:

```bash
# Start the development server with Turbopack
npm run dev -- --turbo
```

2. Or configure it in your package.json:

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  }
}
```

> **Note**: Turbopack in Next.js 15 offers significant performance improvements including faster startup times, module updates, and error handling.

#### Step 20: Optimize Images

1. Install required packages:

```bash
npm install sharp
```

2. Create `lib/images.js`:

```javascript
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function optimizeImage(
  inputPath,
  outputPath,
  options = {
    width: 800,
    quality: 80,
  }
) {
  await sharp(inputPath)
    .resize(options.width, null, {
      withoutEnlargement: true,
    })
    .webp({ quality: options.quality })
    .toFile(outputPath);
}

export async function processImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const optimizedDir = path.join(process.cwd(), 'public/images/optimized');

  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  // Process all images
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(
        optimizedDir,
        `${path.parse(file).name}.webp`
      );

      await optimizeImage(inputPath, outputPath);
    }
  }
}
```

#### Step 21: Implement Code Splitting for Next.js 15

1. Update `next.config.mjs` (or `next.config.js` since we're using JavaScript):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
    // Next.js 15 features
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // React 19 support is enabled by default
  webpack: (config, { dev, isServer }) => {
    // Enable tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: true,
    };

    return config;
  },
};

module.exports = nextConfig;
```

> **Note**: Next.js 15 no longer caches `fetch` requests, `GET` Route Handlers, and client navigations by default. If you need caching, you must explicitly specify it.

2. Use dynamic imports for heavy components:

```javascript
// In your page components
import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/Terminal'), {
  loading: () => <div>Loading terminal...</div>,
  ssr: false,
});
```

### Phase 8: Testing & Deployment

#### Step 22: Set Up Testing

1. Install testing dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

2. Create `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

3. Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
```

4. Create test files for components:

```javascript
// components/Terminal/__tests__/Terminal.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Terminal from '../index';

describe('Terminal', () => {
  it('renders terminal window', () => {
    render(<Terminal />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('processes commands', () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });
});
```

#### Step 23: Deployment

1. Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

2. Deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Testing Checklist

1. **Unit Tests**

   - Test individual components
   - Test utility functions
   - Test hooks and custom hooks

2. **Integration Tests**

   - Test component interactions
   - Test routing
   - Test API endpoints

3. **End-to-End Tests**

   - Test critical user flows
   - Test responsive design
   - Test accessibility

4. **Performance Testing**
   - Test page load times
   - Test component render times
   - Test memory usage

### Deployment Checklist

1. **Pre-deployment**

   - Run all tests
   - Check for console errors
   - Verify environment variables
   - Build the project locally

2. **Deployment**

   - Deploy to staging environment
   - Verify staging deployment
   - Deploy to production
   - Monitor deployment logs

3. **Post-deployment**

   - Verify all features work
   - Check for any console errors
   - Monitor performance metrics
   - Test critical user flows

4. **Monitoring**
   - Set up error tracking
   - Monitor performance metrics
   - Track user analytics
   - Monitor server logs

## Git Workflow

### Branch Creation Strategy

For this project, we'll use a phased branching strategy where each major phase of development gets its own branch. This helps organize the work and makes it easier to track progress.

#### When to Create Branches

1. **Initial Setup**: Start with the `main` branch
2. **For Each Phase**: Create a new feature branch at the beginning of each phase
3. **For Complex Features**: If a phase has complex features, consider creating sub-branches
4. **After Completing a Phase**: Merge back to `main` before starting the next phase

#### Branch Creation Timeline

| Phase   | Branch Name                   | When to Create        | When to Merge                      |
| ------- | ----------------------------- | --------------------- | ---------------------------------- |
| Phase 1 | `feature/phase1-setup`        | At project start      | After completing all Phase 1 steps |
| Phase 2 | `feature/phase2-layout`       | After merging Phase 1 | After completing all Phase 2 steps |
| Phase 3 | `feature/phase3-navigation`   | After merging Phase 2 | After completing all Phase 3 steps |
| Phase 4 | `feature/phase4-terminal`     | After merging Phase 3 | After completing all Phase 4 steps |
| Phase 5 | `feature/phase5-pages`        | After merging Phase 4 | After completing all Phase 5 steps |
| Phase 6 | `feature/phase6-blog`         | After merging Phase 5 | After completing all Phase 6 steps |
| Phase 7 | `feature/phase7-interactive`  | After merging Phase 6 | After completing all Phase 7 steps |
| Phase 8 | `feature/phase8-optimization` | After merging Phase 7 | After all testing is complete      |

### Branch Naming Conventions

- `feature/*` - New features
- `fix/*` - Bug fixes
- `enhancement/*` - Improvements to existing features
- `setup/*` - Infrastructure and configuration
- `docs/*` - Documentation updates

### Commit Message Format

```
type(scope): concise description of the change

[optional body with more detailed explanation]

[optional footer with breaking changes or issue references]
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect code functionality
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to build process or auxiliary tools

### When to Create Branches vs. Commits

Create a new branch when:

- Implementing a new feature
- Making significant changes that might take multiple commits
- Working on a bug fix that requires investigation and testing

Use commits within a branch to:

- Record logical steps in implementing the feature
- Save work increments
- Document specific changes that are part of the larger feature

### Branch Management

1. Always create branches from the main/master branch
2. Keep branches focused on a single feature or fix
3. Regularly pull changes from main to your branch to avoid conflicts
4. Before merging, verify:
   - All tests pass
   - Code follows project style guidelines
   - Feature is complete and functional
   - No unnecessary code or debugging statements

### Merging Strategy

1. Prefer squash merges for feature branches to keep history clean
2. Use descriptive merge commit messages that summarize the feature
3. Delete branches after merging
4. Consider code reviews before merging important features
