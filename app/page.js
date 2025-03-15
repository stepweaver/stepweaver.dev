import Image from 'next/image';

export default function Home() {
  return (
    <div className='min-h-screen p-8 bg-terminal text-terminal-text'>
      <h1 className='text-3xl font-terminus mb-4'>Terminal Theme</h1>
      <p className='font-hack mb-2'>
        This is using the terminal theme with custom fonts.
      </p>
      <div className='terminal-window mt-8'>
        <div className='terminal-header'>
          <div className='terminal-title'>bash</div>
          <div className='terminal-buttons'>
            <div className='terminal-button bg-red-500'></div>
            <div className='terminal-button bg-yellow-500'></div>
            <div className='terminal-button bg-green-500'></div>
          </div>
        </div>
        <div className='terminal-body'>
          <div className='terminal-prompt'>
            <span className='terminal-prompt-text'>$</span>
            <span>echo "Hello, Terminal World!"</span>
          </div>
          <div className='mt-2 text-terminal-green'>Hello, Terminal World!</div>
        </div>
      </div>
    </div>
  );
}
