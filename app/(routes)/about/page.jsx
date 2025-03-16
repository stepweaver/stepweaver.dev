import TerminalWindow from '@/components/ui/TerminalWindow';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div>
      <TerminalWindow title='~/about'>
        <div>
          <h2 className='text-terminal-green font-terminus mb-4'>About Me</h2>

          <p className='text-terminal-text mb-6'>
            I'm a web developer and business analyst at the University of Notre
            Dame with expertise in modern web technologies. I'm passionate about
            creating clean, efficient, and user-friendly applications that solve
            real-world problems.
          </p>

          <p className='text-terminal-text mb-6'>
            My approach to web development combines technical expertise with a
            deep understanding of user needs. I believe in writing clean,
            maintainable code and creating intuitive interfaces that provide
            excellent user experiences.
          </p>

          <p className='text-terminal-text mb-8'>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying the outdoors.
          </p>
          <p className='text-terminal-text mb-6'>
            I'm a web developer and business analyst at the University of Notre
            Dame with expertise in modern web technologies. I'm passionate about
            creating clean, efficient, and user-friendly applications that solve
            real-world problems.
          </p>

          <p className='text-terminal-text mb-6'>
            My approach to web development combines technical expertise with a
            deep understanding of user needs. I believe in writing clean,
            maintainable code and creating intuitive interfaces that provide
            excellent user experiences.
          </p>

          <p className='text-terminal-text mb-8'>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying the outdoors.
          </p>
          <p className='text-terminal-text mb-6'>
            I'm a web developer and business analyst at the University of Notre
            Dame with expertise in modern web technologies. I'm passionate about
            creating clean, efficient, and user-friendly applications that solve
            real-world problems.
          </p>

          <p className='text-terminal-text mb-6'>
            My approach to web development combines technical expertise with a
            deep understanding of user needs. I believe in writing clean,
            maintainable code and creating intuitive interfaces that provide
            excellent user experiences.
          </p>

          <p className='text-terminal-text mb-8'>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying the outdoors.
          </p>

          <h2 className='text-terminal-green font-terminus mb-4'>Skills</h2>

          <div className='grid grid-cols-3 gap-3'>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              JavaScript
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              TypeScript
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              React
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              Next.js
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              Node.js
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              Tailwind CSS
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              Python
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              SQL
            </div>
            <div className='p-2 bg-terminal-light rounded text-terminal-text'>
              Git
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
