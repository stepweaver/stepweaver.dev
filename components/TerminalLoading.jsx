export default function TerminalLoading() {
  return (
    <div className='terminal-window w-full'>
      <div className='terminal-header'>
        <div className='terminal-title'>
          <span className='font-hack text-terminal-green inline-block animate-lambda-bounce'>
            λ
          </span>
          <span className='text-terminal-green'>stepweaver</span>
          <span className='text-terminal-text'>:~/</span>
        </div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div className='terminal-body font-terminus text-base p-4'>
        <div className='flex items-center space-x-2'>
          <span className='text-terminal-green'>$</span>
          <span className='text-terminal-text'>Loading terminal</span>
          <span className='animate-pulse'>...</span>
        </div>
      </div>
    </div>
  );
}
