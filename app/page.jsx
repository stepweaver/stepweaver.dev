// Using a direct relative import instead of the alias
import Terminal from '../components/Terminal';
// import MinimalTerminal from '../components/MinimalTerminal';
import LatestPost from '@/app/components/LatestPost';
import TerminalWindow from '@/components/ui/TerminalWindow';

// Temporary debug Terminal component
const DebugTerminal = () => {
  return (
    <div className='terminal-window'>
      <div className='terminal-header'>
        <div className='terminal-title'>Debug Terminal</div>
      </div>
      <div className='terminal-body'>
        <p>This is a debug terminal to test imports.</p>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
      {/* Hero Section */}
      <section className='w-full'>
        <Terminal />
      </section>

      {/* About Section */}
      <section>
        <TerminalWindow title='~/about'>
          <div className='space-y-4'>
            <h2 className='text-xl text-terminal-green font-terminus'>
              Hello, I&apos;m{' '}
              <span className='text-terminal-blue'>Your Name</span>
            </h2>
            <p className='text-terminal-text'>
              I&apos;m a web developer specializing in modern JavaScript
              frameworks and creating unique digital experiences.
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
