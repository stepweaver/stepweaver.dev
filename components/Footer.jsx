export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='py-6 border-t border-terminal-border text-terminal-muted font-terminus text-sm'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='font-terminus text-base text-gray-400'>
          <span className='text-terminal-green'>$</span>{' '}
          <span>
            echo &quot;© {year}{' '}
            <span className='inline-block animate-lambda-bounce'>λ</span>
            stepweaver.dev&quot;
          </span>
        </div>
        <div className='flex space-x-4 mt-4 md:mt-0'>
          <a
            href='https://github.com/stepweaver'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-terminal-green'
          >
            GitHub
          </a>
          <a
            href='https://bsky.app/profile/stepweaver.dev'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-terminal-green'
          >
            Bluesky
          </a>
        </div>
      </div>
    </footer>
  );
}
