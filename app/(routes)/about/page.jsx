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
                  'TypeScript',
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
