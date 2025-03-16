export default function TerminalWindow({
  title = '~/terminal',
  children,
  className = '',
}) {
  return (
    <div className={`terminal-window w-full ${className} relative`}>
      {/* CRT scanline overlay */}
      <div className='absolute inset-0 pointer-events-none z-10 opacity-10 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent bg-opacity-5'
          style={{ backgroundSize: '100% 3px', backgroundRepeat: 'repeat' }}
        ></div>
      </div>

      <div className='terminal-header'>
        <div className='terminal-title font-mono text-terminal-green'>
          {title}
        </div>
        <div className='terminal-buttons'>
          <div className='terminal-button bg-terminal-red'></div>
          <div className='terminal-button bg-terminal-yellow'></div>
          <div className='terminal-button bg-terminal-green'></div>
        </div>
      </div>
      <div className='terminal-body p-4 overflow-visible relative'>
        {/* Subtle CRT glow effect */}
        <div
          className='absolute inset-0 pointer-events-none opacity-20'
          style={{
            boxShadow: 'inset 0 0 30px rgba(0, 255, 65, 0.3)',
            borderRadius: '0 0 0.375rem 0.375rem',
          }}
        ></div>
        {children}
      </div>
    </div>
  );
}
