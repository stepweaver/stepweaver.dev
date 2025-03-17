import LatestPost from '@/components/LatestPost';
import TerminalWindow from '@/components/ui/TerminalWindow';
import ClientTerminal from '@/components/ClientTerminal';

export const metadata = {
  title: 'Stephen Weaver',
};

export default function HomePage() {
  return (
    <div className='space-y-8'>
      {/* Hero Section with Terminal - prominently featured at the top */}
      <section className='mt-4'>
        <ClientTerminal />
      </section>

      {/* Welcome Section */}
      <section>
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
      <section>
        <LatestPost />
      </section>
    </div>
  );
}
