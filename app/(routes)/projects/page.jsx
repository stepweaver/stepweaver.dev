import TerminalWindow from '@/components/ui/TerminalWindow';
import { getProjects } from '@/lib/projects';

export const metadata = {
  title: 'Projects',
};

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
