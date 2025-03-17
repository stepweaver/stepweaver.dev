import Terminal from '../components/Terminal';
import LatestPost from '@/components/LatestPost';
import TerminalWindow from '@/components/ui/TerminalWindow';

export const metadata = {
  title: 'Stephen Weaver',
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Terminal */}
      <section>
        <Terminal />
      </section>

      {/* Welcome Section */}
      <section className='mt-8'>
        <TerminalWindow title='~/welcome'>
          <div className='space-y-4'>
            <h2 className='text-xl text-terminal-green font-terminus'>
              Welcome to my terminal-inspired portfolio!
            </h2>
            <p className='text-terminal-text'>
              I'm a web developer and business analyst at the University of
              Notre Dame with a passion for creating unique digital experiences
              and building tools that help people work smarter, not harder.
            </p>
            <p className='text-terminal-text'>
              Feel free to navigate using the menu above or use the terminal
              interface to explore my site with commands.
            </p>
          </div>
        </TerminalWindow>
      </section>

      {/* Latest Blog Posts */}
      <section className='mt-8'>
        <LatestPost />
      </section>
    </div>
  );
}
