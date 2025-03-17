import TerminalWindow from '@/components/ui/TerminalWindow';
import Link from 'next/link';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Bio Section */}
      <TerminalWindow title="~/about">
        <div>
          <p className='text-terminal-text mb-6'>
            I'm a problem-solver, builder, and relentless learner with a passion for web development and modern JavaScript frameworks. I don't just code—I engineer, refine, and optimize.
          </p>

          <p className='text-terminal-text mb-6'>
            Whether I'm building full-stack applications, exploring DevOps automation, or pushing the boundaries of what's possible with new technologies, I thrive on learning, adapting, and solving complex problems.
          </p>

          <p className='text-terminal-text mb-6'>
            I believe in continuous growth and collaboration, always striving to create solutions that are as efficient as they are impactful.
          </p>
        </div>
      </TerminalWindow>

      {/* Skills Section */}
      <TerminalWindow title="~/skills">
        <div>
          <h2 className='text-terminal-green font-terminus mb-4'>Skills</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='p-3 bg-terminal-light rounded'>
              <h3 className='text-terminal-green mb-2'>Frontend</h3>
              <ul className='text-terminal-text list-disc pl-5'>
                <li>React & Next.js</li>
                <li>JavaScript / TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML / CSS</li>
              </ul>
            </div>
            <div className='p-3 bg-terminal-light rounded'>
              <h3 className='text-terminal-green mb-2'>Backend</h3>
              <ul className='text-terminal-text list-disc pl-5'>
                <li>Node.js & Express</li>
                <li>MongoDB & SQL Databases</li>
                <li>RESTful APIs</li>
                <li>Python</li>
                <li>BaaS (Backend as a Service)</li>
              </ul>
            </div>
            <div className='p-3 bg-terminal-light rounded'>
              <h3 className='text-terminal-green mb-2'>DevOps & Tools</h3>
              <ul className='text-terminal-text list-disc pl-5'>
                <li>Git & GitHub</li>
                <li>AWS</li>
                <li>Obsidian</li>
                <li>VS Code</li>
                <li>npm/yarn</li>
              </ul>
            </div>
          </div>
        </div>
      </TerminalWindow>

      {/* Contact Section */}
      <TerminalWindow title="~/contact">
        <div>
          <p className='text-terminal-text mb-6'>
            I'm always open to discussing new projects, creative ideas, or collaboration opportunities. If you have a vision, let's build something great together.
          </p>
          <Link
            href='/contact'
            className='bg-terminal-green hover:bg-opacity-80 text-black font-mono py-2 px-4 rounded inline-block transition-colors'
          >
            Contact Me
          </Link>
        </div>
      </TerminalWindow>
    </div>
  );
}